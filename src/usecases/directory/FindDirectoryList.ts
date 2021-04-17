import { Directory } from '../../domains/Directory';
import { PaginationOptions, PaginationDirectoryQuery } from '../../interfaces/pagination';
import { IDirectoryRepository } from '../../repositories/IDirectoryRepository';

export class FindDirectoryList {
  private DirectoryRepository: IDirectoryRepository;

  constructor(DirectoryRepository: IDirectoryRepository) {
    this.DirectoryRepository = DirectoryRepository;
  }

  execute(query: PaginationDirectoryQuery, options: PaginationOptions): Promise<Directory> {
    return this.DirectoryRepository.findDirectoryList(query, options);
  }
}
