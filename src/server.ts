import { Configuration, Inject, PlatformApplication } from '@tsed/common';
import * as cookieParser from 'cookie-parser';

const rootDir = __dirname;

@Configuration({
  rootDir,
  acceptMimes: ['application/json'],
  port: parseInt(process.env.PORT) || 8000,
})
export class Server {
  @Inject()
  app: PlatformApplication;

  @Configuration()
  settings: Configuration;

  /**
   * This method let you configure the express middleware required by your application to works.
   * @returns {Server}
   */
  public $beforeRoutesInit(): void | Promise<any> {
    this.app.use(cookieParser());
  }
}
