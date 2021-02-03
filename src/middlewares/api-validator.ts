import * as express from 'express';
import { validationResult } from 'express-validator';

const apiValidatorMiddleware = (req: express.Request, res: express.Response, next: express.NextFunction): express.Response | void => {
  const errObjArray = validationResult(req);
  if (errObjArray.isEmpty()) {
    return next();
  }
  const errors = errObjArray.array().map((err) => {
    const message = `${err.msg}`;
    return { message };
  });
  return res.status(400).json({ errors });
};

export { apiValidatorMiddleware };
