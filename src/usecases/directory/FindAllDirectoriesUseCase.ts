import { Directory } from '../../domains/Directory';
import { IDirectoryRepository } from '../../repositories/IDirectoryRepository';

export class FindAllDirectoriesUseCase {
  private DirectoryRepository: IDirectoryRepository;

  constructor(DirectoryRepository: IDirectoryRepository) {
    this.DirectoryRepository = DirectoryRepository;
  }

  execute({ userId }: { userId: string }): Promise<Partial<Directory>[]> {
    return this.DirectoryRepository.findAllDirectories({ userId });
  }
}
