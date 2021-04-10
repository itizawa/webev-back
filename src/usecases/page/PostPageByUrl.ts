import { Page } from '../../domains/Page';
import { User } from '../../domains/User';
import { IPageRepository } from '../../repositories/IPageRepository';

export class PostPageByUrl {
  private pageRepository: IPageRepository;

  constructor(pageRepository: IPageRepository) {
    this.pageRepository = pageRepository;
  }

  execute(url: string, user: User): Promise<Page> {
    return this.pageRepository.createPage({ url, title: 'loading...', createdUser: user._id });
  }
}
