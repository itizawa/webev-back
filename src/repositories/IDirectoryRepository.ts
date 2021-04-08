import { Directory } from '../domains/Directory';
import { PaginationQuery, PaginationOptions } from '../interfaces/pagination';

export interface IDirectoryRepository {
  createDirectory(directory: Partial<Directory>): Promise<Directory>;
  renameDirectory(directoryId: string, name: string, userId: string): Promise<Directory>;
  countDirectoryByName(name: string, userId: string): Promise<number>;
  findDirectoryList(query: PaginationQuery, options: PaginationOptions): Promise<Directory>;
}
