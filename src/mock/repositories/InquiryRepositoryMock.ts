/* eslint-disable @typescript-eslint/no-unused-vars */
import { Inquiry } from '../../domains/Inquiry';
import { IInquiryRepository } from '../../repositories/IInquiryRepository';

export class InquiryRepository implements IInquiryRepository {
  postInquiry({ type, email, text }: Inquiry): Promise<Inquiry> {
    throw new Error('Method not implemented.');
  }
}
