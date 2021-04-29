export interface IDirectoryPathRepository {
  createSelfReference(directoryId: string): Promise<void>;
  createPathAsDescendant(ancestorId: string, descendantId: string): Promise<void>;
}
