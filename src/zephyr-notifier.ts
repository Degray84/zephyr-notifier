import { CronJob } from 'cron';
import { ZephyrNotifierError } from './errors';
import { BaseMessageProvider } from './message-providers/base-message-provider';
import { Notifier } from './notifiers/notifier.interface';
import { SCHEDULES } from './config';
import { LogMethod } from './decorators/logger';

export class ZephyrNotifier {
  private schedulers: CronJob[];

  constructor(
    private readonly messageProvider: BaseMessageProvider,
    private readonly notifier: Notifier,
  ) {
    this.schedulers = SCHEDULES.map(
      ({ cron, spread_min: spread }) =>
        new CronJob(cron, () => this.sendMessageWithRandomDelay(spread)),
    );
  }

  @LogMethod()
  private async sendMessage() {
    try {
      const message = await this.messageProvider.getMessage();
      if (!message) return;

      this.notifier.sendMessage(message);
    } catch (error) {
      if (error instanceof ZephyrNotifierError) {
        this.notifier.sendError(error.message);
      }

      throw error;
    }
  }

  @LogMethod()
  private async sendMessageWithRandomDelay(spread: number = 10) {
    const delay = Math.floor(Math.random() * spread * 60 * 1000);
    setTimeout(() => {
      return this.sendMessage();
    }, delay);
  }

  @LogMethod()
  public async start() {
    this.schedulers.forEach((job) => job.start());
  }

  @LogMethod()
  public async stop() {
    this.schedulers.forEach((job) => job.stop());
  }
}
