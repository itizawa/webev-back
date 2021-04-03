import { Page } from '../../domains/Page';
import { IPageRepository } from '../../repositories/IPageRepository';

export class CreatePage {
  private pageRepository: IPageRepository;

  constructor(pageRepository: IPageRepository) {
    this.pageRepository = pageRepository;
  }

  execute(url: string, description: string): Promise<Page> {
    return this.pageRepository.create({ url, description });
  }
}
