import { User } from '../domains/User';

export interface IUserRepository {
  findUserById({ userId }: { userId: string }): Promise<User>;
  findAllUsers(): Promise<User[]>;
  updateUserInfoById({ userId, name }: { userId: string; name: string }): Promise<User>;
  updateIsExecutedTutorial({ userId }: { userId: string }): Promise<User>;
}
