import { User } from '../domains/User';

export interface IUserRepository {
  findUserById({ userId }: { userId: string }): Promise<User>;
  findAllUsers(): Promise<User[]>;
  updateUserInfoById(userId: string, name: string): Promise<User>;
  updateIsExecutedTutorial(userId: string): Promise<User>;
}
