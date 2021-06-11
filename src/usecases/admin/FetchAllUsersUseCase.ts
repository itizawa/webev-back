import { User } from '../../domains/User';
import { IUserRepository } from '../../repositories/IUserRepository';

export class FetchAllUsersUseCase {
  private userRepository: IUserRepository;

  constructor(userRepository: IUserRepository) {
    this.userRepository = userRepository;
  }

  execute(): Promise<User[]> {
    return this.userRepository.findAllUsers();
  }
}
