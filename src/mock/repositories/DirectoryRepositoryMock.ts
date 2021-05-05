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
  createDirectory(directory: Partial<Directory>): Promise<Directory> {
    throw new Error('Method not implemented.');
  }
  countDirectoryByUserId(userId: string): Promise<number> {
    throw new Error('Method not implemented.');
  }
  isExistDirectoryByName(name: string, userId: string): Promise<boolean> {
    throw new Error('Method not implemented.');
  }
  deleteDirectory(directoryId: string, userId: string): Promise<Directory> {
    throw new Error('Method not implemented.');
  }
  deleteDirectories(directoryIds: string[], userId: string): Promise<number> {
    throw new Error('Method not implemented.');
  }
  findDirectory(directoryId: string, userId: string): Promise<Directory> {
    throw new Error('Method not implemented.');
  }
  findDirectoryList(query: PaginationDirectoryQuery, options: PaginationOptions): Promise<Directory> {
    throw new Error('Method not implemented.');
  }
  renameDirectory(directoryId: string, name: string, userId: string): Promise<Directory> {
    throw new Error('Method not implemented.');
  }
  updateOrder(directoryId: string, order: number, userId: string): Promise<Directory> {
    throw new Error('Method not implemented.');
  }
  updateDescription(directoryId: string, description: string, userId: string): Promise<Directory> {
    throw new Error('Method not implemented.');
  }
  increaseDirectory(min: number, max: number, userId: string): Promise<UpdateWriteOpResult> {
    throw new Error('Method not implemented.');
  }
  decreaseDirectory(min: number, max: number, userId: string): Promise<UpdateWriteOpResult> {
    throw new Error('Method not implemented.');
  }
}
