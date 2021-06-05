import { Inquiry } from '../domains/Inquiry';

export class SlackNotificationService {
  async notifyInquiryToSlack(inquiry: Inquiry): Promise<void> {
    try {
      console.log(inquiry);
    } catch (error) {
      console.log(error);
    }
  }
}
