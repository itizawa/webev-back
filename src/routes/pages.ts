import { Router, Response } from 'express';
import { body, param, query } from 'express-validator';
import { apiValidatorMiddleware } from '../middlewares/api-validator';
import { loginRequired } from '../middlewares/login-required';
import { accessTokenParser } from '../middlewares/access-token-parser';
import { WebevApp } from '../services/WebevApp';
import { WebevRequest } from '../interfaces/webev-request';

import { PageRepository } from '../infrastructure/PageRepository';

import { ArchivePage } from '../usecases/page/ArchivePage';
import { DeletePage } from '../usecases/page/DeletePage';
import { FavoritePage } from '../usecases/page/FavoritePage';
import { FetchOgpAndUpdatePage } from '../usecases/page/FetchOgpAndUpdatePage';
import { FindPageById } from '../usecases/page/FindPageById';
import { FindPageList } from '../usecases/page/FindPageList';
import { PostPageByUrl } from '../usecases/page/PostPageByUrl';

import { PageService } from '../services/PageService';
import { PageStatus } from '../domains/Page';

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

    let pageId: string;
    const pageRepository = new PageRepository();
    const PostPageByUrlUseCase = new PostPageByUrl(pageRepository);

    try {
      const result = await PostPageByUrlUseCase.execute(url, user);
      pageId = result._id;
      res.status(200).json(result);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }

    const pageService = new PageService();
    const FetchOgpAndUpdatePageUseCase = new FetchOgpAndUpdatePage(pageRepository, pageService);

    try {
      await FetchOgpAndUpdatePageUseCase.execute(url, pageId);
      webevApp.io.emit('update-page');
    } catch (err) {
      console.log(err);
    }
  });

  type ListType = {
    query: {
      status: PageStatus;
      isFavorite?: boolean;
      sort?: string;
      page?: number;
      limit?: number;
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
    const { status, isFavorite, sort, page = 1, limit = 10 } = req.query;

    const pageRepository = new PageRepository();
    const useCase = new FindPageList(pageRepository);

    try {
      const paginationResult = await useCase.execute(user, status, isFavorite, sort, page, limit);

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

    const pageRepository = new PageRepository();
    const useCase = new FavoritePage(pageRepository);

    try {
      const page = useCase.execute(id, user, isFavorite);

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

    const pageRepository = new PageRepository();
    const useCase = new DeletePage(pageRepository);

    try {
      const page = await useCase.execute(id, user);

      return res.status(200).json(page);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  });

  return router;
};
