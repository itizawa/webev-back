/* eslint-disable @typescript-eslint/no-unused-vars */
import { User } from '../../domains/User';
import { IUserRepository } from '../../repositories/IUserRepository';

export class UserRepositoryMock implements IUserRepository {
  findUserById(userId: string): Promise<User> {
    throw new Error('Method not implemented.');
  }
  findAllUsers(): Promise<User[]> {
    throw new Error('Method not implemented.');
  }
  updateUserInfoById(userId: string, name: string): Promise<User> {
    throw new Error('Method not implemented.');
  }
  updateIsExecutedTutorial(userId: string): Promise<User> {
    throw new Error('Method not implemented.');
  }
}
