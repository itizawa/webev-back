import { Configuration, Inject, PlatformApplication } from '@tsed/common';
import * as express from 'express';
import * as cookieParser from 'cookie-parser';
import { mongooseConfig } from './config/mongoose';
import { IndexCtrl } from './controllers/IndexController';

const rootDir = __dirname;

@Configuration({
  rootDir,
  acceptMimes: ['application/json'],
  port: parseInt(process.env.PORT) || 8000,
  mount: {
    '/api/v1': `${rootDir}/controllers/**/*.ts`,
    '/': [IndexCtrl],
  },
  swagger: [
    {
      path: '/v1/docs',
      specVersion: '2.0',
    },
  ],
  views: {
    root: `${rootDir}/views`,
    viewEngine: 'ejs',
  },
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
    this.app.use(cookieParser(), express.json());
  }
}
