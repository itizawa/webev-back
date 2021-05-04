import { DirectoryTree } from '../../domains/DirectoryTree';
import { IDirectoryTreeRepository } from '../../repositories/IDirectoryTreeRepository';

export class FindAncestorDirectoriesUseCase {
  private DirectoryTreeRepository: IDirectoryTreeRepository;

  constructor(DirectoryTreeRepository: IDirectoryTreeRepository) {
    this.DirectoryTreeRepository = DirectoryTreeRepository;
  }

  execute(directoryId: string): Promise<DirectoryTree[]> {
    return this.DirectoryTreeRepository.findAncestorDirectories(directoryId);
  }
}
