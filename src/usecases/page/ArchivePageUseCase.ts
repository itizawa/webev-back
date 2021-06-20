import { Page, PageStatus } from '../../domains/Page';
import { IPageRepository } from '../../repositories/IPageRepository';

export class ArchivePageUseCase {
  private pageRepository: IPageRepository;

  constructor(pageRepository: IPageRepository) {
    this.pageRepository = pageRepository;
  }

  execute({ pageId, userId, isArchive }: { pageId: string; userId: string; isArchive: boolean }): Promise<Page> {
    const status = isArchive ? PageStatus.PAGE_STATUS_ARCHIVE : PageStatus.PAGE_STATUS_STOCK;
    const archivedAt = isArchive ? new Date() : null;
    return this.pageRepository.updatePageStatus(pageId, userId, status, archivedAt);
  }
}
