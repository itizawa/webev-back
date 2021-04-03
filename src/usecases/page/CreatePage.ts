import { Page } from '../../domains/Page';
import { IPageRepository } from '../../repositories/IPageRepository';

export class CreatePage {
  private pageRepository: IPageRepository;

  constructor(pageRepository: IPageRepository) {
    this.pageRepository = pageRepository;
  }

  execute(url: string, description: string): Promise<Page> {
    const page = new Page(url, description);
    return this.pageRepository.create(page);
  }
}
