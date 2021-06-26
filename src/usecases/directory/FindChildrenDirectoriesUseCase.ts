import { DirectoryTree } from '../../domains/DirectoryTree';
import { IDirectoryTreeRepository } from '../../repositories/IDirectoryTreeRepository';

export class FindChildrenDirectoriesUseCase {
  private DirectoryTreeRepository: IDirectoryTreeRepository;

  constructor(DirectoryTreeRepository: IDirectoryTreeRepository) {
    this.DirectoryTreeRepository = DirectoryTreeRepository;
  }

  execute({ parentDirectoryId }: { parentDirectoryId: string }): Promise<DirectoryTree[]> {
    return this.DirectoryTreeRepository.findChildrenDirectories({ parentDirectoryId });
  }
}
