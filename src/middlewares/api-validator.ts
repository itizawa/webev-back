import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';

const apiValidatorMiddleware = (req: Request, res: Response, next: NextFunction): Response | void => {
  const errObjArray = validationResult(req);
  if (errObjArray.isEmpty()) {
    return next();
  }
  const errors = errObjArray.array().map((err) => {
    const message = `${err.msg}: ${err.param} in ${err.location}`;
    return { message };
  });
  return res.status(400).json({ errors });
};

export { apiValidatorMiddleware };
