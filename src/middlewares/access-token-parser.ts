import { Response, NextFunction } from 'express';
import { WebevRequest } from '../interfaces/webev-request';
import { SessionRepository } from '../infrastructure/SessionRepository';
import { User } from '../domains/User';

export const accessTokenParser = async (req: WebevRequest, res: Response, next: NextFunction): Promise<void> => {
  const bearerToken = req.headers['authorization'];

  // check null
  if (bearerToken == null) {
    return next();
  }
  const bearer = bearerToken.split(' ');
  const token = bearer[1];

  const sessionRepository = new SessionRepository();
  const session = await sessionRepository.findSessionByAccessToken(token);

  if (session?.userId != null) {
    req.user = session.userId as User;
  }

  return next();
};
