import axios from 'axios';
import * as cheerio from 'cheerio';
import { Document } from 'mongoose';
import { IPage, PageModel, PageStatus } from '../models/page';
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

  async updatePageById(pageId: string, page: Partial<IPage>): Promise<Document<IPage>> {
    const result = await PageModel.findByIdAndUpdate(pageId, page);

    return result;
  }

  async updatePageFavorite(pageId: string, user: Document<IUser>, isFavorite: boolean): Promise<Document<IPage>> {
    const page = await PageModel.findOneAndUpdate({ _id: pageId, createdUser: user._id }, { isFavorite }, { new: true });

    return page;
  }

  async updatePageArchive(pageId: string, user: Document<IUser>, isArchive: boolean): Promise<Document<IPage>> {
    const status = isArchive ? PageStatus.PAGE_STATUS_ARCHIVE : PageStatus.PAGE_STATUS_STOCK;
    const page = await PageModel.findOneAndUpdate({ _id: pageId, createdUser: user._id }, { status }, { new: true });

    return page;
  }

  async deletePage(pageId: string, user: Document<IUser>): Promise<Document<IPage>> {
    const page = await PageModel.findOneAndUpdate({ _id: pageId, createdUser: user._id }, { status: PageStatus.PAGE_STATUS_DELETED }, { new: true });

    return page;
  }
}
