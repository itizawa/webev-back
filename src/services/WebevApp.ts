import * as express from 'express';
import * as cors from 'cors';
import * as bodyparser from 'body-parser';
import * as mongoose from 'mongoose';

import { requestLoggerMiddleware } from '../middlewares/request-logger';
import { setupExpressRoutes } from '../routes';
import { PageService } from './PageService';

export class WebevApp {
  app: express.Express;
  port: number;

  PageService: PageService;

  constructor() {
    this.app = null;
    this.port = parseInt(process.env.PORT) || 8000;
  }

  async init(): Promise<void> {
    await this.setupExpress();
    await this.setupDB();

    this.setupPageService();

    // setup Express Routes
    await this.setupRoutes();
  }

  setupExpress(): void {
    this.app = express();

    this.app.use(cors());
    this.app.use(bodyparser.json());

    this.app.use(requestLoggerMiddleware);

    this.app.listen(this.port, () => {
      console.log(`Express app listening at http://localhost:${this.port}`);
    });
  }

  setupDB(): Promise<typeof import('mongoose')> {
    const MONGO_URI = 'mongodb://localhost:27017/todo';
    return mongoose.connect(MONGO_URI, { useNewUrlParser: true, useFindAndModify: false, useUnifiedTopology: true });
  }

  setupRoutes(): void {
    setupExpressRoutes(this, this.app);
  }

  setupPageService(): void {
    if (this.PageService == null) {
      this.PageService = new PageService(this);
    }
  }
}
