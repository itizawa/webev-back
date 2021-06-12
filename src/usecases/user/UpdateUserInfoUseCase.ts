import { User } from '../../domains/User';
import { IUserRepository } from '../../repositories/IUserRepository';

export class UpdateUserInfoById {
  private userRepository: IUserRepository;

  constructor(userRepository: IUserRepository) {
    this.userRepository = userRepository;
  }

  execute(userId: string, name: string): Promise<User> {
    return this.userRepository.updateUserInfoById(userId, name);
  }
}
