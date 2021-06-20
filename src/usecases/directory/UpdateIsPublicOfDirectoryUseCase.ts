import { User } from '../../domains/User';
import { Directory } from '../../domains/Directory';
import { IDirectoryRepository } from '../../repositories/IDirectoryRepository';

export class UpdateIsPublicOfDirectoryUseCase {
  private directoryRepository: IDirectoryRepository;

  constructor(directoryRepository: IDirectoryRepository) {
    this.directoryRepository = directoryRepository;
  }

  async execute(directoryId: string, isPublic: boolean, user: User): Promise<Directory> {
    return this.directoryRepository.updateIsPublic(directoryId, isPublic, user._id);
  }
}
