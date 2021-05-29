import { generateMockInquiry } from '../../../mock/domains';
import { InquiryRepositoryMock } from '../../../mock/repositories';
import { PostInquiryUseCase } from '../PostInquiryUseCase';

describe('PostInquiryUseCase', () => {
  const mock = new InquiryRepositoryMock();
  const mockInquiry = generateMockInquiry();

  const useCase = new PostInquiryUseCase(mock);

  const spy = jest.spyOn(mock, 'postInquiry').mockImplementation(async (Inquiry) => generateMockInquiry(Inquiry));
  test('execute', async () => {
    const response = await useCase.execute({ type: mockInquiry.type, email: mockInquiry.email, text: mockInquiry.text });

    expect(spy).toHaveBeenCalled();
    expect(response.type).toBe(mockInquiry.type);
    expect(response.email).toBe(mockInquiry.email);
    expect(response.text).toBe(mockInquiry.text);
  });
});
