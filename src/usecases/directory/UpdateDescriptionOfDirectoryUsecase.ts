import { Directory } from '../../domains/Directory';
import { IDirectoryRepository } from '../../repositories/IDirectoryRepository';

export class UpdateDescriptionOfDirectoryUsecase {
  constructor(private readonly directoryRepository: IDirectoryRepository) {}

  async execute({ directoryId, description, userId }: { directoryId: string; description: string; userId: string }): Promise<Directory> {
    return this.directoryRepository.updateDescription({ directoryId, description, userId });
  }
}
