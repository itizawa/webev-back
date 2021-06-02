import { Controller, Get } from '@tsed/common';

@Controller('/pages')
export class PageController {
  @Get('/')
  get(): string {
    return 'hello';
  }
}
