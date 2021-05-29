import { model, Model, Schema, Document } from 'mongoose';
import * as mongoosePaginate from 'mongoose-paginate-v2';

import { Inquiry } from '../domains/Inquiry';
import { IInquiryRepository } from '../repositories/IInquiryRepository';

const InquirySchema: Schema = new Schema(
  {
    type: {
      type: String,
      required: true,
    },
    email: String,
    text: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

export class InquiryRepository implements IInquiryRepository {
  public InquiryModel: Model<Inquiry & Document> & { paginate?: mongoosePaginate };

  constructor() {
    this.InquiryModel = model<Inquiry & Document>('Inquiry', InquirySchema);
  }

  async postInquiry({ type, email, text }: Inquiry): Promise<Inquiry> {
    return this.InquiryModel.create({ type, email, text });
  }
}
