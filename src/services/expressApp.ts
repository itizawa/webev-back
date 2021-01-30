import * as express from 'express';
import * as cors from 'cors';
import * as bodyparser from 'body-parser';
import * as mongoose from 'mongoose';

import { requestLoggerMiddleware } from '../middlewares/request-logger';

export class ExpressApp {

  app: any;

  constructor(){
    this.app = null;


    this.setupExpress()
    this.setupDB()
  }

  setupExpress(){
    this.app = express()

    this.app.use(cors());
    this.app.use(bodyparser.json());

    this.app.use(requestLoggerMiddleware);

    const PORT = 8000

    this.app.listen(PORT, () => {
      console.log(`Express app listening at http://localhost:${PORT}`)
    })
  }

  setupDB(){
    const MONGO_URI = 'mongodb://localhost:27017/todo';
    return mongoose.connect(MONGO_URI, { useNewUrlParser: true, useFindAndModify: false,useUnifiedTopology:true});
  }
    
}