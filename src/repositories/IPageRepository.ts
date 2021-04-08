import { Page, PageStatus } from '../domains/Page';
import { PaginationQuery, PaginationOptions } from '../interfaces/pagination';

export interface IPageRepository {
  createPage(page: Partial<Page>): Promise<Page>;
  findPageById(id: string, userId: string): Promise<Page>;
  findPageList(query: PaginationQuery, options: PaginationOptions): Promise<Page>;
  updatePageById(id: string, page: Partial<Page>): Promise<Page>;
  updatePageStatus(id: string, userId: string, status: PageStatus): Promise<Page>;
  updateIsFavorite(id: string, userId: string, isFavorite: boolean): Promise<Page>;
}
