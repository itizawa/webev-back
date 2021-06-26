import { User, UpdatableProperity } from '../../domains/User';
import { IUserRepository } from '../../repositories/IUserRepository';

export class UpdateUserInfoUseCase {
  private userRepository: IUserRepository;

  constructor(userRepository: IUserRepository) {
    this.userRepository = userRepository;
  }

  execute({ userId, properity }: { userId: string; properity: UpdatableProperity }): Promise<User> {
    console.log(properity);

    return this.userRepository.updateUserInfoById({ userId, properity });
  }
}
