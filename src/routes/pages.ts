import { Router, Response } from 'express';
import { body, param, query } from 'express-validator';
import { apiValidatorMiddleware } from '../middlewares/api-validator';
import { loginRequired } from '../middlewares/login-required';
import { accessTokenParser } from '../middlewares/access-token-parser';
import { PageModel } from '../models/page';
import { WebevApp } from '../services/WebevApp';
import { WebevRequest } from '../interfaces/webev-request';

import { PageRepository } from '../infrastructure/PageRepository';

import { FindPageById } from '../usecases/page/FindPageById';
import { PostPageByUrl } from '../usecases/page/PostPageByUrl';
import { ArchivePage } from '../usecases/page/ArchivePage';

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
    query('isFavorite')
      .if((value) => value != null)
      .isBoolean(),
    query('sort')
      .if((value) => value != null)
      .isString(),
  ],
  getPage: [param('id').isMongoId()],
  putPageFavorite: [param('id').isMongoId(), body('isFavorite').isBoolean()],
  putPageArchive: [param('id').isMongoId(), body('isArchive').isBoolean()],
  deletePage: [param('id').isMongoId()],
};

export const pages = (webevApp: WebevApp): Router => {
  /**
   * @swagger
   * /pages:
   *   post:
   *     description: create page by url
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: body
   *         in: body
   *         schema:
   *           type: object
   *           properties:
   *             url:
   *               type: string
   *               example: example.com
   *     responses:
   *       200:
   *         description: Save and return temporary information
   *         examples:
   *           result:
   *              url: hogehoge.example.com
   *              title: loading...
   */
  router.post('/', accessTokenParser, loginRequired, validator.postPage, apiValidatorMiddleware, async (req: WebevRequest, res: Response) => {
    const { user } = req;
    const { url } = req.body;

    let pageId;
    try {
      const pageRepository = new PageRepository();
      const useCase = new PostPageByUrl(pageRepository);
      const result = await useCase.execute(url, user);
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

  type ListType = {
    query: {
      status: string;
      isFavorite?: boolean;
      sort?: string;
    };
  };

  /**
   * @swagger
   * /pages/list:
   *   get:
   *     description: get page list
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: status
   *         description: status for search
   *         in: query
   *         type: string
   *       - name: isFavorite
   *         description: isFavorite for search
   *         in: query
   *         type: boolean
   *       - name: sort
   *         description: sort for search
   *         in: query
   *         type: string
   *         example: -createdAt
   *     responses:
   *       200:
   *         description: Save and return temporary information
   *         examples:
   *           result:
   *              url: hogehoge.example.com
   *              title: loading...
   */
  router.get('/list', accessTokenParser, loginRequired, validator.getPageList, apiValidatorMiddleware, async (req: WebevRequest & ListType, res: Response) => {
    const { user } = req;
    const { status, isFavorite, sort } = req.query;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    const query: { createdUser: string; status: string; isFavorite?: boolean } = {
      createdUser: user._id,
      status,
    };

    if (isFavorite != null) {
      query.isFavorite = isFavorite;
    }

    const options: { page: number; limit: number; sort?: { [key: string]: number } } = {
      page,
      limit,
    };

    if (sort != null) {
      const sortOrder = sort.startsWith('-') ? -1 : 1;
      const sortKey = sortOrder === -1 ? sort.slice(1) : sort;
      options.sort = { [sortKey]: sortOrder };
    }

    try {
      const paginationResult = await PageModel.paginate(query, options);

      return res.status(200).json(paginationResult);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  });

  /**
   * @swagger
   * /pages/:id:
   *   get:
   *     description: get page by id
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: id
   *         description: page id for get
   *         in: path
   *         type: string
   *     responses:
   *       200:
   *         description: Return page by id
   */
  router.get('/:id', accessTokenParser, loginRequired, validator.getPage, apiValidatorMiddleware, async (req: WebevRequest, res: Response) => {
    const { id } = req.params;
    const { user } = req;

    const pageRepository = new PageRepository();
    const useCase = new FindPageById(pageRepository);

    try {
      const page = await useCase.execute(id, user._id);

      return res.status(200).json(page);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  });

  /**
   * @swagger
   * /pages/:id/favorite:
   *   put:
   *     description: Update favorite information on the page
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: id
   *         description: page id for update
   *         in: path
   *         type: string
   *       - name: body
   *         in: body
   *         schema:
   *           type: object
   *           properties:
   *             isFavorite:
   *               type: boolean
   *     responses:
   *       200:
   *         description: Return page after updated
   *         examples:
   *           result:
   *              url: hogehoge.example.com
   *              title: loading...
   */
  router.put('/:id/favorite', accessTokenParser, loginRequired, validator.putPageFavorite, apiValidatorMiddleware, async (req: WebevRequest, res: Response) => {
    const { id } = req.params;
    const { isFavorite } = req.body;
    const { user } = req;

    try {
      const page = await webevApp.PageService.updatePageFavorite(id, user._id, isFavorite);

      return res.status(200).json(page);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  });

  type archiveTyoe = {
    body: {
      isArchive: boolean;
    };
  };

  /**
   * @swagger
   * /pages/:id/archive:
   *   put:
   *     description: Update archive information on the page
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: id
   *         description: page id for update
   *         in: path
   *         type: string
   *       - name: body
   *         in: body
   *         schema:
   *           type: object
   *           properties:
   *             isArchive:
   *               type: boolean
   *     responses:
   *       200:
   *         description: Return page after updated
   *         examples:
   *           result:
   *              url: hogehoge.example.com
   *              title: loading...
   */
  router.put('/:id/archive', accessTokenParser, loginRequired, validator.putPageArchive, apiValidatorMiddleware, async (req: WebevRequest & archiveTyoe, res: Response) => {
    const { id } = req.params;
    const { isArchive } = req.body;
    const { user } = req;

    const pageRepository = new PageRepository();
    const useCase = new ArchivePage(pageRepository);

    try {
      const page = await useCase.execute(id, user, isArchive);

      return res.status(200).json(page);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  });

  /**
   * @swagger
   * /pages/:id:
   *   delete:
   *     description: Delete page by id
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: id
   *         description: page id for delete
   *         in: path
   *         type: string
   *     responses:
   *       200:
   *         description: Return page after deleted
   *         examples:
   *           result:
   *              url: hogehoge.example.com
   *              title: loading...
   */
  router.delete('/:id', accessTokenParser, loginRequired, validator.deletePage, apiValidatorMiddleware, async (req: WebevRequest, res: Response) => {
    const { id } = req.params;
    const { user } = req;

    try {
      const page = await webevApp.PageService.deletePage(id, user._id);

      return res.status(200).json(page);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  });

  return router;
};
