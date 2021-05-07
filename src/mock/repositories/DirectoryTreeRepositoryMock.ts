/* eslint-disable @typescript-eslint/no-unused-vars */
import { DirectoryTree } from '../../domains/DirectoryTree';
import { IDirectoryTreeRepository } from '../../repositories/IDirectoryTreeRepository';

export class DirectoryTreeRepositoryMock implements IDirectoryTreeRepository {
  createSelfReference(directoryId: string): Promise<DirectoryTree> {
    throw new Error('Method not implemented.');
  }
  createPathAsDescendant(ancestorId: string, descendantId: string): Promise<void> {
    throw new Error('Method not implemented.');
  }
  findChildrenDirectories(directoryId: string): Promise<DirectoryTree[]> {
    throw new Error('Method not implemented.');
  }
  findAncestorDirectories(directoryId: string): Promise<DirectoryTree[]> {
    throw new Error('Method not implemented.');
  }
  deleteDirectoryTree(directoryId: string): Promise<string[]> {
    throw new Error('Method not implemented.');
  }
}
