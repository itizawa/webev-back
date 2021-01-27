import { Router, Request, Response } from 'express';

// import { IUser } from '../models/user';
// import ApiValidator from '../middlewares/api-validator';
// import LoginRequired from '../middlewares/login-required';

const router = Router();

router.get('/',  async(req: Request, res: Response): Promise<Response> => {
  try {
    return res.status(200).json({huga:'hoge'});
  }
  catch (err) {
    console.log(err);
    return res.status(500).json({ message: 'Cannot get own information' });
  }
});

export default router;
