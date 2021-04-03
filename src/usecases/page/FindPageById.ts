import { Page } from '../../domains/Page';
import { IPageRepository } from '../../repositories/IPageRepository';

export class FindPageById {
  private pageRepository: IPageRepository;

  constructor(pageRepository: IPageRepository) {
    this.pageRepository = pageRepository;
  }

  execute(id: string, userId: string): Promise<Page> {
    return this.pageRepository.findPageById(id, userId);
  }
}