import { IPageRepository } from '../../repositories/IPageRepository';

export class CountAllPages {
  private pageRepository: IPageRepository;

  constructor(pageRepository: IPageRepository) {
    this.pageRepository = pageRepository;
  }

  execute(): Promise<number> {
    return this.pageRepository.countAllPages();
  }
}
