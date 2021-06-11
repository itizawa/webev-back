import { Router, Response } from 'express';
import { loginRequired } from '../middlewares/login-required';
import { accessTokenParser } from '../middlewares/access-token-parser';

import { WebevRequest } from '../interfaces/webev-request';

const router = Router();

export const admin = (): Router => {
  router.get('/users', accessTokenParser, async (req: WebevRequest, res: Response) => {
    const { user } = req;
    console.log(user);

    res.json({ hoge: 'huga' });

    // const userRepository = new UserRepository();
    // const useCase = new FindUserPageUseCase(userRepository);

    // try {
    //   const userPage = await useCase.execute(user._id);
    //   return res.status(200).json(userPage);
    // } catch (err) {
    //   return res.status(500).json({ message: err.message });
    // }
  });

  return router;
};
