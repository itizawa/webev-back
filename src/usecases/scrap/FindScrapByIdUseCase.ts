import { Scrap } from '../../domains/Scrap';
import { IScrapRepository } from '../../repositories/IScrapRepository';

export class FindScrapByIdUseCase {
  constructor(private readonly scrapRepository: IScrapRepository) {}

  execute({ scrapId }: { scrapId: string }): Promise<Scrap> {
    return this.scrapRepository.findScrapById({ scrapId });
  }
}
