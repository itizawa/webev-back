import { Page } from '../../domains/Page';
import { IPageRepository } from '../../repositories/IPageRepository';

export class MovePageToDirectoryUseCase {
  constructor(private readonly pageRepository: IPageRepository) {}

  execute({ pageId, directoryId, userId }: { pageId: string; directoryId: string; userId: string }): Promise<Page> {
    return this.pageRepository.updateDirectory({ pageId, directoryId, userId });
  }
}
