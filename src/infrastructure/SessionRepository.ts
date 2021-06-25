import { model, Types, Model, Schema, Document } from 'mongoose';
import * as mongoosePaginate from 'mongoose-paginate-v2';

import { Session } from '../domains/Session';
import { ISessionRepository } from '../repositories/ISessionRepository';

const SessionSchema: Schema = new Schema(
  {
    accessToken: String,
    userId: {
      type: Types.ObjectId,
      ref: 'User',
    },
  },
  { timestamps: true },
);

export class SessionRepository implements ISessionRepository {
  public SessionModel: Model<Session & Document> & { paginate?: mongoosePaginate };

  constructor() {
    this.SessionModel = model<Session & Document>('Session', SessionSchema);
  }

  async findSessionByAccessToken({ accessToken }: { accessToken: string }): Promise<Session> {
    return this.SessionModel.findOne({ accessToken });
  }
}
