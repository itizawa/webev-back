import axios from 'axios';
import * as cheerio from 'cheerio';
import { Document } from 'mongoose';
import { IPage, PageModel } from '../models/page';
import { IUser } from '../models/user';
import { WebevApp } from './WebevApp';

export class PageService {
  webevApp: WebevApp;

  constructor(WebevApp: WebevApp) {
    this.webevApp = WebevApp;
  }

  async retrieveDataByUrl(url: string): Promise<Partial<IPage>> {
    try {
      const result = await axios.get(url);
      const $ = cheerio.load(result.data);

      return {
        url: url,
        image: $("meta[property='og:image']").attr('content'),
        description: $("meta[property='og:description']").attr('content'),
        title: $("meta[property='og:title']").attr('content'),
      };
    } catch (error) {
      return {
        url: url,
        title: url,
        description: '取得できませんでした',
      };
    }
  }

  savePage(page: Partial<IPage>, user: Document<IUser>): Promise<Document<IPage>> {
    // set creator id
    page.createdUser = user;
    return PageModel.create(page);
  }
}
