import { model, Model, Schema, Types, Document } from 'mongoose';
import * as mongoosePaginate from 'mongoose-paginate-v2';

import { Article, UpdatableProperty } from '../domains/Article';

import { IArticleRepository } from '../repositories/IArticleRepository';
import { PageSchema } from './PageRepository';

const ArticleSchema: Schema = new Schema(
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

export class ArticleRepository implements IArticleRepository {
  ArticleModel: Model<Article & Document> & { paginate?: mongoosePaginate };

  constructor() {
    ArticleSchema.plugin(mongoosePaginate);

    this.ArticleModel = model<Article & Document>('Article', ArticleSchema);
  }

  async createArticle({ article }: { article: Partial<Article> }): Promise<Article> {
    return this.ArticleModel.create(article);
  }
  async deleteArticle({ articleId, userId }: { articleId: string; userId: string }): Promise<Article> {
    return this.ArticleModel.findOneAndDelete({ _id: articleId, createdUser: userId });
  }
  async updateArticle({ articleId, property, userId }: { articleId: string; property: UpdatableProperty; userId: string }): Promise<Article> {
    return this.ArticleModel.findOneAndUpdate({ _id: articleId, createdUser: userId }, property, { new: true });
  }
}
