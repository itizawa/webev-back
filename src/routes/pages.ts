import * as express from 'express';

const router = express.Router();

export const pages = (webevApp: any): express.Router => {
  router.get('/', async (req: express.Request, res: express.Response) => {
    webevApp.PageService.hoge();
    return res.status(200).json({ huga: 'huga' });
  });

  return router;
};
