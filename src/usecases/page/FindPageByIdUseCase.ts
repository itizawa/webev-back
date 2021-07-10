import { Page } from '../../domains/Page';
import { IPageRepository } from '../../repositories/IPageRepository';

export class FindPageByIdUseCase {
  constructor(private readonly pageRepository: IPageRepository) {}

  execute({ pageId, userId }: { pageId: string; userId: string }): Promise<Page> {
    return this.pageRepository.findPageById({ pageId, userId });
  }
}
