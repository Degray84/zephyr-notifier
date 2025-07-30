import { Telegraf } from 'telegraf';
import { BOT_TOKEN, CHAT_ID } from '../config';
import { Notifier } from './notifier.interface';
import { LogMethod } from '../decorators/logger';

interface TelegrafNotifierOptions {
  onLaunch?: () => void;
}
export class TelegramNotifier implements Notifier {
  private readonly bot: Telegraf;

  constructor({ onLaunch }: TelegrafNotifierOptions = {}) {
    this.bot = new Telegraf(BOT_TOKEN);
    this.start();
    this.launch(onLaunch);
  }

  @LogMethod()
  private start() {
    this.bot.start((ctx) => {
      ctx.reply(
        'Привет! Я ZephyrVisaSlotBot. Я буду присылать тебе свежие новости о слотах для визы в Италию.',
      );
    });
  }

  @LogMethod()
  private async launch(onLaunch: TelegrafNotifierOptions['onLaunch']) {
    await this.bot.launch();
    if (!onLaunch) return;

    onLaunch();
  }

  @LogMethod()
  async sendMessage(message: string) {
    await this.bot.telegram.sendMessage(CHAT_ID, `🌬️ ${message}`, {
      parse_mode: 'HTML',
    });
  }

  @LogMethod()
  async sendError(message: string) {
    await this.bot.telegram.sendMessage(CHAT_ID, `! ${message}`, {
      parse_mode: 'HTML',
    });
  }
}
