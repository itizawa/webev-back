import { Directory } from '../../domains/Directory';
import { IDirectoryRepository } from '../../repositories/IDirectoryRepository';

export class FindAllParentDirectoriesUseCase {
  private DirectoryRepository: IDirectoryRepository;

  constructor(DirectoryRepository: IDirectoryRepository) {
    this.DirectoryRepository = DirectoryRepository;
  }

  execute({ userId }: { userId: string }): Promise<Directory[]> {
    return this.DirectoryRepository.findAllParentsDirectories({ userId });
  }
}
