import { Response, NextFunction } from 'express';
import { UserRepository } from '../infrastructure/UserRepository';
import { WebevRequest } from '../interfaces/webev-request';
import { SessionRepository } from '../infrastructure/SessionRepository';

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

  if (session?.userId == null) {
    return next();
  }

  const userRepository = new UserRepository();
  const user = await userRepository.findUserById(session.userId as string);

  if (user != null) {
    req.user = user;
  }

  return next();
};
