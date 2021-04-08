import { Page, PageStatus } from '../../domains/Page';
import { User } from '../../domains/User';
import { PaginationQuery, PaginationOptions } from '../../interfaces/pagination';
import { IPageRepository } from '../../repositories/IPageRepository';

export class FindPageList {
  private pageRepository: IPageRepository;

  constructor(pageRepository: IPageRepository) {
    this.pageRepository = pageRepository;
  }

  execute(user: User, status: PageStatus, isFavorite: boolean, sort: string, page: number, limit: number): Promise<Page> {
    const query: PaginationQuery = {
      createdUser: user._id,
      status,
    };

    if (isFavorite != null) {
      query.isFavorite = isFavorite;
    }

    const options: PaginationOptions = {
      page,
      limit,
    };

    if (sort != null) {
      const sortOrder = sort.startsWith('-') ? -1 : 1;
      const sortKey = sortOrder === -1 ? sort.slice(1) : sort;
      options.sort = { [sortKey]: sortOrder };
    }

    return this.pageRepository.findPageList(query, options);
  }
}
