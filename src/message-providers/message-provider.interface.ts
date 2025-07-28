import { Scraper } from '../scrapers/scraper.interface';
import { Storage } from '../storage/storage.interface';

export class MessageProvider<D = Record<string, any>> {
  constructor(
    protected readonly scrapper: Scraper,
    protected readonly storage: Storage<D>,
  ) {}

  async getMessage(): Promise<string | null | undefined> {
    throw new Error('Not implemented');
  }
}
