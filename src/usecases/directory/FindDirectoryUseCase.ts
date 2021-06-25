import { Directory } from '../../domains/Directory';
import { IDirectoryRepository } from '../../repositories/IDirectoryRepository';

export class FindDirectoryUseCase {
  private DirectoryRepository: IDirectoryRepository;

  constructor(DirectoryRepository: IDirectoryRepository) {
    this.DirectoryRepository = DirectoryRepository;
  }

  execute({ directoryId, userId }: { directoryId: string; userId: string }): Promise<Directory> {
    return this.DirectoryRepository.findDirectory({ directoryId, userId });
  }
}
