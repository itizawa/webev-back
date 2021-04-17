import { Page } from '../../domains/Page';
import { IPageRepository } from '../../repositories/IPageRepository';

export class FindPageListByDirectoryId {
  private pageRepository: IPageRepository;

  constructor(pageRepository: IPageRepository) {
    this.pageRepository = pageRepository;
  }

  execute(directoryId: string, userId: string): Promise<Page[]> {
    return this.pageRepository.findPageListByDirectoryId(directoryId, userId);
  }
}
