import { User } from '../domains/User';

export interface IUserRepository {
  findUserByUserName(name: string):Promise<User>;
}