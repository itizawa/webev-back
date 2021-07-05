import { ScrapRepository, DirectoryRepository, DirectoryTreeRepository, InquiryRepository, PageRepository, SessionRepository, UserRepository } from '../infrastructure';

import { IScrapRepository } from './IScrapRepository';
import { IDirectoryRepository } from './IDirectoryRepository';
import { IDirectoryTreeRepository } from './IDirectoryTreeRepository';
import { IInquiryRepository } from './IInquiryRepository';
import { IPageRepository } from './IPageRepository';
import { ISessionRepository } from './ISessionRepository';
import { IUserRepository } from './IUserRepository';

export const factory = {
  scrapRepository: (): IScrapRepository => {
    return new ScrapRepository();
  },
  directoryRepository: (): IDirectoryRepository => {
    return new DirectoryRepository();
  },
  directoryTreeRepository: (): IDirectoryTreeRepository => {
    return new DirectoryTreeRepository();
  },
  inquiryRepository: (): IInquiryRepository => {
    return new InquiryRepository();
  },
  pageRepository: (): IPageRepository => {
    return new PageRepository();
  },
  sessionRepository: (): ISessionRepository => {
    return new SessionRepository();
  },
  userRepository: (): IUserRepository => {
    return new UserRepository();
  },
};
