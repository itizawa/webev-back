import { Directory } from '../../domains/Directory';
import { IDirectoryRepository } from '../../repositories/IDirectoryRepository';

export class UpdateIsPublicOfDirectoryUseCase {
  private directoryRepository: IDirectoryRepository;

  constructor(directoryRepository: IDirectoryRepository) {
    this.directoryRepository = directoryRepository;
  }

  async execute({ directoryId, isPublic, userId }: { directoryId: string; isPublic: boolean; userId: string }): Promise<Directory> {
    return this.directoryRepository.updateIsPublic({ directoryId, isPublic, userId });
  }
}
