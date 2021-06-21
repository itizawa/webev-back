import { Page } from '../../domains/Page';
import { IPageRepository } from '../../repositories/IPageRepository';
import { CheerioService } from '../../services/CheerioService';

export class FetchOgpAndUpdatePageUseCase {
  private pageRepository: IPageRepository;
  private cheerioService: CheerioService;

  constructor(pageRepository: IPageRepository, cheerioService: CheerioService) {
    this.pageRepository = pageRepository;
    this.cheerioService = cheerioService;
  }

  async execute({ url, pageId }: { url: string; pageId: string }): Promise<Page> {
    const page = await this.cheerioService.retrieveDataByUrl({ url });
    return this.pageRepository.updatePageById({ pageId, page });
  }
}
