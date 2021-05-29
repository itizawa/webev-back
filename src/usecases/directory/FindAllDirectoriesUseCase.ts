import { User } from '../../domains/User';
import { Directory } from '../../domains/Directory';
import { IDirectoryRepository } from '../../repositories/IDirectoryRepository';

export class FindAllDirectoriesUseCase {
  private DirectoryRepository: IDirectoryRepository;

  constructor(DirectoryRepository: IDirectoryRepository) {
    this.DirectoryRepository = DirectoryRepository;
  }

  execute(user: User): Promise<Partial<Directory>[]> {
    return this.DirectoryRepository.FindAllDirectories(user._id);
  }
}
