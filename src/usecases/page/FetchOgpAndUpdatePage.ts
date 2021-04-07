import { Page } from '../../domains/Page';
import { IPageRepository } from '../../repositories/IPageRepository';
import { PageService } from '../../services/PageService';

export class FetchOgpAndUpdatePage {
  private pageRepository: IPageRepository;
  private pageService: PageService;

  constructor(pageRepository: IPageRepository, pageService: PageService) {
    this.pageRepository = pageRepository;
    this.pageService = pageService;
  }

  async execute(url: string, pageId: string): Promise<Page> {
    const page = await this.pageService.retrieveDataByUrl(url);
    return this.pageRepository.updatePageById(pageId, page);
  }
}
