/* eslint-disable @typescript-eslint/no-unused-vars */
import { Inquiry } from '../../domains/Inquiry';
import { IInquiryRepository } from '../../repositories/IInquiryRepository';

export class InquiryRepositoryMock implements IInquiryRepository {
  postInquiry({ type, email, text }: Partial<Inquiry>): Promise<Inquiry> {
    throw new Error('Method not implemented.');
  }
}
