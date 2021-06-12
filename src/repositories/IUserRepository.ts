import { User } from '../domains/User';

export interface IUserRepository {
  findUserById(id: string): Promise<User>;
  findAllUsers(): Promise<User[]>;
  updateUserInfoById(userId: string, name: string): Promise<User>;
}
