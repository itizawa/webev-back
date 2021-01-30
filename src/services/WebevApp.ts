import * as express from 'express';
import * as cors from 'cors';
import * as bodyparser from 'body-parser';
import * as mongoose from 'mongoose';

import { requestLoggerMiddleware } from '../middlewares/request-logger';
import { setupExpressRoutes } from "../routes"

export class WebevApp {

  app: express.Express;
  port: number;

  constructor(){
    this.app = null;
    this.port = parseInt(process.env.PORT) || 8000;

  }
  
  async init() {
    
    await this.setupExpress();
    await this.setupDB()

    // setup Express Routes
    await this.setupRoutes();
  }

  setupExpress(){
    this.app = express()

    this.app.use(cors());
    this.app.use(bodyparser.json());

    this.app.use(requestLoggerMiddleware);

    this.app.listen(this.port, () => {
      console.log(`Express app listening at http://localhost:${this.port}`)
    })
  }

  setupDB(){
    const MONGO_URI = 'mongodb://localhost:27017/todo';
    return mongoose.connect(MONGO_URI, { useNewUrlParser: true, useFindAndModify: false,useUnifiedTopology:true});
  }

  setupRoutes(){
    setupExpressRoutes(this, this.app);
  }
    
}