import { Page } from '../domains/Page';

export interface IPageRepository {
  createPage(page: Partial<Page>): Promise<Page>;
  findPageById(id: string, userId: string): Promise<Page>;
}
