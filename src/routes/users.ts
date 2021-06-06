import { Router, Response } from 'express';
// import { body, param, query } from 'express-validator';
// import { apiValidatorMiddleware } from '../middlewares/api-validator';
import { loginRequired } from '../middlewares/login-required';
import { accessTokenParser } from '../middlewares/access-token-parser';

import { WebevRequest } from '../interfaces/webev-request';
import { UserRepository } from '../infrastructure/UserRepository';
import { FindUserPageUseCase } from '../usecases/user/FindUserPageUseCase';

const router = Router();

// const validator = {};

export const users = (): Router => {
  router.get('/me', accessTokenParser, loginRequired, async (req: WebevRequest, res: Response) => {
    const { user } = req;

    const userRepository = new UserRepository();
    const useCase = new FindUserPageUseCase(userRepository);

    try {
      const userPage = await useCase.execute(user._id);
      return res.status(200).json(userPage);
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  });
  return router;
};
