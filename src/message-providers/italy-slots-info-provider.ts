import { MessageProvider } from "./message-provider.interface";

interface StorageDTO {
  latestMessage?: string;
}

export class ItalySlotsInfoProvider extends MessageProvider<StorageDTO> {
  async getMessage() {
    const [storageData = {}, currentMessage] = await Promise.all([
      this.storage.load(),
      this.scrapper.scrap(),
    ]);

    if (!currentMessage || storageData?.latestMessage === currentMessage) {
      return null;
    }

    await this.storage.save({
      ...storageData,
      latestMessage: currentMessage,
    });

    return currentMessage;
  }
}
