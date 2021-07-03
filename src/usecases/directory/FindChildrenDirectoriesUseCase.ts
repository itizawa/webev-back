import { DirectoryTree } from '../../domains/DirectoryTree';
import { IDirectoryTreeRepository } from '../../repositories/IDirectoryTreeRepository';

export class FindChildrenDirectoriesUseCase {
  constructor(private readonly DirectoryTreeRepository: IDirectoryTreeRepository) {}

  execute({ parentDirectoryId }: { parentDirectoryId: string }): Promise<DirectoryTree[]> {
    return this.DirectoryTreeRepository.findChildrenDirectories({ parentDirectoryId });
  }
}
