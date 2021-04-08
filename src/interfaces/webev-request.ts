import { Request } from 'express';
import { User } from '../domains/User';
export interface WebevRequest extends Request {
  user?: User;
  query: { [key: string]: never };
}
