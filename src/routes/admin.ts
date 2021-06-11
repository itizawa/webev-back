import { Router, Response } from 'express';
import { adminRequired } from '../middlewares/admin-required';
import { accessTokenParser } from '../middlewares/access-token-parser';

import { WebevRequest } from '../interfaces/webev-request';
import { UserRepository } from '../infrastructure/UserRepository';
import { FetchAllUsersUseCase } from '../usecases/admin/FetchAllUsersUseCase';

const router = Router();

export const admin = (): Router => {
  router.get('/users', accessTokenParser, adminRequired, async (req: WebevRequest, res: Response) => {
    const userRepository = new UserRepository();
    const useCase = new FetchAllUsersUseCase(userRepository);

    try {
      const users = await useCase.execute();
      return res.status(200).json({ users });
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  });

  return router;
};
