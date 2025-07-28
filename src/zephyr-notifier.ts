import { CronJob } from 'cron';
import { ZephyrNotifierError } from './errors';
import { MessageProvider } from './message-providers/message-provider.interface';
import { Notifier } from './notifiers/notifier.interface';
import { SCHEDULES } from './config';

export class ZephyrNotifier {
  private schedulers: CronJob[];

  constructor(
    private readonly messageProvider: MessageProvider,
    private readonly notifier: Notifier,
  ) {
    this.schedulers = SCHEDULES.map(
      ({ cron, spread_min: spread }) =>
        new CronJob(cron, () => this.sendMessageWithRandomDelay(spread)),
    );
  }

  private async sendMessage() {
    try {
      console.log('Run scrapping. Time:', new Date());
      const message = await this.messageProvider.getMessage();
      if (!message) return;

      console.log('Sending message to the Telegram. Time:', new Date());
      this.notifier.sendMessage(message);
    } catch (error) {
      if (error instanceof ZephyrNotifierError) {
        this.notifier.sendError(error.message);
      }
      if (error instanceof Error) {
        console.log('error', error.message);
      }
    }
  }

  private async sendMessageWithRandomDelay(spread: number = 10) {
    const delay = Math.floor(Math.random() * spread * 60 * 1000);
    console.log('Run cron job. Time:', new Date());
    setTimeout(() => {
      return this.sendMessage();
    }, delay);
  }

  public async start() {
    console.log('Start zephyr-notifier');
    this.schedulers.forEach((job) => job.start());
  }

  public async stop() {
    console.log('Stop zephyr-notifier');
    this.schedulers.forEach((job) => job.stop());
  }
}
