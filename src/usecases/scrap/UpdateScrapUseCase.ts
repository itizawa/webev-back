import { Scrap, UpdatableProperty } from '../../domains/Scrap';
import { IScrapRepository } from '../../repositories/IScrapRepository';

export class UpdateScrapUseCase {
  constructor(private readonly scrapRepository: IScrapRepository) {}

  execute({ scrapId, property, userId }: { scrapId: string; property: UpdatableProperty; userId: string }): Promise<Scrap> {
    return this.scrapRepository.updateScrap({ scrapId, property, userId });
  }
}
