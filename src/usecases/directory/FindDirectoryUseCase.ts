import { User } from '../../domains/User';
import { Directory } from '../../domains/Directory';
import { IDirectoryRepository } from '../../repositories/IDirectoryRepository';

export class FindDirectoryUseCase {
  private DirectoryRepository: IDirectoryRepository;

  constructor(DirectoryRepository: IDirectoryRepository) {
    this.DirectoryRepository = DirectoryRepository;
  }

  execute(directoryId: string, user: User): Promise<Directory> {
    return this.DirectoryRepository.findDirectory({ directoryId, userId: user._id });
  }
}
