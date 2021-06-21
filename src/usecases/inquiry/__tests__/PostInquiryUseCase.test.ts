import { generateMockInquiry } from '../../../mock/domains';
import { SlackNotificationServiceMock } from '../../../mock/services/SlackNotificationServiceMock';
import { InquiryRepositoryMock } from '../../../mock/repositories';
import { PostInquiryUseCase } from '../PostInquiryUseCase';

describe('PostInquiryUseCase', () => {
  const mock = new InquiryRepositoryMock();
  const slackNotificationService = new SlackNotificationServiceMock();

  const mockInquiry = generateMockInquiry();

  const useCase = new PostInquiryUseCase(mock, slackNotificationService);

  const spy = jest.spyOn(mock, 'postInquiry').mockImplementation(async (inquiry) => generateMockInquiry(inquiry));
  test('execute', async () => {
    const response = await useCase.execute({ type: mockInquiry.type, email: mockInquiry.email, text: mockInquiry.text });

    expect(spy).toHaveBeenCalled();
    expect(response.type).toBe(mockInquiry.type);
    expect(response.email).toBe(mockInquiry.email);
    expect(response.text).toBe(mockInquiry.text);
  });
});
