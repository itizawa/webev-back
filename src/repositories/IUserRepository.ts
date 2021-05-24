import { User } from '../domains/User';

export interface IUserRepository {
  findUserById(id: string):Promise<User>;
}