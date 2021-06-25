import { Inquiry } from '../../domains/Inquiry';
import { IInquiryRepository } from '../../repositories/IInquiryRepository';
import { SlackNotificationService } from '../../services/SlackNotificationService';

export class PostInquiryUseCase {
  private inquiryRepository: IInquiryRepository;
  private slackNotificationService: SlackNotificationService;

  constructor(inquiryRepository: IInquiryRepository, slackNotificationService: SlackNotificationService) {
    this.inquiryRepository = inquiryRepository;
    this.slackNotificationService = slackNotificationService;
  }

  async execute({ type, email, text }: Partial<Inquiry>): Promise<Inquiry> {
    const inquiry = await this.inquiryRepository.postInquiry({ type, email, text });
    this.slackNotificationService.notifyInquiryToSlack({ inquiry });
    return inquiry;
  }
}
