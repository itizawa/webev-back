import { Response, NextFunction } from 'express';
import { WebevRequest } from '../interfaces/webev-request';
import { SessionRepository } from '../infrastructure/SessionRepository';
import { User } from '../domains/User';

export const accessTokenParser = async (req: WebevRequest, res: Response, next: NextFunction): Promise<void> => {
  const bearToken = req.headers['authorization'];

  // check null
  if (bearToken == null) {
    return next();
  }
  const bearer = bearToken.split(' ');
  const token = bearer[1];

  const sessionRepository = new SessionRepository();
  const session = await sessionRepository.findSessionByAccessToken(token);

  if (session?.userId != null) {
    req.user = session.userId as User;
  }

  return next();
};
