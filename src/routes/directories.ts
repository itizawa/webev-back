import { Router, Response } from 'express';
import { body, param, query } from 'express-validator';
import { apiValidatorMiddleware } from '../middlewares/api-validator';
import { loginRequired } from '../middlewares/login-required';
import { accessTokenParser } from '../middlewares/access-token-parser';

import { WebevRequest } from '../interfaces/webev-request';

import { DirectoryRepository } from '../infrastructure/DirectoryRepository';

import { CreateDirectory } from '../usecases/directory/CreateDirectory';
import { FindDirectoryList } from '../usecases/directory/FindDirectoryList';
import { RenameDirectory } from '../usecases/directory/RenameDirectory';
import { DeleteDirectory } from '../usecases/directory/DeleteDirectory';
import { FindDirectory } from '../usecases/directory/FindDirectory';
import { FindChildrenDirectories } from '../usecases/directory/FindChildrenDirectories';
import { UpdateOrderOfDirectory } from '../usecases/directory/UpdateOrderOfDirectory';
import { FindPageListByDirectoryId } from '../usecases/page/FindPageListByDirectoryId';

import { PageRepository } from '../infrastructure/PageRepository';
import { PaginationDirectoryQuery, PaginationOptions } from '../interfaces/pagination';
import { DirectoryTreeRepository } from '../infrastructure/DirectoryTreeRepository';
import { FindAncestorDirectories } from '../usecases/directory/FindAncestorDirectories';

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
  ],
  getDirectory: [param('id').isMongoId()],
  getPagesByDirectoryId: [param('id').isMongoId()],
  getDirectoriesByDirectoryId: [param('id').isMongoId()],
  renameDirectory: [param('id').isMongoId(), body('name').isString()],
  updateOrder: [param('id').isMongoId(), body('order').isInt()],
  updatePages: [param('id').isMongoId(), body('pages').isArray()],
  deleteDirectory: [param('id').isMongoId()],
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
    const CreateDirectoryUseCase = new CreateDirectory(directoryRepository, directoryTreeRepository);

    try {
      const result = await CreateDirectoryUseCase.execute(name, user._id, parentDirectoryId);

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
    const { page = 1, limit = 10 } = req.query;

    const directoryRepository = new DirectoryRepository();
    const FindDirectoryListUseCase = new FindDirectoryList(directoryRepository);

    const query = new PaginationDirectoryQuery({ createdUser: user._id, isRoot: true });

    const options = new PaginationOptions(page, limit, { order: 1 });

    try {
      const paginationResult = await FindDirectoryListUseCase.execute(query, options);
      return res.status(200).json(paginationResult);
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
    const FindDirectoryUseCase = new FindDirectory(directoryRepository);

    try {
      const result = await FindDirectoryUseCase.execute(id, user._id);

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
    const FindDirectoryUseCase = new FindPageListByDirectoryId(pageRepository);

    try {
      const result = await FindDirectoryUseCase.execute(id, user._id);

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
    const FindChildrenDirectoriesUseCase = new FindChildrenDirectories(directoryTreeRepository);

    try {
      const result = await FindChildrenDirectoriesUseCase.execute(id);

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
    const FindAncestorDirectoriesUseCase = new FindAncestorDirectories(directoryTreeRepository);

    try {
      const result = await FindAncestorDirectoriesUseCase.execute(id);

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
    const RenameDirectoryUseCase = new RenameDirectory(directoryRepository);

    try {
      const result = await RenameDirectoryUseCase.execute(id, name, user._id);

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
    const UpdateOrderOfDirectoryUseCase = new UpdateOrderOfDirectory(directoryRepository);

    try {
      const result = await UpdateOrderOfDirectoryUseCase.execute(id, order, user._id);

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
    const pageRepository = new PageRepository();
    const DeleteDirectoryUseCase = new DeleteDirectory(directoryRepository, pageRepository);

    try {
      const result = await DeleteDirectoryUseCase.execute(id, user._id);

      return res.status(200).json(result);
    } catch (err) {
      console.log(err);
      return res.status(500).json({ message: err.message });
    }
  });

  return router;
};
