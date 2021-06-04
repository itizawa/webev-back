import { Inquiry } from '../domains/Inquiry';

export interface IInquiryRepository {
  postInquiry({ type, email, text }: Partial<Inquiry>): Promise<Inquiry>;
}
