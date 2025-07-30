import { BaseScraper } from '../scrapers/base-scraper';
import { Storage } from '../storage/storage.interface';

export class BaseMessageProvider<D = Record<string, any>> {
  constructor(
    protected readonly scrapper: BaseScraper,
    protected readonly storage: Storage<D>,
  ) {}

  async getMessage(): Promise<string | null | undefined> {
    throw new Error('Not implemented');
  }
}
