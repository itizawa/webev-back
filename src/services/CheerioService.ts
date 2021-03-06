import axios from 'axios';
import * as cheerio from 'cheerio';
import { Page } from '../domains/Page';

export class CheerioService {
  async retrieveDataByUrl({ url }: { url: string }): Promise<Partial<Page>> {
    try {
      const result = await axios.get(url);
      const $ = cheerio.load(result.data);

      return {
        url: url,
        favicon: $("link[rel='icon']").attr('href') || $("link[rel='shortcut icon']").attr('href'),
        image: $("meta[property='og:image']").attr('content'),
        description: $("meta[property='og:description']").attr('content'),
        title: $("meta[property='og:title']").attr('content'),
        siteName: $("meta[property='og:site_name']").attr('content'),
      };
    } catch (error) {
      console.log(error);
      return {
        url: url,
        title: url,
        description: '取得できませんでした',
      };
    }
  }
}
