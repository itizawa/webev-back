import { generateMockInquiry } from '../../mock/domains';
import { SlackNotificationServiceMock } from '../../mock/services/SlackNotificationServiceMock';

describe('SlackNotificationService test', () => {
  const mockInquiry = generateMockInquiry();
  const slackNotificationService = new SlackNotificationServiceMock();
  test('notifyInquiryToSlack', async () => {
    const incomingWebhookSpy = jest.spyOn(slackNotificationService, 'notifyInquiryToSlack').mockImplementation();

    const response = await slackNotificationService.notifyInquiryToSlack(mockInquiry);
    expect(incomingWebhookSpy).toHaveBeenCalled();
    expect(response).toEqual(undefined);
  });
});
