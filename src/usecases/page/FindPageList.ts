import { Page } from '../../domains/Page';
import { PaginationQuery, PaginationOptions } from '../../interfaces/pagination';
import { IPageRepository } from '../../repositories/IPageRepository';

export class FindPageList {
  private pageRepository: IPageRepository;

  constructor(pageRepository: IPageRepository) {
    this.pageRepository = pageRepository;
  }

  execute(query: PaginationQuery, options: PaginationOptions): Promise<Page> {
    return this.pageRepository.findPageList(query, options);
  }
}
