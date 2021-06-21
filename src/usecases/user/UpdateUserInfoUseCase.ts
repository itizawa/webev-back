import { User } from '../../domains/User';
import { IUserRepository } from '../../repositories/IUserRepository';

export class UpdateUserInfoUseCase {
  private userRepository: IUserRepository;

  constructor(userRepository: IUserRepository) {
    this.userRepository = userRepository;
  }

  execute({ userId, name }: { userId: string; name: string }): Promise<User> {
    return this.userRepository.updateUserInfoById({ userId, name });
  }
}
