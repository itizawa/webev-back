/* eslint-disable @typescript-eslint/no-unused-vars */
import { UpdateWriteOpResult } from 'mongoose';
import { Page } from '../../domains/Page';
import { Directory } from '../../domains/Directory';
import { PaginationDirectoryQuery, PaginationOptions } from '../../interfaces/pagination';
import { IDirectoryRepository } from '../../repositories/IDirectoryRepository';

export class DirectoryRepositoryMock implements IDirectoryRepository {
  createPage(page: Partial<Page>): Promise<Page> {
    throw 'not implement';
  }
  createDirectory(directory: Partial<Directory>): Promise<Directory> {
    throw 'not implement';
  }
  countDirectoryByUserId(userId: string): Promise<number> {
    throw 'not implement';
  }
  isExistDirectoryByName(name: string, userId: string): Promise<boolean> {
    throw 'not implement';
  }
  deleteDirectory(directoryId: string, userId: string): Promise<Directory> {
    throw 'not implement';
  }
  findDirectory(directoryId: string, userId: string): Promise<Directory> {
    throw 'not implement';
  }
  findDirectoryList(query: PaginationDirectoryQuery, options: PaginationOptions): Promise<Directory> {
    throw 'not implement';
  }
  renameDirectory(directoryId: string, name: string, userId: string): Promise<Directory> {
    throw 'not implement';
  }
  updateOrder(directoryId: string, order: number, userId: string): Promise<Directory> {
    throw 'not implement';
  }
  updateDescription(directoryId: string, description: string, userId: string): Promise<Directory> {
    throw 'not implement';
  }
  increaseDirectory(min: number, max: number, userId: string): Promise<UpdateWriteOpResult> {
    throw 'not implement';
  }
  decreaseDirectory(min: number, max: number, userId: string): Promise<UpdateWriteOpResult> {
    throw 'not implement';
  }
}
