import { Page } from '../domains/Page';

export interface IPageRepository {
  create(page: Partial<Page>): Promise<Page>;
  findPageById(id: string, userId: string): Promise<Page>;
}
