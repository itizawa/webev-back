import { Page } from '../domains/Page';

export interface IPageRepository {
  findPageById(id: string, userId: string): Promise<Page>;
}
