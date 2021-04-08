import { Directory } from '../../domains/Directory';
import { User } from '../../domains/User';
import { PaginationQuery, PaginationOptions } from '../../interfaces/pagination';
import { IDirectoryRepository } from '../../repositories/IDirectoryRepository';

export class FindDirectoryList {
  private DirectoryRepository: IDirectoryRepository;

  constructor(DirectoryRepository: IDirectoryRepository) {
    this.DirectoryRepository = DirectoryRepository;
  }

  execute(user: User, page: number, limit: number): Promise<Directory> {
    const query: PaginationQuery = {
      createdUser: user._id,
    };

    const options: PaginationOptions = {
      page,
      limit,
      sort: { createdAt: -1 },
    };

    return this.DirectoryRepository.findDirectoryList(query, options);
  }
}
