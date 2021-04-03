import { Configuration, Inject, PlatformApplication } from '@tsed/common';
import * as bodyParser from 'body-parser';
import * as compress from 'compression';
import * as cookieParser from 'cookie-parser';
import * as methodOverride from 'method-override';
import { PageController } from './controllers/PageController';
const rootDir = __dirname;

@Configuration({
  rootDir,
  acceptMimes: ['application/json'],
  mount: {
    '/api': [PageController],
  },
  swagger: [
    {
      path: '/v1/docs',
      specVersion: '2.0',
    },
  ],
  mongoose: [
    {
      id: 'default',
      url: process.env.MONGO_URI,
      connectionOptions: {},
    },
  ],
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
