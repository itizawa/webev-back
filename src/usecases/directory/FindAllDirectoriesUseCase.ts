import { Directory } from '../../domains/Directory';
import { IDirectoryRepository } from '../../repositories/IDirectoryRepository';

export class FindAllDirectoriesUseCase {
  constructor(private readonly DirectoryRepository: IDirectoryRepository) {}

  execute({ userId }: { userId: string }): Promise<Partial<Directory>[]> {
    return this.DirectoryRepository.findAllDirectories({ userId });
  }
}
