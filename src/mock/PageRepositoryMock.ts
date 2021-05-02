import { UpdateWriteOpResult } from 'mongoose';
import { Page, PageStatus } from '../domains/Page';
import { PaginationQuery, PaginationOptions } from '../interfaces/pagination';
import { IPageRepository } from '../repositories/IPageRepository';

export class PageRepositoryMock implements IPageRepository {
  createPage(page: Partial<Page>): Promise<Page> {
    throw 'not implement';
  }
  findPageById(id: string, userId: string): Promise<Page> {
    throw 'not implement';
  }
  findPageList(query: PaginationQuery, options: PaginationOptions): Promise<Page> {
    throw 'not implement';
  }
  findPageListByDirectoryId(directoryId: string, userId: string): Promise<Page[]> {
    throw 'not implement';
  }
  findByDirectoryIdAndDeleteDirectoryId(directoryId: string, userId: string): Promise<UpdateWriteOpResult> {
    throw 'not implement';
  }
  updatePageById(id: string, page: Partial<Page>): Promise<Page> {
    throw 'not implement';
  }
  updateDirectory(pageId: string, directoryId: string, userId: string): Promise<Page> {
    throw 'not implement';
  }
  updatePageStatus(id: string, userId: string, status: PageStatus): Promise<Page> {
    throw 'not implement';
  }
  updateIsFavorite(id: string, userId: string, isFavorite: boolean): Promise<Page> {
    throw 'not implement';
  }
  countAllPages(): Promise<number> {
    throw 'not implement';
  }
}
