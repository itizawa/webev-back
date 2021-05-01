import { Directory } from '../../domains/Directory';
import { IDirectoryRepository } from '../../repositories/IDirectoryRepository';

export class RenameDirectory {
  private directoryRepository: IDirectoryRepository;

  constructor(directoryRepository: IDirectoryRepository) {
    this.directoryRepository = directoryRepository;
  }

  async execute(directoryId: string, name: string, createdUser: string): Promise<Directory> {
    return this.directoryRepository.renameDirectory(directoryId, name, createdUser);
  }
}
