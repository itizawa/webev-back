import { Page, PageStatus } from '../domains/Page';

export interface IPageRepository {
  createPage(page: Partial<Page>): Promise<Page>;
  findPageById(id: string, userId: string): Promise<Page>;
  updatePageStatus(id: string, userId: string, status: PageStatus): Promise<Page>;
}
