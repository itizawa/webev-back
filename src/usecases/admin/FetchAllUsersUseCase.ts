import { User } from '../../domains/User';
import { IUserRepository } from '../../repositories/IUserRepository';

export class FetchAllUsersUseCase {
  constructor(private readonly userRepository: IUserRepository) {}

  execute(): Promise<User[]> {
    return this.userRepository.findAllUsers();
  }
}
