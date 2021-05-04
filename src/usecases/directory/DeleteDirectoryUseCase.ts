import { User } from '../../domains/User';
import { Directory } from '../../domains/Directory';
import { IDirectoryRepository } from '../../repositories/IDirectoryRepository';
import { IDirectoryTreeRepository } from '../../repositories/IDirectoryTreeRepository';
import { IPageRepository } from '../../repositories/IPageRepository';

export class DeleteDirectoryUseCase {
  private directoryRepository: IDirectoryRepository;
  private directoryTreeRepository: IDirectoryTreeRepository;
  private pageRepository: IPageRepository;

  constructor(directoryRepository: IDirectoryRepository, directoryTreeRepository: IDirectoryTreeRepository, pageRepository: IPageRepository) {
    this.directoryRepository = directoryRepository;
    this.directoryTreeRepository = directoryTreeRepository;
    this.pageRepository = pageRepository;
  }

  async execute(directoryId: string, user: User): Promise<Directory> {
    await this.pageRepository.findByDirectoryIdAndDeleteDirectoryId(directoryId, user._id);
    const deletedDirectory = await this.directoryRepository.deleteDirectory(directoryId, user._id);
    if (deletedDirectory.isRoot) {
      await this.directoryRepository.decreaseDirectory(deletedDirectory.order, 10000, user._id);
    }

    await this.directoryTreeRepository.deleteDirectoryTree(directoryId);

    return deletedDirectory;
  }
}
