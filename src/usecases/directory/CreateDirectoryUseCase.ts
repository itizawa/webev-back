import { Directory } from '../../domains/Directory';
import { IDirectoryRepository } from '../../repositories/IDirectoryRepository';
import { IDirectoryTreeRepository } from '../../repositories/IDirectoryTreeRepository';

export class CreateDirectoryUseCase {
  constructor(private readonly directoryRepository: IDirectoryRepository, private readonly directoryTreeRepository: IDirectoryTreeRepository) {}

  async execute({ name, userId, parentDirectoryId }: { name: string; userId: string; parentDirectoryId?: string }): Promise<Directory> {
    let countForSave: number = null;
    let isRoot = false;
    if (parentDirectoryId == null) {
      // order is the number of count + 1
      const count = await this.directoryRepository.countDirectoryByUserId({ userId });
      countForSave = count + 1;
      isRoot = true;
    }

    const createdDirectory = await this.directoryRepository.createDirectory({ directory: { name, createdUser: userId, order: countForSave, isRoot } });

    // create SelfReference
    await this.directoryTreeRepository.createSelfReference({ directoryId: createdDirectory._id });

    if (parentDirectoryId != null) {
      this.directoryTreeRepository.createPathAsDescendant({ ancestorId: parentDirectoryId, descendantId: createdDirectory._id });
    }

    return createdDirectory;
  }
}
