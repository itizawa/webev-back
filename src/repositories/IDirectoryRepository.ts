import { UpdateWriteOpResult } from 'mongoose';
import { Directory } from '../domains/Directory';
import { PaginationOptions, PaginationDirectoryQuery } from '../interfaces/pagination';

export interface IDirectoryRepository {
  createDirectory({ directory }: { directory: Partial<Directory> }): Promise<Directory>;
  countDirectoryByUserId({ userId }: { userId: string }): Promise<number>;
  isExistDirectoryByName({ name, userId }: { name: string; userId: string }): Promise<boolean>;
  deleteDirectory({ directoryId, userId }: { directoryId: string; userId: string }): Promise<Directory>;
  deleteDirectories({ directoryIds, userId }: { directoryIds: string[]; userId: string }): Promise<number>;
  findDirectory({ directoryId, userId }: { directoryId: string; userId: string }): Promise<Directory>;
  findAllDirectories({ userId }: { userId: string }): Promise<Partial<Directory>[]>;
  findDirectoryList(query: PaginationDirectoryQuery, options: PaginationOptions): Promise<Directory>;
  renameDirectory(directoryId: string, name: string, userId: string): Promise<Directory>;
  updateOrder(directoryId: string, order: number, userId: string): Promise<Directory>;
  updateDescription(directoryId: string, description: string, userId: string): Promise<Directory>;
  updateIsPublic(directoryId: string, isPublic: boolean, userId: string): Promise<Directory>;
  increaseDirectory(min: number, max: number, userId: string): Promise<UpdateWriteOpResult>;
  decreaseDirectory(min: number, max: number, userId: string): Promise<UpdateWriteOpResult>;
  updateEmoji(directoryId: string, emojiId: string): Promise<Directory>;
}
