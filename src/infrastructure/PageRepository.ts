import { Page } from '../domains/Page';
import { IPageRepository } from '../repositories/IPageRepository';
import { PageModel } from '../models/page';
export class PageRepository implements IPageRepository {
  async findPageById(id: string, userId: string): Promise<Page> {
    return PageModel.findOne({ _id: id, createdUser: userId });
  }
}
