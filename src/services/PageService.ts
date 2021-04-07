import axios from 'axios';
import * as cheerio from 'cheerio';
import { Document } from 'mongoose';
import { Page } from '../domains/Page';
import { PageModel, PageStatus } from '../models/page';
import { WebevApp } from './WebevApp';

export class PageService {
  webevApp: WebevApp;

  constructor(WebevApp: WebevApp) {
    this.webevApp = WebevApp;
  }

  async retrieveDataByUrl(url: string): Promise<Partial<Page>> {
    try {
      const result = await axios.get(url);
      const $ = cheerio.load(result.data);

      return {
        url: url,
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

  async updatePageById(pageId: string, page: Partial<Page>): Promise<Document<Page>> {
    const result = await PageModel.findByIdAndUpdate(pageId, page);

    return result;
  }

  async updatePageFavorite(pageId: string, userId: string, isFavorite: boolean): Promise<Document<Page>> {
    const page = await PageModel.findOneAndUpdate({ _id: pageId, createdUser: userId }, { isFavorite }, { new: true });

    return page;
  }

  async deletePage(pageId: string, userId: string): Promise<Document<Page>> {
    const page = await PageModel.findOneAndUpdate({ _id: pageId, createdUser: userId }, { status: PageStatus.PAGE_STATUS_DELETED }, { new: true });

    return page;
  }
}
