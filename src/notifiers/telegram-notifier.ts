import { Telegraf } from "telegraf";
import { BOT_TOKEN, CHAT_ID } from "../config";
import { Notifier } from "./notifier.interface";

interface TelegrafNotifierOptions {
  onLaunch?: () => void;
}
export class TelegramNotifier extends Notifier {
  private readonly bot: Telegraf;

  constructor({ onLaunch }: TelegrafNotifierOptions = {}) {
    super();

    this.bot = new Telegraf(BOT_TOKEN);

    this.bot.start((ctx) => {
      ctx.reply(
        "Привет! Я ZephyrVisaSlotBot. Я буду присылать тебе свежие новости о слотах для визы в Италию."
      );
    });

    this.bot.launch().then(() => {
      console.log("ZephyrVisaSlotBot запущен!");

      onLaunch && onLaunch();
    });
  }

  async sendMessage(message: string) {
    this.bot.telegram.sendMessage(CHAT_ID, `🌬️ ${message}`, {
      parse_mode: "HTML",
    });
  }

  async sendError(message: string) {
    this.bot.telegram.sendMessage(CHAT_ID, `! ${message}`, {
      parse_mode: "HTML",
    });
  }
}
