/* eslint-disable @typescript-eslint/no-unused-vars */
import { Inquiry } from '../../domains/Inquiry';

export class SlackNotificationServiceMock {
  async notifyInquiryToSlack(inquiry: Inquiry): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
