import { Inquiry } from '../../domains/Inquiry';
import { IInquiryRepository } from '../../repositories/IInquiryRepository';

export class FetchAllInquiriesUseCase {
  private inquiryRepository: IInquiryRepository;

  constructor(inquiryRepository: IInquiryRepository) {
    this.inquiryRepository = inquiryRepository;
  }

  execute(): Promise<Inquiry[]> {
    return this.inquiryRepository.fetchAllInquiries();
  }
}
