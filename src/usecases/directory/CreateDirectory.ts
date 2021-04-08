import { Directory } from '../../domains/Directory';
import { IDirectoryRepository } from '../../repositories/IDirectoryRepository';

export class CreateDirectory {
  private directoryRepository: IDirectoryRepository;

  constructor(directoryRepository: IDirectoryRepository) {
    this.directoryRepository = directoryRepository;
  }

  async execute(name: string, createdUser: string): Promise<Directory> {
    const count = await this.directoryRepository.countDirectoryByName(name, createdUser);

    // Cannot use the name have already created
    if (count > 0) {
      throw new Error('This name directory already exists');
    }

    return this.directoryRepository.createDirectory({ name, createdUser });
  }
}