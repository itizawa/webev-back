import { Router, Response } from 'express';
import { body, param, query } from 'express-validator';
// import { apiValidatorMiddleware } from '../middlewares/api-validator';
// import { loginRequired } from '../middlewares/login-required';
// import { accessTokenParser } from '../middlewares/access-token-parser';

import { WebevApp } from '../services/WebevApp';
import { WebevRequest } from '../interfaces/webev-request';
import { UserRepository } from '../infrastructure/UserRepository';
import { FindUserPageUseCase } from '../usecases/user/FindUserPageUseCase';

const router = Router();

// const validator = {};

export const users = (webevApp: WebevApp): Router => {
  /**
   * @swagger
   */
  router.get('/me', async (req: WebevRequest, res: Response) => {
    // const {id} = req.params
    const { user } = req.body;

    const userRepository = new UserRepository();
    const useCase = new FindUserPageUseCase(userRepository);

    try {
      console.log('user');
      console.log(user);
      const userPage = await useCase.execute(user._id);
      return res.status(200).json(userPage);
    } catch (err) {
      console.log(err);
    }
  });
  return router;
};
