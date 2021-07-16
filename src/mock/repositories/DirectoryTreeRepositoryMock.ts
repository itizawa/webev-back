/* eslint-disable @typescript-eslint/no-unused-vars */
import { DirectoryTree } from '../../domains/DirectoryTree';
import { IDirectoryTreeRepository } from '../../repositories/IDirectoryTreeRepository';

export class DirectoryTreeRepositoryMock implements IDirectoryTreeRepository {
  createSelfReference({ directoryId }: { directoryId: string }): Promise<DirectoryTree> {
    throw new Error('Method not implemented.');
  }
  createPathAsDescendant({ ancestorId, descendantId }: { ancestorId: string; descendantId: string }): Promise<void> {
    throw new Error('Method not implemented.');
  }
  findChildrenDirectories({ parentDirectoryId }: { parentDirectoryId: string }): Promise<DirectoryTree[]> {
    throw new Error('Method not implemented.');
  }
  findChildrenMultipleDirectories({ parentDirectoryIds }: { parentDirectoryIds: string[] }): Promise<DirectoryTree[]> {
    throw new Error('Method not implemented.');
  }
  findAncestorDirectories({ directoryId }: { directoryId: string }): Promise<DirectoryTree[]> {
    throw new Error('Method not implemented.');
  }
  deleteDirectoryTree({ directoryId }: { directoryId: string }): Promise<string[]> {
    throw new Error('Method not implemented.');
  }
}
