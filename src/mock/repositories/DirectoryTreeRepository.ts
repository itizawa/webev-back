/* eslint-disable @typescript-eslint/no-unused-vars */
import { DirectoryTree } from '../../domains/DirectoryTree';
import { IDirectoryTreeRepository } from '../../repositories/IDirectoryTreeRepository';

export class DirectoryTreeRepositoryMock implements IDirectoryTreeRepository {
  createSelfReference(directoryId: string): Promise<DirectoryTree> {
    throw 'not implement';
  }
  createPathAsDescendant(ancestorId: string, descendantId: string): Promise<void> {
    throw 'not implement';
  }
  findChildrenDirectories(directoryId: string): Promise<DirectoryTree[]> {
    throw 'not implement';
  }
  findAncestorDirectories(directoryId: string): Promise<DirectoryTree[]> {
    throw 'not implement';
  }
  deleteDirectoryTree(directoryId: string): Promise<void> {
    throw 'not implement';
  }
}
