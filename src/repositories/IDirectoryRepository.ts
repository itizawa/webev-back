import { UpdateWriteOpResult } from 'mongoose';
import { Directory } from '../domains/Directory';
import { PaginationOptions, PaginationDirectoryQuery } from '../interfaces/pagination';

export interface IDirectoryRepository {
  createDirectory(directory: Partial<Directory>): Promise<Directory>;
  countDirectoryByUserId(userId: string): Promise<number>;
  isExistDirectoryByName(name: string, userId: string): Promise<boolean>;
  deleteDirectory(directoryId: string, userId: string): Promise<Directory>;
  deleteDirectories(directoryIds: string[], userId: string): Promise<number>;
  findDirectory(directoryId: string, userId: string): Promise<Directory>;
  FindAllDirectories(userId: string): Promise<Partial<Directory>[]>;
  findDirectoryList(query: PaginationDirectoryQuery, options: PaginationOptions): Promise<Directory>;
  renameDirectory(directoryId: string, name: string, userId: string): Promise<Directory>;
  updateOrder(directoryId: string, order: number, userId: string): Promise<Directory>;
  updateDescription(directoryId: string, description: string, userId: string): Promise<Directory>;
  increaseDirectory(min: number, max: number, userId: string): Promise<UpdateWriteOpResult>;
  decreaseDirectory(min: number, max: number, userId: string): Promise<UpdateWriteOpResult>;
}
