import * as express from 'express';
import { WebevApp } from '../services/WebevApp';

const router = express.Router();

export const pages = (webevApp: WebevApp): express.Router => {
  router.post('/', async (req: express.Request, res: express.Response) => {
    const { url } = req.body;

    const page = await webevApp.PageService.retrieveDataByUrl(url);
    const result = await webevApp.PageService.savePage(page);

    return res.status(200).json(result);
  });

  return router;
};
