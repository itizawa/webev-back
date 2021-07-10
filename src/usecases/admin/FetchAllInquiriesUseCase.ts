import { Inquiry } from '../../domains/Inquiry';
import { IInquiryRepository } from '../../repositories/IInquiryRepository';

export class FetchAllInquiriesUseCase {
  constructor(private readonly inquiryRepository: IInquiryRepository) {}

  execute(): Promise<Inquiry[]> {
    return this.inquiryRepository.fetchAllInquiries();
  }
}
