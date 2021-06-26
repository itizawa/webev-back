import { Page } from '../../domains/Page';
import { IPageRepository } from '../../repositories/IPageRepository';

export class FindPageListByDirectoryIdUseCase {
  private pageRepository: IPageRepository;

  constructor(pageRepository: IPageRepository) {
    this.pageRepository = pageRepository;
  }

  execute({ directoryId, userId }: { directoryId: string; userId: string }): Promise<Page[]> {
    return this.pageRepository.findPageListByDirectoryId({ directoryId, userId });
  }
}
