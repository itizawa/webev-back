/* eslint-disable @typescript-eslint/no-unused-vars */
import { UpdateWriteOpResult } from 'mongoose';
import { Page, PageStatus } from '../../domains/Page';
import { PaginationQuery, PaginationOptions } from '../../interfaces/pagination';
import { IPageRepository } from '../../repositories/IPageRepository';

export class PageRepositoryMock implements IPageRepository {
  createPage({ page }: { page: Partial<Page> }): Promise<Page> {
    throw new Error('Method not implemented.');
  }
  findPageById({ pageId, userId }: { pageId: string; userId: string }): Promise<Page> {
    throw new Error('Method not implemented.');
  }
  findPageList({ query, options }: { query: PaginationQuery; options: PaginationOptions }): Promise<Page> {
    throw new Error('Method not implemented.');
  }
  findPageListByDirectoryId({ directoryId, userId }: { directoryId: string; userId: string }): Promise<Page[]> {
    throw new Error('Method not implemented.');
  }
  findByDirectoryIdAndDeleteDirectoryId({ directoryIds, userId }: { directoryIds: string[]; userId: string }): Promise<UpdateWriteOpResult> {
    throw new Error('Method not implemented.');
  }
  updatePageById({ pageId, page }: { pageId: string; page: Partial<Page> }): Promise<Page> {
    throw new Error('Method not implemented.');
  }
  updateDirectory({ pageId, directoryId, userId }: { pageId: string; directoryId: string; userId: string }): Promise<Page> {
    throw new Error('Method not implemented.');
  }
  updatePageStatus({ pageId, userId, status, archivedAt }: { pageId: string; userId: string; status: PageStatus; archivedAt?: Date }): Promise<Page> {
    throw new Error('Method not implemented.');
  }
  countAllPages(): Promise<number> {
    throw new Error('Method not implemented.');
  }
}
