import { Directory } from '../../domains/Directory';
import { IDirectoryRepository } from '../../repositories/IDirectoryRepository';

export class FindDirectoryUseCase {
  constructor(private readonly DirectoryRepository: IDirectoryRepository) {}

  execute({ directoryId, userId }: { directoryId: string; userId: string }): Promise<Directory> {
    return this.DirectoryRepository.findDirectory({ directoryId, userId });
  }
}
