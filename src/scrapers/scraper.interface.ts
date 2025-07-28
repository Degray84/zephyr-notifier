import axios from 'axios';
import { CheerioAPI, load } from 'cheerio';
import { ScrapperError, ScrapperErrorEnum } from './errors';

export class Scraper {
  protected $?: CheerioAPI;

  constructor(private readonly _url: string) {}

  public async parse() {
    console.log('parse');
    const { data } = await axios.get(this._url).catch((error) => {
      throw new ScrapperError(ScrapperErrorEnum.LoadUrl, [this._url]);
    });

    return load(data);
  }

  public scrap(): Promise<string | undefined> {
    throw new Error('Not implemented');
  }
}
