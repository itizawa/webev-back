import { Router, Response } from 'express';
import { body, param } from 'express-validator';
import { apiValidatorMiddleware } from '../middlewares/api-validator';
import { loginRequired } from '../middlewares/login-required';
import { accessTokenParser } from '../middlewares/access-token-parser';

import { WebevRequest } from '../interfaces/webev-request';
import { FindUserUseCase } from '../usecases/user/FindUserUseCase';
import { UpdateUserInfoUseCase } from '../usecases/user/UpdateUserInfoUseCase';
import { UpdateIsExecutedTutorialUseCase } from '../usecases/user/UpdateIsExecutedTutorialUseCase';

import { UpdatableProperity } from '../domains/User';

const router = Router();

import { factory } from '../repositories/factory';
const userRepository = factory.userRepository();

const validator = {
  updateUserInfo: [body('properity').isObject({ strict: true })],
  findUserById: [param('id').isMongoId()],
};

export const users = (): Router => {
  router.get('/me', accessTokenParser, loginRequired, async (req: WebevRequest, res: Response) => {
    const { user } = req;

    const useCase = new FindUserUseCase(userRepository);

    try {
      const result = await useCase.execute({ userId: user._id });
      return res.status(200).json(result);
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

    const useCase = new UpdateUserInfoUseCase(userRepository);

    try {
      const result = await useCase.execute({ userId: user._id, properity });
      return res.status(200).json(result);
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  });

  router.put('/me/isExecutedTutorial', accessTokenParser, loginRequired, async (req: WebevRequest & InfoType, res: Response) => {
    const { user } = req;

    const useCase = new UpdateIsExecutedTutorialUseCase(userRepository);

    try {
      const result = await useCase.execute({ userId: user._id });
      return res.status(200).json(result);
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  });

  router.get('/:id', validator.findUserById, apiValidatorMiddleware, async (req: WebevRequest, res: Response) => {
    const { id: userId } = req.params;

    const useCase = new FindUserUseCase(userRepository);

    try {
      const result = await useCase.execute({ userId });
      return res.status(200).json(result);
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  });

  return router;
};
