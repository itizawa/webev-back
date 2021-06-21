/* eslint-disable @typescript-eslint/no-unused-vars */
import { UpdateWriteOpResult } from 'mongoose';
import { Page } from '../../domains/Page';
import { Directory } from '../../domains/Directory';
import { PaginationDirectoryQuery, PaginationOptions } from '../../interfaces/pagination';
import { IDirectoryRepository } from '../../repositories/IDirectoryRepository';

export class DirectoryRepositoryMock implements IDirectoryRepository {
  createPage(page: Partial<Page>): Promise<Page> {
    throw new Error('Method not implemented.');
  }
  createDirectory({ directory }: { directory: Partial<Directory> }): Promise<Directory> {
    throw new Error('Method not implemented.');
  }
  countDirectoryByUserId({ userId }: { userId: string }): Promise<number> {
    throw new Error('Method not implemented.');
  }
  isExistDirectoryByName({ name, userId }: { name: string; userId: string }): Promise<boolean> {
    throw new Error('Method not implemented.');
  }
  deleteDirectory({ directoryId, userId }: { directoryId: string; userId: string }): Promise<Directory> {
    throw new Error('Method not implemented.');
  }
  deleteDirectories({ directoryIds, userId }: { directoryIds: string[]; userId: string }): Promise<number> {
    throw new Error('Method not implemented.');
  }
  findDirectory({ directoryId, userId }: { directoryId: string; userId: string }): Promise<Directory> {
    throw new Error('Method not implemented.');
  }
  findAllDirectories({ userId }: { userId: string }): Promise<Partial<Directory>[]> {
    throw new Error('Method not implemented.');
  }
  findDirectoryList({ query, options }: { query: PaginationDirectoryQuery; options: PaginationOptions }): Promise<Directory> {
    throw new Error('Method not implemented.');
  }
  renameDirectory({ directoryId, name, userId }: { directoryId: string; name: string; userId: string }): Promise<Directory> {
    throw new Error('Method not implemented.');
  }
  updateOrder({ directoryId, order, userId }: { directoryId: string; order: number; userId: string }): Promise<Directory> {
    throw new Error('Method not implemented.');
  }
  updateDescription({ directoryId, description, userId }: { directoryId: string; description: string; userId: string }): Promise<Directory> {
    throw new Error('Method not implemented.');
  }
  updateIsPublic({ directoryId, isPublic, userId }: { directoryId: string; isPublic: boolean; userId: string }): Promise<Directory> {
    throw new Error('Method not implemented.');
  }
  increaseDirectory(min: number, max: number, userId: string): Promise<UpdateWriteOpResult> {
    throw new Error('Method not implemented.');
  }
  decreaseDirectory(min: number, max: number, userId: string): Promise<UpdateWriteOpResult> {
    throw new Error('Method not implemented.');
  }
  updateEmoji(directoryId: string, emojiId: string): Promise<Directory> {
    throw new Error('Method not implemented.');
  }
}
