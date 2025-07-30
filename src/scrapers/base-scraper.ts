import axios from 'axios';
import { CheerioAPI, load } from 'cheerio';
import { ScrapperError, ScrapperErrorEnum } from './errors';

export class BaseScraper {
  protected $?: CheerioAPI;

  constructor(private readonly _url: string) {}

  public async parse() {
    const { data } = await axios.get(this._url).catch((cause) => {
      throw new ScrapperError(ScrapperErrorEnum.LoadUrl, {
        parts: [this._url],
        cause,
      });
    });

    return load(data);
  }

  public scrap(): Promise<string | undefined> {
    throw new Error('Not implemented');
  }
}
