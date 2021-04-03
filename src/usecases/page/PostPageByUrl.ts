import { Page } from '../../domains/Page';
import { IPageRepository } from '../../repositories/IPageRepository';

export class PostPageByUrl {
  private pageRepository: IPageRepository;

  constructor(pageRepository: IPageRepository) {
    this.pageRepository = pageRepository;
  }

  execute(url: string): Promise<Page> {
    return this.pageRepository.createPage({ url, title: 'loading...' });
  }
}
