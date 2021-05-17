/* eslint-disable @typescript-eslint/no-unused-vars */
import { UpdateWriteOpResult } from 'mongoose';
import { Page, PageStatus } from '../../domains/Page';
import { PaginationQuery, PaginationOptions } from '../../interfaces/pagination';
import { IPageRepository } from '../../repositories/IPageRepository';

export class PageRepositoryMock implements IPageRepository {
  createPage(page: Partial<Page>): Promise<Page> {
    throw 'not implement';
  }
  findPageById(id: string, userId: string): Promise<Page> {
    throw new Error('Method not implemented.');
  }
  findPageList(query: PaginationQuery, options: PaginationOptions): Promise<Page> {
    throw new Error('Method not implemented.');
  }
  findPageListByDirectoryId(directoryId: string, userId: string): Promise<Page[]> {
    throw new Error('Method not implemented.');
  }
  findByDirectoryIdAndDeleteDirectoryId(directoryIds: string[], userId: string): Promise<UpdateWriteOpResult> {
    throw new Error('Method not implemented.');
  }
  updatePageById(id: string, page: Partial<Page>): Promise<Page> {
    throw new Error('Method not implemented.');
  }
  updateDirectory(pageId: string, directoryId: string, userId: string): Promise<Page> {
    throw 'not implement';
  }
  updatePageStatus(id: string, userId: string, status: PageStatus): Promise<Page> {
    throw 'not implement';
  }
  countAllPages(): Promise<number> {
    throw 'not implement';
  }
}
