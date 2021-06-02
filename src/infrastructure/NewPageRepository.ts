/* eslint-disable @typescript-eslint/no-unused-vars */
import { Inject, Injectable } from '@tsed/common';
import { Default, Enum, Required } from '@tsed/schema';
import { Indexed, ObjectID, MongooseModel } from '@tsed/mongoose';
import { UpdateWriteOpResult } from 'mongoose';
import { PaginationQuery, PaginationOptions } from '../interfaces/pagination';
import { PageStatus, Page } from '../domains/Page';
import { IPageRepository } from '../repositories/IPageRepository';

export class PageModel {
  @ObjectID('id')
  _id: string;

  url: string;

  image: string;

  @Indexed()
  description: string;

  @Indexed()
  title: string;

  @Indexed()
  siteName: string;

  @Enum(PageStatus)
  @Required()
  status: PageStatus;

  // @ObjectID('directoryId')
  // @Default(null)
  // directoryId?: string;

  // @ObjectID('createdUser')
  // @Required(null)
  // createdUser?: string;

  @Default(null)
  archivedAt: Date;
}

@Injectable()
export class PageRepository implements IPageRepository {
  @Inject(PageModel)
  private model: MongooseModel<Page>;

  async createPage(page: Partial<Page>): Promise<Page> {
    return this.model.create(page);
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
    throw new Error('Method not implemented.');
  }
  updatePageStatus(id: string, userId: string, status: PageStatus, archivedAt?: Date): Promise<Page> {
    throw new Error('Method not implemented.');
  }
  countAllPages(): Promise<number> {
    throw new Error('Method not implemented.');
  }
}
