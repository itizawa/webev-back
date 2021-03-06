import { Router, Response } from 'express';
import { body, param, query } from 'express-validator';
import { apiValidatorMiddleware } from '../middlewares/api-validator';
import { loginRequired } from '../middlewares/login-required';
import { accessTokenParser } from '../middlewares/access-token-parser';
import { WebevApp } from '../services/WebevApp';

import { WebevRequest } from '../interfaces/webev-request';
import { PaginationOptions, PaginationQuery } from '../interfaces/pagination';

import {
  ArchivePageUseCase,
  DeletePageUseCase,
  FetchOgpAndUpdatePageUseCase,
  FindPageByIdUseCase,
  FindPageListUseCase,
  PostPageByUrlUseCase,
  MovePageToDirectoryUseCase,
  CountAllPagesUseCase,
} from '../usecases/page';

import { CheerioService } from '../services/CheerioService';
import { PageStatus } from '../domains/Page';

const router = Router();

import { factory } from '../repositories/factory';
const pageRepository = factory.pageRepository();

const validator = {
  postPage: [
    body('url').isURL({ require_protocol: true }),
    body('directoryId')
      .if((value) => value != null)
      .isMongoId(),
  ],
  getPageList: [
    query('status').toArray(),
    query('directoryId')
      .customSanitizer((value) => {
        return value === 'null' ? null : value;
      })
      .if((value) => value != null)
      .isMongoId(),
    query('page')
      .if((value) => value != null)
      .isInt(),
    query('limit')
      .if((value) => value != null)
      .isInt(),
    query('sort')
      .if((value) => value != null)
      .isString(),
  ],
  getPage: [param('id').isMongoId()],
  putPageDirectory: [
    param('id').isMongoId(),
    body('directoryId')
      .if((value) => value != null)
      .isMongoId(),
  ],
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
   *             directoryId:
   *               type: string
   *               example: Required when adding to directory at the same time as saving
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
    const { url, socketId, directoryId } = req.body;

    let pageId: string;
    const cheerioService = new CheerioService();

    try {
      const useCase = new PostPageByUrlUseCase(pageRepository);
      const result = await useCase.execute({ url, directoryId, user });
      pageId = result._id;
      res.status(200).json(result);
    } catch (err) {
      console.log(err);
      return res.status(500).json({ message: err.message });
    }

    try {
      const useCase = new FetchOgpAndUpdatePageUseCase(pageRepository, cheerioService);
      await useCase.execute({ url, pageId });
      if (socketId != null) {
        webevApp.io.to(socketId).emit('update-page');
      }
    } catch (err) {
      console.log(err);
    }
  });

  router.get('/all', async (req: WebevRequest, res: Response) => {
    const useCase = new CountAllPagesUseCase(pageRepository);

    try {
      const number = await useCase.execute();

      return res.status(200).json(number);
    } catch (err) {
      console.log(err);
      return res.status(500).json({ message: err.message });
    }
  });

  type ListType = {
    query: {
      status: PageStatus[];
      directoryId?: string;
      sort?: string;
      page?: number;
      limit?: number;
      title?: string;
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
   *       - name: sort
   *         description: sort for search
   *         in: query
   *         type: string
   *         example: -createdAt
   *       - name: q
   *         description: keyword for search
   *         in: query
   *         type: string
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
    const { status, directoryId, sort, page = 1, limit = 10, q } = req.query;

    const useCase = new FindPageListUseCase(pageRepository);

    const query = new PaginationQuery({ status, createdUser: user._id, directoryId, q });
    const options = new PaginationOptions({ page, limit, sort });

    try {
      const paginationResult = await useCase.execute({ query, options });

      return res.status(200).json(paginationResult);
    } catch (err) {
      console.log(err);
      return res.status(500).json({ message: err.message });
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

    const useCase = new FindPageByIdUseCase(pageRepository);

    try {
      const page = await useCase.execute({ pageId: id, userId: user._id });

      return res.status(200).json(page);
    } catch (err) {
      console.log(err);
      return res.status(500).json({ message: err.message });
    }
  });

  /**
   * @swagger
   * /pages/:id/directories:
   *   put:
   *     description: Update directory information on the page
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
   *             directoryId:
   *               type: string
   *     responses:
   *       200:
   *         description: Return page after updated
   *         examples:
   *           result:
   *              url: hogehoge.example.com
   *              title: loading...
   */
  router.put('/:id/directories', accessTokenParser, loginRequired, validator.putPageDirectory, apiValidatorMiddleware, async (req: WebevRequest, res: Response) => {
    const { id } = req.params;
    const { directoryId } = req.body;
    const { user } = req;

    const useCase = new MovePageToDirectoryUseCase(pageRepository);

    try {
      const page = useCase.execute({ pageId: id, directoryId, userId: user._id });

      return res.status(200).json(page);
    } catch (err) {
      console.log(err);
      return res.status(500).json({ message: err.message });
    }
  });

  type archiveType = {
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
  router.put('/:id/archive', accessTokenParser, loginRequired, validator.putPageArchive, apiValidatorMiddleware, async (req: WebevRequest & archiveType, res: Response) => {
    const { id } = req.params;
    const { isArchive } = req.body;
    const { user } = req;

    const useCase = new ArchivePageUseCase(pageRepository);

    try {
      const page = await useCase.execute({ pageId: id, userId: user._id, isArchive });

      return res.status(200).json(page);
    } catch (err) {
      console.log(err);
      return res.status(500).json({ message: err.message });
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

    const useCase = new DeletePageUseCase(pageRepository);

    try {
      const page = await useCase.execute({ pageId: id, userId: user._id });

      return res.status(200).json(page);
    } catch (err) {
      console.log(err);
      return res.status(500).json({ message: err.message });
    }
  });

  return router;
};
