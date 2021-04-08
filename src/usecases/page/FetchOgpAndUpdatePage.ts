import { Page } from '../../domains/Page';
import { IPageRepository } from '../../repositories/IPageRepository';
import { CheerioService } from '../../services/CheerioService';

export class FetchOgpAndUpdatePage {
  private pageRepository: IPageRepository;
  private cheerioService: CheerioService;

  constructor(pageRepository: IPageRepository, cheerioService: CheerioService) {
    this.pageRepository = pageRepository;
    this.cheerioService = cheerioService;
  }

  async execute(url: string, pageId: string): Promise<Page> {
    const page = await this.cheerioService.retrieveDataByUrl(url);
    return this.pageRepository.updatePageById(pageId, page);
  }
}
