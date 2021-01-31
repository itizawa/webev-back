export class PageService {
  webevApp: any;

  constructor(WebevApp: any) {
    this.webevApp = WebevApp;
  }

  hoge(): void {
    console.log('huga');
  }
}
