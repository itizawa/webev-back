import { Inquiry } from '../../domains/Inquiry';
import { IInquiryRepository } from '../../repositories/IInquiryRepository';

export class PostInquiryUseCase {
  private inquiryRepository: IInquiryRepository;

  constructor(inquiryRepository: IInquiryRepository) {
    this.inquiryRepository = inquiryRepository;
  }

  execute({ type, email, text }: Inquiry): Promise<Inquiry> {
    return this.inquiryRepository.postInquiry({ type, email, text });
  }
}
