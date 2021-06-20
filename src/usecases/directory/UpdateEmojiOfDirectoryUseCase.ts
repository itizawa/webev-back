import { Directory } from '../../domains/Directory';
import { IDirectoryRepository } from '../../repositories/IDirectoryRepository';

export class UpdateEmojiOfDirectoryUsecase {
  private directoryRepository: IDirectoryRepository;

  constructor(directoryRepository: IDirectoryRepository) {
    this.directoryRepository = directoryRepository;
  }

  async execute(directoryId: string, emojiId: string): Promise<Directory> {
    return this.directoryRepository.updateEmoji(directoryId, emojiId);
  }
}
