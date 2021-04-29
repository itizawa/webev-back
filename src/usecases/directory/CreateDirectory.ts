import { Directory } from '../../domains/Directory';
import { IDirectoryRepository } from '../../repositories/IDirectoryRepository';
import { IDirectoryTreeRepository } from '../../repositories/IDirectoryTreeRepository';

export class CreateDirectory {
  private directoryRepository: IDirectoryRepository;
  private directoryTreeRepository: IDirectoryTreeRepository;

  constructor(directoryRepository: IDirectoryRepository, directoryTreeRepository: IDirectoryTreeRepository) {
    this.directoryRepository = directoryRepository;
    this.directoryTreeRepository = directoryTreeRepository;
  }

  async execute(name: string, createdUser: string, parentDirectoryId?: string): Promise<Directory> {
    const isExist = await this.directoryRepository.isExistDirectoryByName(name, createdUser);

    // Cannot use the name have already created
    if (isExist) {
      throw new Error('This name directory already exists');
    }

    // order is the number of count + 1
    const count = await this.directoryRepository.countDirectoryByUserId(createdUser);

    const createdDirectory = await this.directoryRepository.createDirectory({ name, createdUser, order: count + 1 });

    // create SelfReference
    await this.directoryTreeRepository.createSelfReference(createdDirectory._id);

    if (parentDirectoryId != null) {
      this.directoryTreeRepository.createPathAsDescendant(parentDirectoryId, createdDirectory._id);
    }

    return createdDirectory;
  }
}
