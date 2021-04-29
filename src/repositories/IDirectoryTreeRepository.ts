import { DirectoryTree } from '../domains/DirectoryTree';

export interface IDirectoryTreeRepository {
  createSelfReference(directoryId: string): Promise<DirectoryTree>;
  createPathAsDescendant(ancestorId: string, descendantId: string): Promise<void>;
}
