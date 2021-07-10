import { Inquiry } from '../../domains/Inquiry';
import { IInquiryRepository } from '../../repositories/IInquiryRepository';
import { SlackNotificationService } from '../../services/SlackNotificationService';

export class PostInquiryUseCase {
  constructor(private readonly inquiryRepository: IInquiryRepository, private readonly slackNotificationService: SlackNotificationService) {}

  async execute({ type, email, text }: Partial<Inquiry>): Promise<Inquiry> {
    const inquiry = await this.inquiryRepository.postInquiry({ type, email, text });
    this.slackNotificationService.notifyInquiryToSlack({ inquiry });
    return inquiry;
  }
}
