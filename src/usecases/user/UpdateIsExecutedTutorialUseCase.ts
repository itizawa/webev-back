import { User } from '../../domains/User';
import { IUserRepository } from '../../repositories/IUserRepository';

export class UpdateIsExecutedTutorialUseCase {
  constructor(private readonly userRepository: IUserRepository) {}

  execute({ userId }: { userId: string }): Promise<User> {
    return this.userRepository.updateIsExecutedTutorial({ userId });
  }
}
