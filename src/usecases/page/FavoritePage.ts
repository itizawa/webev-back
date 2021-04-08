import { Page } from '../../domains/Page';
import { User } from '../../domains/User';
import { IPageRepository } from '../../repositories/IPageRepository';

export class FavoritePage {
  private pageRepository: IPageRepository;

  constructor(pageRepository: IPageRepository) {
    this.pageRepository = pageRepository;
  }

  execute(pageId: string, user: User, isFavorite: boolean): Promise<Page> {
    return this.pageRepository.updateIsFavorite(pageId, user._id, isFavorite);
  }
}
