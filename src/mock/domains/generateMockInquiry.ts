import { Inquiry, InquiryType } from '../../domains/Inquiry';

export const generateMockInquiry = (mock: Partial<Inquiry> = {}): Inquiry => {
  const { _id, type, email, text } = mock;
  return new Inquiry({
    _id: _id || 'mockUserId',
    type: type || InquiryType.OTHERS,
    email: email || 'mockEmail',
    text: text || 'mockText',
  });
};
