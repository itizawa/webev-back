import * as express from 'express';
import { body, param } from 'express-validator';
import { apiValidatorMiddleware } from '../middlewares/api-validator';
import { PageModel } from '../models/page';
import { WebevApp } from '../services/WebevApp';

const router = express.Router();

const validator = {
  postPage: [body('url').isURL({ require_protocol: true })],
  getPage: [param('id').isMongoId()],
};

export const pages = (webevApp: WebevApp): express.Router => {
  router.post('/', validator.postPage, apiValidatorMiddleware, async (req: express.Request, res: express.Response) => {
    const { url } = req.body;

    try {
      const page = await webevApp.PageService.retrieveDataByUrl(url);
      const result = await webevApp.PageService.savePage(page);
      return res.status(200).json(result);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  });

  router.get('/list', async (req: express.Request, res: express.Response) => {
    try {
      const pages = await PageModel.find();
      return res.status(200).json(pages);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  });

  router.get('/:id', validator.getPage, apiValidatorMiddleware, async (req: express.Request, res: express.Response) => {
    const { id } = req.params;
    const page = await PageModel.findById(id).select('body');

    return res.status(200).json(page);
  });

  return router;
};
