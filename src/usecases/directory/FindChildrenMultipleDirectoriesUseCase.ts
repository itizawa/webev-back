import { DirectoryTree } from '../../domains/DirectoryTree';
import { IDirectoryTreeRepository } from '../../repositories/IDirectoryTreeRepository';

export class FindChildrenMultipleDirectoriesUseCase {
  constructor(private readonly DirectoryTreeRepository: IDirectoryTreeRepository) {}

  execute({ parentDirectoryIds }: { parentDirectoryIds: string[] }): Promise<DirectoryTree[]> {
    return this.DirectoryTreeRepository.findChildrenMultipleDirectories({ parentDirectoryIds });
  }
}
