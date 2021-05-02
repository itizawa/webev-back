import { Page, PageStatus } from '../../domains/Page';
import { User } from '../../domains/User';
import { IPageRepository } from '../../repositories/IPageRepository';

export class DeletePageUseCase {
  private pageRepository: IPageRepository;

  constructor(pageRepository: IPageRepository) {
    this.pageRepository = pageRepository;
  }

  execute(pageId: string, user: User): Promise<Page> {
    return this.pageRepository.updatePageStatus(pageId, user._id, PageStatus.PAGE_STATUS_DELETED);
  }
}
