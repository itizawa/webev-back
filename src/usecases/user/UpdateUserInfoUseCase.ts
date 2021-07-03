import { User, UpdatableProperity } from '../../domains/User';
import { IUserRepository } from '../../repositories/IUserRepository';

export class UpdateUserInfoUseCase {
  constructor(private readonly userRepository: IUserRepository) {}

  execute({ userId, properity }: { userId: string; properity: UpdatableProperity }): Promise<User> {
    return this.userRepository.updateUserInfoById({ userId, properity });
  }
}
