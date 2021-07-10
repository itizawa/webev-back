/* eslint-disable @typescript-eslint/no-unused-vars */
import { Scrap, UpdatableProperty } from '../../domains/Scrap';
import { IScrapRepository } from '../../repositories/IScrapRepository';

export class ScrapRepositoryMock implements IScrapRepository {
  createScrap({ scrap }: { scrap: Scrap }): Promise<Scrap> {
    throw new Error('Method not implemented.');
  }
  deleteScrap({ scrapId, userId }: { scrapId: string; userId: string }): Promise<Scrap> {
    throw new Error('Method not implemented.');
  }
  findScrapById({ scrapId }: { scrapId: string }): Promise<Scrap> {
    throw new Error('Method not implemented.');
  }
  updateScrap({ scrapId, property, userId }: { scrapId: string; property: UpdatableProperty; userId: string }): Promise<Scrap> {
    throw new Error('Method not implemented.');
  }
}
