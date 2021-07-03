import { Directory } from '../../domains/Directory';
import { IDirectoryRepository } from '../../repositories/IDirectoryRepository';

export class UpdateEmojiOfDirectoryUsecase {
  constructor(private readonly directoryRepository: IDirectoryRepository) {}

  async execute({ directoryId, emojiId, userId }: { directoryId: string; emojiId: string; userId: string }): Promise<Directory> {
    return this.directoryRepository.updateEmoji({ directoryId, emojiId, userId });
  }
}
