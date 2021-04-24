import { Directory } from '../../domains/Directory';
import { IDirectoryRepository } from '../../repositories/IDirectoryRepository';
import { IPageRepository } from '../../repositories/IPageRepository';

export class DeleteDirectory {
  private directoryRepository: IDirectoryRepository;
  private pageRepository: IPageRepository;

  constructor(directoryRepository: IDirectoryRepository, pageRepository: IPageRepository) {
    this.directoryRepository = directoryRepository;
    this.pageRepository = pageRepository;
  }

  async execute(directoryId: string, userId: string): Promise<Directory> {
    await this.pageRepository.findByDirectoryIdAndDeleteDirectoryId(directoryId, userId);
    const deletedDirectory = await this.directoryRepository.deleteDirectory(directoryId, userId);
    await this.directoryRepository.decreaseDirectory(deletedDirectory.order, 10000, userId);
    return deletedDirectory;
  }
}
