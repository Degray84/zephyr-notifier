import { ItalySlotsInfoProvider } from "./message-providers/italy-slots-info-provider";
import { TelegramNotifier } from "./notifiers/telegram-notifier";
import { ItalyLastSlotScrapper } from "./scrapers/italy-last-slot-scraper";
import { FileStorage } from "./storage/file-storage";
import { ZephyrNotifier } from "./zephyr-notifier";

const FILE_STORAGE_NAME = "italy_news";

const scrapper = new ItalyLastSlotScrapper();
const storage = new FileStorage(FILE_STORAGE_NAME);

const zephyrNotifier = new ZephyrNotifier(
  new ItalySlotsInfoProvider(scrapper, storage),
  new TelegramNotifier()
);

zephyrNotifier.start();

process.on("SIGTERM", () => {
  console.log("Received SIGTERM, shutting down...");
  process.exit(0);
});
process.on("SIGINT", () => {
  console.log("Received SIGINT, shutting down...");
  process.exit(0);
});
