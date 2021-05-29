import { User } from '../../domains/User';
import { Directory } from '../../domains/Directory';
import { IDirectoryRepository } from '../../repositories/IDirectoryRepository';

export class FindAllDirectoryUseCase {
  private DirectoryRepository: IDirectoryRepository;

  constructor(DirectoryRepository: IDirectoryRepository) {
    this.DirectoryRepository = DirectoryRepository;
  }

  execute(user: User): Promise<Directory[]> {
    return this.DirectoryRepository.findAllDirectory(user._id);
  }
}
