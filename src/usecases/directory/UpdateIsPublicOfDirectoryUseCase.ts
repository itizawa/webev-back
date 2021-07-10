import { Directory } from '../../domains/Directory';
import { IDirectoryRepository } from '../../repositories/IDirectoryRepository';

export class UpdateIsPublicOfDirectoryUseCase {
  constructor(private readonly directoryRepository: IDirectoryRepository) {}

  async execute({ directoryId, isPublic, userId }: { directoryId: string; isPublic: boolean; userId: string }): Promise<Directory> {
    return this.directoryRepository.updateIsPublic({ directoryId, isPublic, userId });
  }
}
