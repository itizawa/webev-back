import { model, Model, Schema, Types, Document } from 'mongoose';
import * as mongoosePaginate from 'mongoose-paginate-v2';

import { Scrap, UpdatableProperty } from '../domains/Scrap';

import { IScrapRepository } from '../repositories/IScrapRepository';
import { PageSchema } from './PageRepository';

const ScrapSchema: Schema = new Schema(
  {
    title: { type: String, index: true },
    body: { type: String, default: '' },
    createdUser: {
      type: Types.ObjectId,
      ref: 'User',
      required: true,
    },
    isPublic: { type: Boolean, default: false },
    emojiId: { type: String, default: 'open_file_folder' },
    pages: [PageSchema],
  },
  { timestamps: true },
);

export class ScrapRepository implements IScrapRepository {
  ScrapModel: Model<Scrap & Document> & { paginate?: mongoosePaginate };

  constructor() {
    ScrapSchema.plugin(mongoosePaginate);

    this.ScrapModel = model<Scrap & Document>('Scrap', ScrapSchema);
  }

  async createScrap({ scrap }: { scrap: Partial<Scrap> }): Promise<Scrap> {
    return this.ScrapModel.create(scrap);
  }
  async deleteScrap({ scrapId, userId }: { scrapId: string; userId: string }): Promise<Scrap> {
    return this.ScrapModel.findOneAndDelete({ _id: scrapId, createdUser: userId });
  }
  async findScrapById({ scrapId }: { scrapId: string }): Promise<Scrap> {
    return this.ScrapModel.findOne({ _id: scrapId, isPublic: true });
  }
  async updateScrap({ scrapId, property, userId }: { scrapId: string; property: UpdatableProperty; userId: string }): Promise<Scrap> {
    return this.ScrapModel.findOneAndUpdate({ _id: scrapId, createdUser: userId }, property, { new: true });
  }
}
