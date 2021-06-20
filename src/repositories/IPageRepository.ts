import { UpdateWriteOpResult } from 'mongoose';
import { Page, PageStatus } from '../domains/Page';
import { PaginationQuery, PaginationOptions } from '../interfaces/pagination';

export interface IPageRepository {
  createPage({ page }: { page: Partial<Page> }): Promise<Page>;
  findPageById(id: string, userId: string): Promise<Page>;
  findPageList(query: PaginationQuery, options: PaginationOptions): Promise<Page>;
  findPageListByDirectoryId(directoryId: string, userId: string): Promise<Page[]>;
  findByDirectoryIdAndDeleteDirectoryId(directoryIds: string[], userId: string): Promise<UpdateWriteOpResult>;
  updatePageById(id: string, page: Partial<Page>): Promise<Page>;
  updateDirectory(pageId: string, directoryId: string, userId: string): Promise<Page>;
  updatePageStatus({ pageId, userId, status, archivedAt }: { pageId: string; userId: string; status: PageStatus; archivedAt?: Date }): Promise<Page>;
  countAllPages(): Promise<number>;
}
