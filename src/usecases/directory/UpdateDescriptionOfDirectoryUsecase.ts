import { Directory } from '../../domains/Directory';
import { IDirectoryRepository } from '../../repositories/IDirectoryRepository';

export class UpdateDescriptionOfDirectoryUsecase {
  private directoryRepository: IDirectoryRepository;

  constructor(directoryRepository: IDirectoryRepository) {
    this.directoryRepository = directoryRepository;
  }

  async execute(directoryId: string, description: string, userId: string): Promise<Directory> {
    return this.directoryRepository.updateDescription(directoryId, description, userId);
  }
}
