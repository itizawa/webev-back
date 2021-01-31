import * as express from 'express';
import { WebevApp } from '../services/WebevApp';

const router = express.Router();

export const pages = (webevApp: WebevApp): express.Router => {
  router.get('/', async (req: express.Request, res: express.Response) => {
    webevApp.PageService.hoge();
    return res.status(200).json({ huga: 'huga' });
  });

  return router;
};
