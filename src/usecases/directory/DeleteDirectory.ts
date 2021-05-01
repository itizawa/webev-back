import { Directory } from '../../domains/Directory';
import { IDirectoryRepository } from '../../repositories/IDirectoryRepository';
import { IDirectoryTreeRepository } from '../../repositories/IDirectoryTreeRepository';
import { IPageRepository } from '../../repositories/IPageRepository';

export class DeleteDirectory {
  private directoryRepository: IDirectoryRepository;
  private directoryTreeRepository: IDirectoryTreeRepository;
  private pageRepository: IPageRepository;

  constructor(directoryRepository: IDirectoryRepository, directoryTreeRepository: IDirectoryTreeRepository, pageRepository: IPageRepository) {
    this.directoryRepository = directoryRepository;
    this.directoryTreeRepository = directoryTreeRepository;
    this.pageRepository = pageRepository;
  }

  async execute(directoryId: string, userId: string): Promise<Directory> {
    await this.pageRepository.findByDirectoryIdAndDeleteDirectoryId(directoryId, userId);
    const deletedDirectory = await this.directoryRepository.deleteDirectory(directoryId, userId);
    if (deletedDirectory.isRoot) {
      await this.directoryRepository.decreaseDirectory(deletedDirectory.order, 10000, userId);
    }

    await this.directoryTreeRepository.deleteDirectoryTree(directoryId);

    return deletedDirectory;
  }
}
