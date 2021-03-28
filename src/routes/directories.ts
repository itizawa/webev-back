import { Router, Response } from 'express';
import { param } from 'express-validator';
import { apiValidatorMiddleware } from '../middlewares/api-validator';
import { loginRequired } from '../middlewares/login-required';
import { accessTokenParser } from '../middlewares/access-token-parser';
import { DirectoryModel } from '../models/directory';
import { WebevApp } from '../services/WebevApp';
import { WebevRequest } from '../interfaces/webev-request';

const router = Router();

const validator = {
  getDirectory: [param('id').isMongoId()],
};

export const directories = (webevApp: WebevApp): Router => {
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
      const page = await DirectoryModel.findOne({ _id: id, createdUser: user._id });

      return res.status(200).json(page);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  });

  return router;
};
