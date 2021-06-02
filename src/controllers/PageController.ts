import { BodyParams, Controller, Get, Post } from '@tsed/common';
import { User } from '../domains/User';
import { Page } from '../domains/Page';
import { PageRepository } from '../infrastructure/PageRepository';
import { PostPageByUrlUseCase } from '../usecases/page/PostPageByUrlUseCase';

@Controller('/pages')
export class PageController {
  @Get('/')
  get(): string {
    return 'hello';
  }

  @Post('/')
  async post(@BodyParams('url') url: string, @BodyParams('directoryId') directoryId: string, @BodyParams('user') user: User): Promise<Page> {
    const pageRepository = new PageRepository();
    console.log(url, directoryId, user, pageRepository);

    const useCase = new PostPageByUrlUseCase(pageRepository);
    const result = await useCase.execute({ url, directoryId, user });
    // const pageId = result._id;
    return result;
  }
}
