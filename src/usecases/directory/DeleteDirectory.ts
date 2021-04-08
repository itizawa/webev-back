import { Directory } from '../../domains/Directory';
import { IDirectoryRepository } from '../../repositories/IDirectoryRepository';

export class DeleteDirectory {
  private directoryRepository: IDirectoryRepository;

  constructor(directoryRepository: IDirectoryRepository) {
    this.directoryRepository = directoryRepository;
  }

  async execute(directoryId: string, userId: string): Promise<Directory> {
    return this.directoryRepository.deleteDirectory(directoryId, userId);
  }
}
