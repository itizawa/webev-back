import { Page } from '../../domains/Page';
import { IPageRepository } from '../../repositories/IPageRepository';
import { CheerioService } from '../../services/CheerioService';

export class FetchOgpAndUpdatePageUseCase {
  constructor(private readonly pageRepository: IPageRepository, private readonly cheerioService: CheerioService) {}

  async execute({ url, pageId }: { url: string; pageId: string }): Promise<Page> {
    const page = await this.cheerioService.retrieveDataByUrl({ url });
    return this.pageRepository.updatePageById({ pageId, page });
  }
}
