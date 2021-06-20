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
    const deletedDirectory = await this.directoryRepository.deleteDirectory({ directoryId, userId: user._id });
    if (deletedDirectory.isRoot) {
      await this.directoryRepository.decreaseDirectory(deletedDirectory.order, 10000, user._id);
    }
    const directoryIds = await this.directoryTreeRepository.deleteDirectoryTree(directoryId);
    await this.pageRepository.findByDirectoryIdAndDeleteDirectoryId({ directoryIds, userId: user._id });
    await this.directoryRepository.deleteDirectories({ directoryIds, userId: user._id });

    return deletedDirectory;
  }
}
