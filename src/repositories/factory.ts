import { ArticleRepository, DirectoryRepository, DirectoryTreeRepository, InquiryRepository, PageRepository, SessionRepository, UserRepository } from '../infrastructure';

import { IArticleRepository } from './IArticleRepository';
import { IDirectoryRepository } from './IDirectoryRepository';
import { IDirectoryTreeRepository } from './IDirectoryTreeRepository';
import { IInquiryRepository } from './IInquiryRepository';
import { IPageRepository } from './IPageRepository';
import { ISessionRepository } from './ISessionRepository';
import { IUserRepository } from './IUserRepository';

export const factory = {
  articleRepository: (): IArticleRepository => {
    return new ArticleRepository();
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
