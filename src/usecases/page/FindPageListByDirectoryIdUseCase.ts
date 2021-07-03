import { Page } from '../../domains/Page';
import { IPageRepository } from '../../repositories/IPageRepository';

export class FindPageListByDirectoryIdUseCase {
  constructor(private readonly pageRepository: IPageRepository) {}

  execute({ directoryId, userId }: { directoryId: string; userId: string }): Promise<Page[]> {
    return this.pageRepository.findPageListByDirectoryId({ directoryId, userId });
  }
}
