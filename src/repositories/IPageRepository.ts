import { UpdateWriteOpResult } from 'mongoose';
import { Page, PageStatus } from '../domains/Page';
import { PaginationQuery, PaginationOptions } from '../interfaces/pagination';
import { PageRepository } from '../infrastructure/PageRepository';

export interface IPageRepository {
  createPage({ page }: { page: Partial<Page> }): Promise<Page>;
  findPageById({ pageId, userId }: { pageId: string; userId: string }): Promise<Page>;
  findPageList({ query, options }: { query: PaginationQuery; options: PaginationOptions }): Promise<Page>;
  findPageListByDirectoryId({ directoryId, userId }: { directoryId: string; userId: string }): Promise<Page[]>;
  findByDirectoryIdAndDeleteDirectoryId({ directoryIds, userId }: { directoryIds: string[]; userId: string }): Promise<UpdateWriteOpResult>;
  updatePageById({ pageId, page }: { pageId: string; page: Partial<Page> }): Promise<Page>;
  updateDirectory({ pageId, directoryId, userId }: { pageId: string; directoryId: string; userId: string }): Promise<Page>;
  updatePageStatus({ pageId, userId, status, archivedAt }: { pageId: string; userId: string; status: PageStatus; archivedAt?: Date }): Promise<Page>;
  countAllPages(): Promise<number>;
}

export const factory = {
  pageRepository: (): IPageRepository => {
    return new PageRepository();
  },
};
