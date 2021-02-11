import { Response, NextFunction } from 'express';
import { WebevRequest } from '../interfaces/webev-request';
import { ISession, SessionModel } from '../models/session';

export const accessTokenParser = async (req: WebevRequest, res: Response, next: NextFunction): Promise<void> => {
  const bearToken = req.headers['authorization'];
  const bearer = bearToken.split(' ');
  const token = bearer[1];

  const session: Partial<ISession> = await SessionModel.findOne({ accessToken: token }).select('userId').populate('userId');

  if (session.userId != null) {
    req.user = session.userId;
  }

  return next();
};
