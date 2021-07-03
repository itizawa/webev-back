import { Directory } from '../../domains/Directory';
import { PaginationOptions, PaginationDirectoryQuery } from '../../interfaces/pagination';
import { IDirectoryRepository } from '../../repositories/IDirectoryRepository';

export class FindDirectoryListUseCase {
  constructor(private readonly DirectoryRepository: IDirectoryRepository) {}

  execute({ query, options }: { query: PaginationDirectoryQuery; options: PaginationOptions }): Promise<Directory> {
    return this.DirectoryRepository.findDirectoryList({ query, options });
  }
}
