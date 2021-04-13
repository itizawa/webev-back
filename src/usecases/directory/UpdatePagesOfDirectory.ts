import { Directory } from '../../domains/Directory';
import { Page } from '../../domains/Page';
import { IDirectoryRepository } from '../../repositories/IDirectoryRepository';

export class UpdatePagesOfDirectory {
  private directoryRepository: IDirectoryRepository;

  constructor(directoryRepository: IDirectoryRepository) {
    this.directoryRepository = directoryRepository;
  }

  async execute(directoryId: string, pages: Page[], userId: string): Promise<Directory> {
    return this.directoryRepository.updatePagesOfDirectory(directoryId, pages, userId);
  }
}
