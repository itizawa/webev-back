import { IncomingWebhook } from '@slack/webhook';
import { Inquiry } from '../domains/Inquiry';

export class SlackNotificationService {
  async notifyInquiryToSlack(inquiry: Inquiry): Promise<void> {
    try {
      const webhook = new IncomingWebhook(process.env.SLACK_WEBHOOK_URL);
      await webhook.send({
        icon_emoji: 'email',
        text: `${inquiry.email || 'No Email'} からお問い合わせが届きました。\n Type: ${inquiry.type} \n ${inquiry.text}`,
      });
    } catch (error) {
      console.log(error);
    }
  }
}
