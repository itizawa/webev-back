import { Page } from '../domains/Page';

export interface IPageRepository {
  create(page: Page): Promise<Page>;
}
