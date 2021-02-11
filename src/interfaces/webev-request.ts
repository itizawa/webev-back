import { Request } from 'express';
import { IUser } from '../models/user';

export interface WebevRequest extends Request {
  user?: Partial<IUser>;
}
