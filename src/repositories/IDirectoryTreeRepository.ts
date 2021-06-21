import { DirectoryTree } from '../domains/DirectoryTree';

export interface IDirectoryTreeRepository {
  createSelfReference({ directoryId }: { directoryId: string }): Promise<DirectoryTree>;
  createPathAsDescendant({ ancestorId, descendantId }: { ancestorId: string; descendantId: string }): Promise<void>;
  findChildrenDirectories({ parentDirectoryId }: { parentDirectoryId: string }): Promise<DirectoryTree[]>;
  findAncestorDirectories({ directoryId }: { directoryId: string }): Promise<DirectoryTree[]>;
  deleteDirectoryTree(directoryId: string): Promise<string[]>;
}
