import { Scrap } from '../../domains/Scrap';
import { IScrapRepository } from '../../repositories/IScrapRepository';

export class DeleteScrapUseCase {
  constructor(private readonly scrapRepository: IScrapRepository) {}

  execute({ scrapId, userId }: { scrapId: string; userId: string }): Promise<Scrap> {
    return this.scrapRepository.deleteScrap({ scrapId, userId });
  }
}
