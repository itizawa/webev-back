import { Request } from 'express';
import { Document } from 'mongoose';
import { IUser } from '../models/user';
export interface WebevRequest extends Request {
  user?: Document<IUser>;
  query: { [key: string]: never };
}
