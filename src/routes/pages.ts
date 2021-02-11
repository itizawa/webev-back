import { Router, Response } from 'express';
import { body, param } from 'express-validator';
import { apiValidatorMiddleware } from '../middlewares/api-validator';
import { accessTokenParser } from '../middlewares/access-token-parser';
import { PageModel } from '../models/page';
import { WebevApp } from '../services/WebevApp';
import { WebevRequest } from '../interfaces/webev-request';

const router = Router();

const validator = {
  postPage: [body('url').isURL({ require_protocol: true })],
  getPage: [param('id').isMongoId()],
};

export const pages = (webevApp: WebevApp): Router => {
  router.post('/', validator.postPage, apiValidatorMiddleware, async (req: WebevRequest, res: Response) => {
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

  router.get('/list', accessTokenParser, async (req: WebevRequest, res: Response) => {
    try {
      const pages = await PageModel.find();
      return res.status(200).json(pages);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  });

  router.get('/:id', validator.getPage, apiValidatorMiddleware, async (req: WebevRequest, res: Response) => {
    const { id } = req.params;

    try {
      const page = await PageModel.findById(id);
      return res.status(200).json(page);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  });

  return router;
};
