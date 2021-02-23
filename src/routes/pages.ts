import { Router, Response } from 'express';
import { body, param, query } from 'express-validator';
import { apiValidatorMiddleware } from '../middlewares/api-validator';
import { loginRequired } from '../middlewares/login-required';
import { accessTokenParser } from '../middlewares/access-token-parser';
import { PageModel } from '../models/page';
import { WebevApp } from '../services/WebevApp';
import { WebevRequest } from '../interfaces/webev-request';

const router = Router();

const validator = {
  postPage: [body('url').isURL({ require_protocol: true })],
  getPageList: [
    query('status').isString(),
    query('page')
      .if((value) => value != null)
      .isInt(),
    query('limit')
      .if((value) => value != null)
      .isInt(),
  ],
  getPage: [param('id').isMongoId()],
  putPageFavorite: [param('id').isMongoId(), body('isFavorite').isBoolean()],
  deletePage: [param('id').isMongoId()],
};

export const pages = (webevApp: WebevApp): Router => {
  router.post('/', accessTokenParser, loginRequired, validator.postPage, apiValidatorMiddleware, async (req: WebevRequest, res: Response) => {
    const { user } = req;
    const { url } = req.body;

    let pageId;
    try {
      const result = await webevApp.PageService.savePage({ url, title: '取得中...' }, user);
      pageId = result._id;
      res.status(200).json(result);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }

    try {
      const page = await webevApp.PageService.retrieveDataByUrl(url);
      await webevApp.PageService.updatePageById(pageId, page);
      webevApp.io.emit('update-page');
    } catch (err) {
      console.log(err);
    }
  });

  router.get('/list', accessTokenParser, loginRequired, validator.getPageList, apiValidatorMiddleware, async (req: WebevRequest, res: Response) => {
    const { user } = req;
    const { status } = req.query;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    try {
      const pages = await PageModel.paginate(
        { createdUser: user.id, status },
        {
          page,
          limit,
          sort: { createdAt: -1 },
        },
      );

      return res.status(200).json(pages);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  });

  router.get('/:id', accessTokenParser, loginRequired, validator.getPage, apiValidatorMiddleware, async (req: WebevRequest, res: Response) => {
    const { id } = req.params;
    const { user } = req;

    try {
      const page = await PageModel.findOne({ _id: id, createdUser: user._id });

      return res.status(200).json(page);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  });

  router.put('/:id/favorite', accessTokenParser, loginRequired, validator.putPageFavorite, apiValidatorMiddleware, async (req: WebevRequest, res: Response) => {
    const { id } = req.params;
    const { isFavorite } = req.body;
    const { user } = req;

    try {
      const page = await webevApp.PageService.updatePageFavorite(id, user, isFavorite);

      return res.status(200).json(page);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  });

  router.delete('/:id', accessTokenParser, loginRequired, validator.deletePage, apiValidatorMiddleware, async (req: WebevRequest, res: Response) => {
    const { id } = req.params;
    const { user } = req;

    try {
      const page = await webevApp.PageService.deletePage(id, user);

      return res.status(200).json(page);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  });

  return router;
};
