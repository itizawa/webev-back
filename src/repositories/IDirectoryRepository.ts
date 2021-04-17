import { UpdateWriteOpResult } from 'mongoose';
import { Directory } from '../domains/Directory';
import { PaginationOptions, PaginationDirectoryQuery } from '../interfaces/pagination';

export interface IDirectoryRepository {
  createDirectory(directory: Partial<Directory>): Promise<Directory>;
  countDirectoryByUserId(userId: string): Promise<number>;
  isExistDirectoryByName(name: string, userId: string): Promise<boolean>;
  deleteDirectory(directoryId: string, userId: string): Promise<Directory>;
  findDirectory(directoryId: string, userId: string): Promise<Directory>;
  findDirectoryList(query: PaginationDirectoryQuery, options: PaginationOptions): Promise<Directory>;
  renameDirectory(directoryId: string, name: string, userId: string): Promise<Directory>;
  updateOrder(directoryId: string, order: number, userId: string): Promise<Directory>;
  increaseDirectory(min: number, max: number, userId: string): Promise<UpdateWriteOpResult>;
  decreaseDirectory(min: number, max: number, userId: string): Promise<UpdateWriteOpResult>;
}
