import { Configuration, Inject, PlatformApplication } from '@tsed/common';
import * as bodyParser from 'body-parser';
import * as compress from 'compression';
import * as cookieParser from 'cookie-parser';
import * as methodOverride from 'method-override';

import '@tsed/swagger';

import { mongooseConfig } from '../config/mongoose.config';
import { PageController, IndexController } from './controllers';

const rootDir = __dirname;

@Configuration({
  rootDir,
  acceptMimes: ['application/json'],
  mount: {
    '/api': [PageController],
    '/': [IndexController],
  },
  swagger: [
    {
      path: '/v1/docs',
      specVersion: '2.0',
    },
  ],
  views: {
    root: `${rootDir}/../views`,
    viewEngine: 'ejs',
  },
  exclude: ['**/*.spec.ts'],
  mongoose: mongooseConfig,
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
    this.app
      .use(cookieParser())
      .use(compress({}))
      .use(methodOverride())
      .use(bodyParser.json())
      .use(
        bodyParser.urlencoded({
          extended: true,
        }),
      );
  }
}
