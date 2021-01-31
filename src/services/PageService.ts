import { WebevApp } from './WebevApp';

export class PageService {
  webevApp: WebevApp;

  constructor(WebevApp: WebevApp) {
    this.webevApp = WebevApp;
  }

  hoge(): void {
    console.log('huga');
  }
}
