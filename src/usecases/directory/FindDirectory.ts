import { Directory } from '../../domains/Directory';
import { IDirectoryRepository } from '../../repositories/IDirectoryRepository';

export class FindDirectory {
  private DirectoryRepository: IDirectoryRepository;

  constructor(DirectoryRepository: IDirectoryRepository) {
    this.DirectoryRepository = DirectoryRepository;
  }

  execute(directoryId: string, userId: string): Promise<Directory> {
    return this.DirectoryRepository.findDirectory(directoryId, userId);
  }
}
