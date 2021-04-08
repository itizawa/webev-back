import { Directory } from '../domains/Directory';
import { PaginationQuery, PaginationOptions } from '../interfaces/pagination';

export interface IDirectoryRepository {
  createDirectory(directory: Partial<Directory>): Promise<Directory>;
  countDirectoryByName(name: string, userId: string): Promise<number>;
  deleteDirectory(directoryId: string, userId: string): Promise<Directory>;
  findDirectory(directoryId: string, userId: string): Promise<Directory>;
  findDirectoryList(query: PaginationQuery, options: PaginationOptions): Promise<Directory>;
  renameDirectory(directoryId: string, name: string, userId: string): Promise<Directory>;
}
