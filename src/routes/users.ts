import { Router, Response } from 'express';
import { body } from 'express-validator';
import { apiValidatorMiddleware } from '../middlewares/api-validator';
import { loginRequired } from '../middlewares/login-required';
import { accessTokenParser } from '../middlewares/access-token-parser';

import { WebevRequest } from '../interfaces/webev-request';
import { UserRepository } from '../infrastructure';
import { FindUserPageUseCase } from '../usecases/user/FindUserPageUseCase';
import { UpdateUserInfoUseCase } from '../usecases/user/UpdateUserInfoUseCase';
import { UpdateIsExecutedTutorialUseCase } from '../usecases/user/UpdateIsExecutedTutorialUseCase';

import { UpdatableProperity } from '../domains/User';

const router = Router();

const validator = {
  updateUserInfo: [body('properity').isObject({ strict: true })],
};

export const users = (): Router => {
  router.get('/me', accessTokenParser, loginRequired, async (req: WebevRequest, res: Response) => {
    const { user } = req;

    const userRepository = new UserRepository();
    const useCase = new FindUserPageUseCase(userRepository);

    try {
      const userPage = await useCase.execute({ userId: user._id });
      return res.status(200).json(userPage);
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  });

  type InfoType = {
    body: {
      properity: UpdatableProperity;
    };
  };

  router.put('/me', accessTokenParser, loginRequired, validator.updateUserInfo, apiValidatorMiddleware, async (req: WebevRequest & InfoType, res: Response) => {
    const { properity } = req.body;
    const { user } = req;

    const userRepository = new UserRepository();
    const useCase = new UpdateUserInfoUseCase(userRepository);

    try {
      const userPage = await useCase.execute({ userId: user._id, properity });
      return res.status(200).json(userPage);
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  });

  router.put('/me/isExecutedTutorial', accessTokenParser, loginRequired, async (req: WebevRequest & InfoType, res: Response) => {
    const { user } = req;

    const userRepository = new UserRepository();
    const useCase = new UpdateIsExecutedTutorialUseCase(userRepository);

    try {
      const result = await useCase.execute({ userId: user._id });
      return res.status(200).json(result);
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  });

  return router;
};
