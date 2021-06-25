import { User, UpdatableProperity } from '../domains/User';

export interface IUserRepository {
  findUserById({ userId }: { userId: string }): Promise<User>;
  findAllUsers(): Promise<User[]>;
  updateUserInfoById({ userId, properity }: { userId: string; properity: Partial<Record<UpdatableProperity, string>> }): Promise<User>;
  updateIsExecutedTutorial({ userId }: { userId: string }): Promise<User>;
}
