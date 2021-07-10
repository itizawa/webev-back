import { Page } from '../../domains/Page';
import { User } from '../../domains/User';
import { IPageRepository } from '../../repositories/IPageRepository';

export class PostPageByUrlUseCase {
  constructor(private readonly pageRepository: IPageRepository) {}

  execute({ url, directoryId, user }: { url: string; directoryId?: string; user: User }): Promise<Page> {
    const page = new Page({ url, title: 'loading...', directoryId, createdUser: user._id });

    return this.pageRepository.createPage({ page });
  }
}
