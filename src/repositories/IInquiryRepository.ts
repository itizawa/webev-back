import { Inquiry } from '../domains/Inquiry';

export interface IInquiryRepository {
  postInquiry({ type, email, text }: Inquiry): Promise<Inquiry>;
}
