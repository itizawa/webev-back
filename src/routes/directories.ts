import { Router, Response } from 'express';
import { body, param, query } from 'express-validator';
import { apiValidatorMiddleware } from '../middlewares/api-validator';
import { loginRequired } from '../middlewares/login-required';
import { accessTokenParser } from '../middlewares/access-token-parser';

import { WebevRequest } from '../interfaces/webev-request';

import { DirectoryRepository } from '../infrastructure/DirectoryRepository';

import { CreateDirectoryUseCase } from '../usecases/directory/CreateDirectoryUseCase';
import { FindAllDirectoriesUseCase } from '../usecases/directory/FindAllDirectoriesUseCase';
import { FindDirectoryListUseCase } from '../usecases/directory/FindDirectoryListUseCase';
import { RenameDirectoryUseCase } from '../usecases/directory/RenameDirectoryUseCase';
import { DeleteDirectoryUseCase } from '../usecases/directory/DeleteDirectoryUseCase';
import { FindDirectoryUseCase } from '../usecases/directory/FindDirectoryUseCase';
import { FindChildrenDirectoriesUseCase } from '../usecases/directory/FindChildrenDirectoriesUseCase';
import { UpdateOrderOfDirectoryUseCase } from '../usecases/directory/UpdateOrderOfDirectoryUseCase';
import { UpdateEmojiOfDirectoryUsecase } from '../usecases/directory/UpdateEmojiOfDirectoryUseCase';
import { FindPageListByDirectoryIdUseCase } from '../usecases/page/FindPageListByDirectoryIdUseCase';

import { PageRepository } from '../infrastructure/PageRepository';
import { PaginationDirectoryQuery, PaginationOptions } from '../interfaces/pagination';
import { DirectoryTreeRepository } from '../infrastructure/DirectoryTreeRepository';
import { FindAncestorDirectoriesUseCase } from '../usecases/directory/FindAncestorDirectoriesUseCase';
import { UpdateDescriptionOfDirectoryUsecase } from '../usecases/directory/UpdateDescriptionOfDirectoryUsecase';

const router = Router();

const validator = {
  postDirectory: [
    body('name').isString().isLength({ min: 1 }),
    body('parentDirectoryId')
      .if((value) => value != null)
      .isMongoId(),
  ],
  getDirectoryList: [
    query('page')
      .if((value) => value != null)
      .isInt(),
    query('limit')
      .if((value) => value != null)
      .isInt(),
    query('q')
      .if((value) => value != null)
      .isString(),
  ],
  getDirectory: [param('id').isMongoId()],
  getPagesByDirectoryId: [param('id').isMongoId()],
  getDirectoriesByDirectoryId: [param('id').isMongoId()],
  renameDirectory: [param('id').isMongoId(), body('name').isString()],
  updateOrder: [param('id').isMongoId(), body('order').isInt()],
  updateDescription: [param('id').isMongoId(), body('description').isString()],
  updatePages: [param('id').isMongoId(), body('pages').isArray()],
  deleteDirectory: [param('id').isMongoId()],
  updateEmoji: [param('id').isMongoId(), body('emojiId').isString()],
};

export const directories = (): Router => {
  /**
   * @swagger
   * /directories/:
   *   post:
   *     description: create directory by name
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: body
   *         in: body
   *         schema:
   *           type: object
   *           properties:
   *             name:
   *               type: string
   *               example: my memorandum
   *     responses:
   *       200:
   *         description: Return directory by id
   */
  router.post('/', accessTokenParser, loginRequired, validator.postDirectory, apiValidatorMiddleware, async (req: WebevRequest, res: Response) => {
    const { name, parentDirectoryId } = req.body;
    const { user } = req;

    const directoryRepository = new DirectoryRepository();
    const directoryTreeRepository = new DirectoryTreeRepository();
    const useCase = new CreateDirectoryUseCase(directoryRepository, directoryTreeRepository);

    try {
      const result = await useCase.execute(name, user, parentDirectoryId);

      return res.status(200).json(result);
    } catch (err) {
      console.log(err);
      return res.status(500).json({ message: err.message });
    }
  });

  type ListType = {
    query: {
      page?: number;
      limit?: number;
    };
  };

  /**
   * @swagger
   * /directories/list:
   *   get:
   *     description: get directory list
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: page
   *         description: page for pagination
   *         in: query
   *         type: number
   *       - name: limit
   *         description: limit for pagination
   *         in: query
   *         type: number
   *     responses:
   *       200:
   *         description: Save and return temporary information
   *         examples:
   *           result:
   *              url: hogehoge.example.com
   *              title: loading...
   */
  router.get('/list', accessTokenParser, loginRequired, validator.getDirectoryList, apiValidatorMiddleware, async (req: WebevRequest & ListType, res: Response) => {
    const { user } = req;
    const { page = 1, limit = 10, q } = req.query;

    const directoryRepository = new DirectoryRepository();
    const useCase = new FindDirectoryListUseCase(directoryRepository);

    const query = new PaginationDirectoryQuery({ createdUser: user._id, isRoot: true });

    // set keyword
    if (q != null && typeof q === 'string') {
      query.$or = [{ name: new RegExp(q), description: new RegExp(q) }];
    }

    const options = new PaginationOptions({ page, limit, sort: { order: 1 } });

    try {
      const paginationResult = await useCase.execute(query, options);
      return res.status(200).json(paginationResult);
    } catch (err) {
      console.log(err);
      return res.status(500).json({ message: err.message });
    }
  });

  /**
   * @swagger
   * /directories/all:
   *   get:
   *     description: get all directory by user id
   *     responses:
   *       200:
   *         description: Return all directory by user id
   */
  router.get('/all', accessTokenParser, loginRequired, async (req: WebevRequest, res: Response) => {
    const { user } = req;

    const directoryRepository = new DirectoryRepository();
    const useCase = new FindAllDirectoriesUseCase(directoryRepository);

    try {
      const result = await useCase.execute(user);

      return res.status(200).json(result);
    } catch (err) {
      console.log(err);
      return res.status(500).json({ message: err.message });
    }
  });

  /**
   * @swagger
   * /directories/:id:
   *   get:
   *     description: get directory by id
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: id
   *         description: directory id for get
   *         in: path
   *         type: string
   *     responses:
   *       200:
   *         description: Return directory by id
   */
  router.get('/:id', accessTokenParser, loginRequired, validator.getDirectory, apiValidatorMiddleware, async (req: WebevRequest, res: Response) => {
    const { id } = req.params;
    const { user } = req;

    const directoryRepository = new DirectoryRepository();
    const useCase = new FindDirectoryUseCase(directoryRepository);

    try {
      const result = await useCase.execute(id, user);

      return res.status(200).json(result);
    } catch (err) {
      console.log(err);
      return res.status(500).json({ message: err.message });
    }
  });

  /**
   * @swagger
   * /directories/:id/pages:
   *   get:
   *     description: get pages by directory id
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: id
   *         description: directory id for get
   *         in: path
   *         type: string
   *     responses:
   *       200:
   *         description: Return pages by directory id
   */
  router.get('/:id/pages', accessTokenParser, loginRequired, validator.getPagesByDirectoryId, apiValidatorMiddleware, async (req: WebevRequest, res: Response) => {
    const { id } = req.params;
    const { user } = req;

    const pageRepository = new PageRepository();
    const useCase = new FindPageListByDirectoryIdUseCase(pageRepository);

    try {
      const result = await useCase.execute(id, user._id);

      return res.status(200).json(result);
    } catch (err) {
      console.log(err);
      return res.status(500).json({ message: err.message });
    }
  });

  /**
   * @swagger
   * /directories/:id/children:
   *   get:
   *     description: get children directories by directory id
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: id
   *         description: directory id for get
   *         in: path
   *         type: string
   *     responses:
   *       200:
   *         description: Return children directories by directory id
   */
  router.get('/:id/children', accessTokenParser, loginRequired, validator.getDirectoriesByDirectoryId, apiValidatorMiddleware, async (req: WebevRequest, res: Response) => {
    const { id } = req.params;

    const directoryTreeRepository = new DirectoryTreeRepository();
    const useCase = new FindChildrenDirectoriesUseCase(directoryTreeRepository);

    try {
      const result = await useCase.execute(id);

      return res.status(200).json(result);
    } catch (err) {
      console.log(err);
      return res.status(500).json({ message: err.message });
    }
  });

  /**
   * @swagger
   * /directories/:id/ancestor:
   *   get:
   *     description: get ancestor directories by directory id
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: id
   *         description: directory id for get
   *         in: path
   *         type: string
   *     responses:
   *       200:
   *         description: Return ancestor directories by directory id
   */
  router.get('/:id/ancestor', accessTokenParser, loginRequired, validator.getDirectoriesByDirectoryId, apiValidatorMiddleware, async (req: WebevRequest, res: Response) => {
    const { id } = req.params;

    const directoryTreeRepository = new DirectoryTreeRepository();
    const useCase = new FindAncestorDirectoriesUseCase(directoryTreeRepository);

    try {
      const result = await useCase.execute(id);

      return res.status(200).json(result);
    } catch (err) {
      console.log(err);
      return res.status(500).json({ message: err.message });
    }
  });

  /**
   * @swagger
   * /directories/:id/rename:
   *   put:
   *     description: rename directory by id
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: id
   *         description: directory id for rename
   *         in: path
   *         type: string
   *       - name: body
   *         in: body
   *         schema:
   *           type: object
   *           properties:
   *             name:
   *               type: string
   *               example: my memorandum 2
   *     responses:
   *       200:
   *         description: Return directory after renamed
   */
  router.put('/:id/rename', accessTokenParser, loginRequired, validator.renameDirectory, apiValidatorMiddleware, async (req: WebevRequest, res: Response) => {
    const { id } = req.params;
    const { name } = req.body;
    const { user } = req;

    const directoryRepository = new DirectoryRepository();
    const useCase = new RenameDirectoryUseCase(directoryRepository);

    try {
      const result = await useCase.execute(id, name, user);

      return res.status(200).json(result);
    } catch (err) {
      console.log(err);
      return res.status(500).json({ message: err.message });
    }
  });

  /**
   * @swagger
   * /directories/:id/order:
   *   put:
   *     description: order directory by id
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: id
   *         description: directory id for order
   *         in: path
   *         type: string
   *       - name: body
   *         in: body
   *         schema:
   *           type: object
   *           properties:
   *             name:
   *               type: number
   *               example: order
   *     responses:
   *       200:
   *         description: Return directory after order
   */
  router.put('/:id/order', accessTokenParser, loginRequired, validator.updateOrder, apiValidatorMiddleware, async (req: WebevRequest, res: Response) => {
    const { id } = req.params;
    const { order } = req.body;
    const { user } = req;

    const directoryRepository = new DirectoryRepository();
    const useCase = new UpdateOrderOfDirectoryUseCase(directoryRepository);

    try {
      const result = await useCase.execute(id, order, user);

      return res.status(200).json(result);
    } catch (err) {
      console.log(err);
      return res.status(500).json({ message: err.message });
    }
  });

  /**
   * @swagger
   * /directories/:id/order:
   *   put:
   *     description: order directory by id
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: id
   *         description: directory id for order
   *         in: path
   *         type: string
   *       - name: body
   *         in: body
   *         schema:
   *           type: object
   *           properties:
   *             name:
   *               type: number
   *               example: order
   *     responses:
   *       200:
   *         description: Return directory after order
   */
  router.put('/:id/description', accessTokenParser, loginRequired, validator.updateDescription, apiValidatorMiddleware, async (req: WebevRequest, res: Response) => {
    const { id } = req.params;
    const { description } = req.body;
    const { user } = req;

    const directoryRepository = new DirectoryRepository();
    const usecase = new UpdateDescriptionOfDirectoryUsecase(directoryRepository);

    try {
      const result = await usecase.execute(id, description, user._id);

      return res.status(200).json(result);
    } catch (err) {
      console.log(err);
      return res.status(500).json({ message: err.message });
    }
  });

  /**
   * @swagger
   * /directories/:id:
   *   delete:
   *     description: delete directory by id
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: id
   *         description: directory id for delete
   *         in: path
   *         type: string
   *     responses:
   *       200:
   *         description: Return directory after deleted
   */
  router.delete('/:id', accessTokenParser, loginRequired, validator.deleteDirectory, apiValidatorMiddleware, async (req: WebevRequest, res: Response) => {
    const { id } = req.params;
    const { user } = req;

    const directoryRepository = new DirectoryRepository();
    const directoryTreeRepository = new DirectoryTreeRepository();
    const pageRepository = new PageRepository();
    const useCase = new DeleteDirectoryUseCase(directoryRepository, directoryTreeRepository, pageRepository);

    try {
      const result = await useCase.execute(id, user);

      return res.status(200).json(result);
    } catch (err) {
      console.log(err);
      return res.status(500).json({ message: err.message });
    }
  });

  // TODO: add swagger by #273
  router.put('/:id/emoji', accessTokenParser, loginRequired, validator.updateEmoji, apiValidatorMiddleware, async (req: WebevRequest, res: Response) => {
    const { id } = req.params;
    const { emojiId } = req.body;

    const directoryRepository = new DirectoryRepository();
    const usecase = new UpdateEmojiOfDirectoryUsecase(directoryRepository);

    try {
      const result = await usecase.execute(id, emojiId);

      return res.status(200).json(result);
    } catch (err) {
      console.log(err);
      return res.status(500).json({ message: err.message });
    }
  });

  return router;
};
