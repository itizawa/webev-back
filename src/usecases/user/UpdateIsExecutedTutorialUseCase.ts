import { User } from '../../domains/User';
import { IUserRepository } from '../../repositories/IUserRepository';

export class UpdateIsExecutedTutorialUseCase {
  private userRepository: IUserRepository;

  constructor(userRepository: IUserRepository) {
    this.userRepository = userRepository;
  }

  execute(userId: string): Promise<User> {
    return this.userRepository.updateIsExecutedTutorial(userId);
  }
}
