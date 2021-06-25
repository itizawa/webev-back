/* eslint-disable @typescript-eslint/no-unused-vars */
import { User, UpdatableProperity } from '../../domains/User';
import { IUserRepository } from '../../repositories/IUserRepository';

export class UserRepositoryMock implements IUserRepository {
  findUserById({ userId }: { userId: string }): Promise<User> {
    throw new Error('Method not implemented.');
  }
  findAllUsers(): Promise<User[]> {
    throw new Error('Method not implemented.');
  }
  updateUserInfoById({ userId, properity }: { userId: string; properity: UpdatableProperity }): Promise<User> {
    throw new Error('Method not implemented.');
  }
  updateIsExecutedTutorial({ userId }: { userId: string }): Promise<User> {
    throw new Error('Method not implemented.');
  }
}
