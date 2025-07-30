import { LogMethod } from '../decorators/logger';
import { BaseMessageProvider } from './base-message-provider';

interface StorageDTO {
  latestMessage?: string;
}

export class ItalySlotsInfoProvider extends BaseMessageProvider<StorageDTO> {
  @LogMethod()
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
