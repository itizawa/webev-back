import { Directory } from '../../domains/Directory';
import { IDirectoryRepository } from '../../repositories/IDirectoryRepository';
import { IDirectoryTreeRepository } from '../../repositories/IDirectoryTreeRepository';

export class CreateDirectoryUseCase {
  private directoryRepository: IDirectoryRepository;
  private directoryTreeRepository: IDirectoryTreeRepository;

  constructor(directoryRepository: IDirectoryRepository, directoryTreeRepository: IDirectoryTreeRepository) {
    this.directoryRepository = directoryRepository;
    this.directoryTreeRepository = directoryTreeRepository;
  }

  async execute(name: string, createdUser: string, parentDirectoryId?: string): Promise<Directory> {
    let countForSave: number = null;
    let isRoot = false;
    if (parentDirectoryId == null) {
      // order is the number of count + 1
      const count = await this.directoryRepository.countDirectoryByUserId(createdUser);
      countForSave = count + 1;
      isRoot = true;
    }

    const createdDirectory = await this.directoryRepository.createDirectory({ name, createdUser, order: countForSave, isRoot });

    // create SelfReference
    await this.directoryTreeRepository.createSelfReference(createdDirectory._id);

    if (parentDirectoryId != null) {
      this.directoryTreeRepository.createPathAsDescendant(parentDirectoryId, createdDirectory._id);
    }

    return createdDirectory;
  }
}
