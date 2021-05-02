import { Page } from '../../domains/Page';
import { IPageRepository } from '../../repositories/IPageRepository';

export class MovePageToDirectoryUseCase {
  private pageRepository: IPageRepository;

  constructor(pageRepository: IPageRepository) {
    this.pageRepository = pageRepository;
  }

  execute(pageId: string, directoryId: string, userId: string): Promise<Page> {
    return this.pageRepository.updateDirectory(pageId, directoryId, userId);
  }
}
