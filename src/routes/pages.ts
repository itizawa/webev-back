import { Router, Response } from 'express';
import { body, param, query } from 'express-validator';
import { apiValidatorMiddleware } from '../middlewares/api-validator';
import { loginRequired } from '../middlewares/login-required';
import { accessTokenParser } from '../middlewares/access-token-parser';
import { PageModel, PageQueryBuilder, PageStatus } from '../models/page';
import { WebevApp } from '../services/WebevApp';
import { WebevRequest } from '../interfaces/webev-request';

const router = Router();

const validator = {
  postPage: [body('url').isURL({ require_protocol: true })],
  getPageList: [
    query('status')
      .if((value) => value != null)
      .isString(),
  ],
  getPage: [param('id').isMongoId()],
  putPageFavorite: [param('id').isMongoId(), query('isFavorite').isBoolean()],
  deletePage: [param('id').isMongoId()],
};

export const pages = (webevApp: WebevApp): Router => {
  router.post('/', accessTokenParser, loginRequired, validator.postPage, apiValidatorMiddleware, async (req: WebevRequest, res: Response) => {
    const { user } = req;
    const { url } = req.body;

    try {
      const page = await webevApp.PageService.retrieveDataByUrl(url);
      const result = await webevApp.PageService.savePage(page, user);
      return res.status(200).json(result);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  });

  router.get('/list', accessTokenParser, loginRequired, validator.getPageList, apiValidatorMiddleware, async (req: WebevRequest, res: Response) => {
    const { user } = req;
    const { status } = req.query;

    try {
      const queryBuilder = new PageQueryBuilder(PageModel.find().sort('-createdAt'));
      queryBuilder.addConditionToListByCreatorId(user.id);

      if (status != null) {
        queryBuilder.addConditionToPageStatus(status as PageStatus);
      }

      const pages = await queryBuilder.query.exec();
      return res.status(200).json(pages);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  });

  router.get('/favorite-list', accessTokenParser, loginRequired, async (req: WebevRequest, res: Response) => {
    const { user } = req;

    try {
      const queryBuilder = new PageQueryBuilder(PageModel.find({ isFavorite: true }).sort('-createdAt'));
      queryBuilder.addConditionToListByCreatorId(user.id);
      queryBuilder.addConditionToExcludeDeleted();

      const pages = await queryBuilder.query.exec();
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
    const { isFavorite } = req.query;
    const { user } = req;

    try {
      const page = await webevApp.PageService.updatePageFavorite(id, user, JSON.parse(isFavorite as string));

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
