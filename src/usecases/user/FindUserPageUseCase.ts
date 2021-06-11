import { User } from '../../domains/User';
import { IUserRepository } from '../../repositories/IUserRepository';

export class FindUserPageUseCase {
  private userRepository: IUserRepository;

  constructor(userRepository: IUserRepository) {
    this.userRepository = userRepository;
  }

  execute(id: string): Promise<User> {
    return this.userRepository.findUserById(id);
  }
}
