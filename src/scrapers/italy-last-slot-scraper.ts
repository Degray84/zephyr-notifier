import { SITE_ITALY_URL } from '../config';
import { LogMethod } from '../decorators/logger';
import { ScrapperError, ScrapperErrorEnum } from './errors';
import { BaseScraper } from './base-scraper';

const CONTAINER_CLASS = 'card-visa';
const HEADER_TEXT = 'RELEASE OF SLOTS';

export class ItalyLastSlotScrapper extends BaseScraper {
  constructor() {
    super(SITE_ITALY_URL);
  }

  @LogMethod()
  public async scrap() {
    try {
      this.$ = await this.parse();

      const cardVisa = this.$(`.${CONTAINER_CLASS}`).first();
      if (!cardVisa.length) {
        throw new ScrapperError(ScrapperErrorEnum.NoElementFound, {
          parts: [CONTAINER_CLASS],
        });
      }

      const innerDivs = cardVisa.children('div');
      let startDiv: any | undefined;

      innerDivs.each((_, div) => {
        const h3 = this.$!(div).find('h3');
        if (h3.length && h3.text().includes(HEADER_TEXT)) {
          startDiv = div;
          return false; // break
        }
      });

      if (!startDiv) {
        throw new ScrapperError(ScrapperErrorEnum.NoElementFound, {
          parts: [HEADER_TEXT],
        });
      }

      let resultHtml = this.$!.html(startDiv);
      let next = this.$!(startDiv).next();
      while (next.length && next[0].tagName !== 'div') {
        resultHtml += this.$!.html(next);
        next = next.next();
      }

      return this.$(resultHtml)
        .text()
        .replace(/\s*\n\s*/g, '\n')
        .replace(/\n{2,}/g, '\n')
        .replace(/^\s+|\s+$/g, '')
        .replace(
          /(\d{1,3}(?:,\d{3})*|\d+)\s*-\s*(\d{1,3}(?:,\d{3})*|\d+)/g,
          '<b>$&</b>',
        );
    } catch (cause) {
      if (cause instanceof ScrapperError) {
        throw cause;
      }

      if (cause instanceof Error) {
        throw new ScrapperError(ScrapperErrorEnum.Default, { cause });
      }
    }
  }
}
