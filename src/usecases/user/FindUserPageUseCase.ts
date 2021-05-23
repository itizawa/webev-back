import { User } from '../../domains/User';
import { IUserRepository } from '../../repositories/IUserRepository';

export class FindUserPageUseCase {
  private userRepository: IUserRepository;

  constructor(userRepository: IUserRepository){
	  this.userRepository = userRepository
  }

  execute(userId: string): Promise<User> {
	  return this.userRepository.findUserPage(userId)
  }
}

