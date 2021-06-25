import { Page, PageStatus } from '../../domains/Page';
import { IPageRepository } from '../../repositories/IPageRepository';

export class DeletePageUseCase {
  private pageRepository: IPageRepository;

  constructor(pageRepository: IPageRepository) {
    this.pageRepository = pageRepository;
  }

  execute({ pageId, userId }: { pageId: string; userId: string }): Promise<Page> {
    return this.pageRepository.updatePageStatus({ pageId, userId, status: PageStatus.PAGE_STATUS_DELETED });
  }
}
