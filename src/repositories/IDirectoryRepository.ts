import { Directory } from '../domains/Directory';

export interface IDirectoryRepository {
  createDirectory(directory: Partial<Directory>): Promise<Directory>;
  countDirectoryByName(name: string, userId: string): Promise<number>;
}
