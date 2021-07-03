import { Router, Response } from 'express';
import { adminRequired } from '../middlewares/admin-required';
import { accessTokenParser } from '../middlewares/access-token-parser';

import { WebevRequest } from '../interfaces/webev-request';

import { FetchAllUsersUseCase } from '../usecases/admin/FetchAllUsersUseCase';
import { FetchAllInquiriesUseCase } from '../usecases/admin/FetchAllInquiriesUseCase';

const router = Router();

import { factory } from '../repositories/factory';
const inquiryRepository = factory.inquiryRepository();
const userRepository = factory.userRepository();

export const admin = (): Router => {
  router.get('/users', accessTokenParser, adminRequired, async (req: WebevRequest, res: Response) => {
    const useCase = new FetchAllUsersUseCase(userRepository);

    try {
      const users = await useCase.execute();
      return res.status(200).json({ users });
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  });

  router.get('/inquiries', accessTokenParser, adminRequired, async (req: WebevRequest, res: Response) => {
    const useCase = new FetchAllInquiriesUseCase(inquiryRepository);

    try {
      const inquiries = await useCase.execute();
      return res.status(200).json({ inquiries });
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  });

  return router;
};
