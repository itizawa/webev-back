import { Page } from '../domains/Page';
import { IPageRepository } from '../repositories/IPageRepository';
import { PageModel } from '../models/page';
export class PageRepository implements IPageRepository {
  async create(page: Page): Promise<Page> {
    return PageModel.create(page);
  }

  async findPageById(id: string, userId: string): Promise<Page> {
    return PageModel.findOne({ _id: id, createdUser: userId });
  }
}
