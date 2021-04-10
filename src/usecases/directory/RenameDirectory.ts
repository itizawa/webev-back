import { Directory } from '../../domains/Directory';
import { IDirectoryRepository } from '../../repositories/IDirectoryRepository';

export class RenameDirectory {
  private directoryRepository: IDirectoryRepository;

  constructor(directoryRepository: IDirectoryRepository) {
    this.directoryRepository = directoryRepository;
  }

  async execute(directoryId: string, name: string, createdUser: string): Promise<Directory> {
    const isExist = await this.directoryRepository.isExistDirectoryByName(name, createdUser);

    // Cannot use the name have already created
    if (isExist) {
      throw new Error('This name directory already exists');
    }

    return this.directoryRepository.renameDirectory(directoryId, name, createdUser);
  }
}
