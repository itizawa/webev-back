import { Directory } from '../../domains/Directory';
import { IDirectoryRepository } from '../../repositories/IDirectoryRepository';

export class FindAllParentDirectoriesUseCase {
  constructor(private readonly DirectoryRepository: IDirectoryRepository) {}

  execute({ userId }: { userId: string }): Promise<Directory[]> {
    return this.DirectoryRepository.findAllParentsDirectories({ userId });
  }
}
