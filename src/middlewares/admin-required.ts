import { Response, NextFunction } from 'express';
import { WebevRequest } from '../interfaces/webev-request';

export const adminRequired = (req: WebevRequest, res: Response, next: NextFunction): Response | void => {
  if (req.user == null || !req.user.admin) {
    console.log('Error: login required');
    return res.sendStatus(403);
  }

  return next();
};
