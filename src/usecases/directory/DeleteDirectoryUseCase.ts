import { Directory } from '../../domains/Directory';
import { IDirectoryRepository } from '../../repositories/IDirectoryRepository';
import { IDirectoryTreeRepository } from '../../repositories/IDirectoryTreeRepository';
import { IPageRepository } from '../../repositories/IPageRepository';

export class DeleteDirectoryUseCase {
  constructor(
    private readonly directoryRepository: IDirectoryRepository,
    private readonly directoryTreeRepository: IDirectoryTreeRepository,
    private readonly pageRepository: IPageRepository,
  ) {}

  async execute({ directoryId, userId }: { directoryId: string; userId: string }): Promise<Directory> {
    const deletedDirectory = await this.directoryRepository.deleteDirectory({ directoryId, userId });
    if (deletedDirectory.isRoot) {
      await this.directoryRepository.decreaseDirectory({ min: deletedDirectory.order, max: 10000, userId });
    }
    const directoryIds = await this.directoryTreeRepository.deleteDirectoryTree({ directoryId });
    await this.pageRepository.findByDirectoryIdAndDeleteDirectoryId({ directoryIds, userId });
    await this.directoryRepository.deleteDirectories({ directoryIds, userId });

    return deletedDirectory;
  }
}
