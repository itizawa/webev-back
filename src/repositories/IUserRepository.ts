import { User } from '../domains/User';

export interface IUserRepository {
  findUserById(id: string): Promise<User>;
  findAllUsers(): Promise<User[]>;
  // TODO imple updateUserInfoUseCase
  updateUserInfoById(id: string): Promise<User>;
}
