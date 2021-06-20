import { Page } from '../../domains/Page';
import { IPageRepository } from '../../repositories/IPageRepository';

export class FindPageByIdUseCase {
  private pageRepository: IPageRepository;

  constructor(pageRepository: IPageRepository) {
    this.pageRepository = pageRepository;
  }

  execute({ pageId, userId }: { pageId: string; userId: string }): Promise<Page> {
    return this.pageRepository.findPageById({ pageId, userId });
  }
}
