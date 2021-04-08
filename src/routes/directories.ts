import { Router, Response } from 'express';
import { body, param, query } from 'express-validator';
import { apiValidatorMiddleware } from '../middlewares/api-validator';
import { loginRequired } from '../middlewares/login-required';
import { accessTokenParser } from '../middlewares/access-token-parser';
import { DirectoryModel } from '../models/directory';
import { WebevApp } from '../services/WebevApp';

import { WebevRequest } from '../interfaces/webev-request';

import { DirectoryRepository } from '../infrastructure/DirectoryRepository';

import { CreateDirectory } from '../usecases/directory/CreateDirectory';

const router = Router();

const validator = {
  postDirectory: [body('name').isString()],
  getDirectoryList: [
    query('page')
      .if((value) => value != null)
      .isInt(),
    query('limit')
      .if((value) => value != null)
      .isInt(),
  ],
  getDirectory: [param('id').isMongoId()],
  renameDirectory: [param('id').isMongoId(), body('name').isString()],
  deleteDirectory: [param('id').isMongoId()],
};

export const directories = (webevApp: WebevApp): Router => {
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
    const { name } = req.body;
    const { user } = req;

    const directoryRepository = new DirectoryRepository();
    const CreateDirectoryUseCase = new CreateDirectory(directoryRepository);

    try {
      const result = await CreateDirectoryUseCase.execute(name, user._id);

      return res.status(200).json(result);
    } catch (err) {
      console.log(err);
      return res.status(500).json({ err: err.message });
    }
  });

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
  router.get('/list', accessTokenParser, loginRequired, validator.getDirectoryList, apiValidatorMiddleware, async (req: WebevRequest, res: Response) => {
    const { user } = req;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    const query: { createdUser: string } = {
      createdUser: user._id,
    };

    const options: { page: number; limit: number; sort?: { [key: string]: number } } = {
      page,
      limit,
      sort: { createdAt: -1 },
    };

    try {
      const paginationResult = await DirectoryModel.paginate(query, options);

      return res.status(200).json(paginationResult);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
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

    try {
      const result = await DirectoryModel.findOne({ _id: id, createdUser: user._id });

      return res.status(200).json(result);
    } catch (err) {
      console.log(err);
      return res.status(500).json({ err: err.message });
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

    try {
      const result = await webevApp.DirectoryService.renameDirectory(id, name, user._id);

      return res.status(200).json(result);
    } catch (err) {
      console.log(err);
      return res.status(500).json({ err: err.message });
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

    try {
      const result = await webevApp.DirectoryService.deleteDirectory(id, user._id);

      return res.status(200).json(result);
    } catch (err) {
      console.log(err);
      return res.status(500).json({ err: err.message });
    }
  });

  return router;
};
