import { Directory } from '../../domains/Directory';
import { IDirectoryRepository } from '../../repositories/IDirectoryRepository';

export class UpdateOrderOfDirectoryUseCase {
  constructor(private readonly directoryRepository: IDirectoryRepository) {}

  async execute({ directoryId, order, userId }: { directoryId: string; order: number; userId: string }): Promise<Directory> {
    const document = await this.directoryRepository.findDirectory({ directoryId, userId });

    const isIncrease: boolean = document.order < order;
    const min: number = isIncrease ? document.order + 1 : order;
    const max: number = isIncrease ? order : document.order - 1;

    if (isIncrease) {
      await this.directoryRepository.decreaseDirectory({ min, max, userId });
    } else {
      await this.directoryRepository.increaseDirectory({ min, max, userId });
    }

    return this.directoryRepository.updateOrder({ directoryId, order, userId });
  }
}
