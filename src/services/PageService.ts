import axios from 'axios';
import * as cheerio from 'cheerio';
import { Document } from 'mongoose';
import { IPage, PageModel } from '../models/page';
import { WebevApp } from './WebevApp';

type ogpResponse = {
  image?: string;
  description?: string;
  title?: string;
  body?: string;
};

export class PageService {
  webevApp: WebevApp;

  constructor(WebevApp: WebevApp) {
    this.webevApp = WebevApp;
  }

  async retrieveDataByUrl(url: string): Promise<ogpResponse> {
    const result = await axios.get(url);
    const $ = cheerio.load(result.data);

    return {
      image: $("meta[property='og:image']").attr('content'),
      description: $("meta[property='og:description']").attr('content'),
      title: $("meta[property='og:title']").attr('content'),
      body: $('body').html(),
    };
  }

  savePage(page: ogpResponse): Promise<Document<IPage>> {
    return PageModel.create(page);
  }
}
