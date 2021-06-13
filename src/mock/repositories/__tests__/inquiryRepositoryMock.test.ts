import { InquiryRepositoryMock } from '../InquiryRepositoryMock';
import { generateMockInquiry } from '../../domains';

describe('InquiryRepositoryMock test', () => {
  const mockInquiry = generateMockInquiry();

  const inquiryRepositoryMock = new InquiryRepositoryMock();

  test('postInquiry', async () => {
    try {
      await inquiryRepositoryMock.postInquiry(mockInquiry);
    } catch (e) {
      expect(e).toEqual(new Error('Method not implemented.'));
    }
  });

  test('fetchAllInquiries', async () => {
    try {
      await inquiryRepositoryMock.fetchAllInquiries();
    } catch (e) {
      expect(e).toEqual(new Error('Method not implemented.'));
    }
  });
});
