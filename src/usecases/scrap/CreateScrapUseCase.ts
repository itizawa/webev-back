import { Scrap } from '../../domains/Scrap';
import { IScrapRepository } from '../../repositories/IScrapRepository';

export class CreateScrapUseCase {
  constructor(private readonly scrapRepository: IScrapRepository) {}

  execute({ scrap }: { scrap: Partial<Scrap> }): Promise<Scrap> {
    return this.scrapRepository.createScrap({ scrap });
  }
}
