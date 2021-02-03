import * as express from 'express';
import { body, validationResult } from 'express-validator';
import { PageModel } from '../models/page';
import { WebevApp } from '../services/WebevApp';

const router = express.Router();

const validator = {
  postPage: [body('url').not().isString()],
};

export const pages = (webevApp: WebevApp): express.Router => {
  router.post('/', validator.postPage, async (req: express.Request, res: express.Response) => {
    const { url } = req.body;

    console.log(validationResult(req));

    const page = await webevApp.PageService.retrieveDataByUrl(url);
    const result = await webevApp.PageService.savePage(page);

    return res.status(200).json(result);
  });

  router.get('/list', async (req: express.Request, res: express.Response) => {
    const pages = await PageModel.find();

    return res.status(200).json(pages);
  });

  router.get('/:id', async (req: express.Request, res: express.Response) => {
    const { id } = req.params;
    const page = await PageModel.findById(id).select('body');

    return res.status(200).json(page);
  });

  return router;
};
