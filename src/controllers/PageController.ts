import { Controller, Get, Post, PathParams } from '@tsed/common';
import { Page } from '../domains/Page';
import { PageRepository } from '../infrastructure/PageRepository';
import { CreatePage } from '../usecases/page/CreatePage';
@Controller('/pages')
export class PageController {
  private pageRepository: PageRepository;

  constructor() {
    this.pageRepository = new PageRepository();
  }

  @Get()
  findAll(): string {
    return 'This action returns all calendars';
  }

  @Post()
  async createPage(@PathParams('title') title: string, @PathParams('description') description: string): Promise<Page> {
    const useCase = new CreatePage(this.pageRepository);
    const result = await useCase.execute(title, description);
    return result;
  }
}
