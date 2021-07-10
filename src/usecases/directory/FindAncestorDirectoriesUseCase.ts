import { DirectoryTree } from '../../domains/DirectoryTree';
import { IDirectoryTreeRepository } from '../../repositories/IDirectoryTreeRepository';

export class FindAncestorDirectoriesUseCase {
  constructor(private readonly DirectoryTreeRepository: IDirectoryTreeRepository) {}

  execute({ directoryId }: { directoryId: string }): Promise<DirectoryTree[]> {
    return this.DirectoryTreeRepository.findAncestorDirectories({ directoryId });
  }
}
