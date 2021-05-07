import { User } from '../../domains/User';
import { Directory } from '../../domains/Directory';
import { IDirectoryRepository } from '../../repositories/IDirectoryRepository';

export class UpdateOrderOfDirectoryUseCase {
  private directoryRepository: IDirectoryRepository;

  constructor(directoryRepository: IDirectoryRepository) {
    this.directoryRepository = directoryRepository;
  }

  async execute(directoryId: string, order: number, user: User): Promise<Directory> {
    const document = await this.directoryRepository.findDirectory(directoryId, user._id);

    const isIncrease: boolean = document.order < order;
    const min: number = isIncrease ? document.order + 1 : order;
    const max: number = isIncrease ? order : document.order - 1;

    if (isIncrease) {
      await this.directoryRepository.decreaseDirectory(min, max, user._id);
    } else {
      await this.directoryRepository.increaseDirectory(min, max, user._id);
    }

    return this.directoryRepository.updateOrder(directoryId, order, user._id);
  }
}
