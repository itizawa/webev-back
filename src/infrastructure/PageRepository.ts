import { Page } from '../domains/Page';
import { IPageRepository } from '../repositories/IPageRepository';
import { PageModel, PageStatus } from '../models/page';
export class PageRepository implements IPageRepository {
  async createPage(page: Partial<Page>): Promise<Page> {
    return PageModel.create(page);
  }
  async findPageById(id: string, userId: string): Promise<Page> {
    return PageModel.findOne({ _id: id, createdUser: userId });
  }
  async updatePageStatus(pageId: string, userId: string, status: PageStatus): Promise<Page> {
    return PageModel.findOneAndUpdate({ _id: pageId, createdUser: userId }, { status }, { new: true });
  }
  async updateIsFavorite(pageId: string, userId: string, isFavorite: boolean): Promise<Page> {
    return PageModel.findOneAndUpdate({ _id: pageId, createdUser: userId }, { isFavorite }, { new: true });
  }
}
