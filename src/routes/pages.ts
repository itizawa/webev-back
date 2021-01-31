import * as express from 'express';
import { WebevApp } from '../services/WebevApp';

const router = express.Router();

export const pages = (webevApp: WebevApp): express.Router => {
  router.post('/', async (req: express.Request, res: express.Response) => {
    const { url } = req.body;
    console.log(url);
    webevApp.PageService.hoge();
    return res.status(200).json({ huga: 'huga' });
  });

  return router;
};
