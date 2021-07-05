import { Scrap, UpdatableProperty } from '../domains/Scrap';

export interface IScrapRepository {
  createScrap({ scrap }: { scrap: Partial<Scrap> }): Promise<Scrap>;
  deleteScrap({ scrapId, userId }: { scrapId: string; userId: string }): Promise<Scrap>;
  updateScrap({ scrapId, property, userId }: { scrapId: string; property: UpdatableProperty; userId: string }): Promise<Scrap>;
}
