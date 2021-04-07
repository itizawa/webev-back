import { Page, PageStatus } from '../../domains/Page';
import { User } from '../../domains/User';
import { IPageRepository } from '../../repositories/IPageRepository';

export class UpdatePageArchiveStatus {
  private pageRepository: IPageRepository;

  constructor(pageRepository: IPageRepository) {
    this.pageRepository = pageRepository;
  }

  execute(pageId: string, user: User, isArchive: boolean): Promise<Page> {
    const status = isArchive ? PageStatus.PAGE_STATUS_ARCHIVE : PageStatus.PAGE_STATUS_STOCK;
    return this.pageRepository.updatePageStatus(pageId, user._id, status);
  }
}
