import { Inject, Injectable } from '@tsed/common';
import { MongooseModel } from '@tsed/mongoose';
import { Page } from '../domains/Page';
import { IPageRepository } from '../repositories/IPageRepository';

@Injectable()
export class PageRepository implements IPageRepository {
  @Inject(Page)
  private Page: MongooseModel<Page>;

  async create(page: Page): Promise<Page> {
    const createdPage = await this.Page.create(page);
    return createdPage;
  }
}
