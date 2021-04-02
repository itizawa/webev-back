import { Controller, Get } from '@tsed/common';

@Controller('/pages')
export class PageController {
  @Get()
  findAll(): string {
    return 'This action returns all calendars';
  }
}
