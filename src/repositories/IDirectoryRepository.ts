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
  findDirectoryList({ query, options }: { query: PaginationDirectoryQuery; options: PaginationOptions }): Promise<Directory>;
  renameDirectory({ directoryId, name, userId }: { directoryId: string; name: string; userId: string }): Promise<Directory>;
  updateOrder({ directoryId, order, userId }: { directoryId: string; order: number; userId: string }): Promise<Directory>;
  updateDescription({ directoryId, description, userId }: { directoryId: string; description: string; userId: string }): Promise<Directory>;
  updateIsPublic({ directoryId, isPublic, userId }: { directoryId: string; isPublic: boolean; userId: string }): Promise<Directory>;
  increaseDirectory({ min, max, userId }: { min: number; max: number; userId: string }): Promise<UpdateWriteOpResult>;
  decreaseDirectory({ min, max, userId }: { min: number; max: number; userId: string }): Promise<UpdateWriteOpResult>;
  updateEmoji({ directoryId, emojiId, userId }: { directoryId: string; emojiId: string; userId: string }): Promise<Directory>;
}
