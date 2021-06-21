/* eslint-disable @typescript-eslint/no-unused-vars */
import { User } from '../../domains/User';
import { IUserRepository } from '../../repositories/IUserRepository';

export class UserRepositoryMock implements IUserRepository {
  findUserById({ userId }: { userId: string }): Promise<User> {
    throw new Error('Method not implemented.');
  }
  findAllUsers(): Promise<User[]> {
    throw new Error('Method not implemented.');
  }
  updateUserInfoById({ userId, name }: { userId: string; name: string }): Promise<User> {
    throw new Error('Method not implemented.');
  }
  updateIsExecutedTutorial({ userId }: { userId: string }): Promise<User> {
    throw new Error('Method not implemented.');
  }
}
