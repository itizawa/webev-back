import { DirectoryRepository, DirectoryTreeRepository, InquiryRepository, PageRepository, SessionRepository, UserRepository } from '../infrastructure';

import { IDirectoryRepository } from './IDirectoryRepository';
import { IDirectoryTreeRepository } from './IDirectoryTreeRepository';
import { IInquiryRepository } from './IInquiryRepository';
import { IPageRepository } from './IPageRepository';
import { ISessionRepository } from './ISessionRepository';
import { IUserRepository } from './IUserRepository';

export const factory = {
  DirectoryRepository: (): IDirectoryRepository => {
    return new DirectoryRepository();
  },
  DirectoryTreeRepository: (): IDirectoryTreeRepository => {
    return new DirectoryTreeRepository();
  },
  InquiryRepository: (): IInquiryRepository => {
    return new InquiryRepository();
  },
  pageRepository: (): IPageRepository => {
    return new PageRepository();
  },
  SessionRepository: (): ISessionRepository => {
    return new SessionRepository();
  },
  UserRepository: (): IUserRepository => {
    return new UserRepository();
  },
};
