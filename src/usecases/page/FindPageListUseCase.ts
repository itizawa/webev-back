import { Page } from '../../domains/Page';
import { PaginationQuery, PaginationOptions } from '../../interfaces/pagination';
import { IPageRepository } from '../../repositories/IPageRepository';

export class FindPageListUseCase {
  constructor(private readonly pageRepository: IPageRepository) {}

  execute({ query, options }: { query: PaginationQuery; options: PaginationOptions }): Promise<Page> {
    return this.pageRepository.findPageList({ query, options });
  }
}
