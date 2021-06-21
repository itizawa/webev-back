import { Directory } from '../../domains/Directory';
import { IDirectoryRepository } from '../../repositories/IDirectoryRepository';

export class RenameDirectoryUseCase {
  private directoryRepository: IDirectoryRepository;

  constructor(directoryRepository: IDirectoryRepository) {
    this.directoryRepository = directoryRepository;
  }

  async execute({ directoryId, name, userId }: { directoryId: string; name: string; userId: string }): Promise<Directory> {
    return this.directoryRepository.renameDirectory({ directoryId, name, userId });
  }
}
