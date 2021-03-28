import { Router, Response } from 'express';
import { body, param } from 'express-validator';
import { apiValidatorMiddleware } from '../middlewares/api-validator';
import { loginRequired } from '../middlewares/login-required';
import { accessTokenParser } from '../middlewares/access-token-parser';
import { DirectoryModel } from '../models/directory';
import { WebevApp } from '../services/WebevApp';
import { WebevRequest } from '../interfaces/webev-request';

const router = Router();

const validator = {
  postDirectory: [body('name').isString()],
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

    try {
      const result = await webevApp.DirectoryService.saveDirectory({ name }, user);

      return res.status(200).json(result);
    } catch (err) {
      console.log(err);
      return res.status(500).json({ err: err.message });
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
   *   get:
   *     description: rename directory by id
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: id
   *         description: directory id for get
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
      const result = await webevApp.DirectoryService.renameDirectory(id, name, user);

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
      const result = await webevApp.DirectoryService.deleteDirectory(id, user);

      return res.status(200).json(result);
    } catch (err) {
      console.log(err);
      return res.status(500).json({ err: err.message });
    }
  });

  return router;
};
