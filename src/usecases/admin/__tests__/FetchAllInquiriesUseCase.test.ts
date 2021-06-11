import { generateMockInquiry } from '../../../mock/domains';
import { InquiryRepositoryMock } from '../../../mock/repositories/InquiryRepositoryMock';
import { FetchAllInquiriesUseCase } from '../FetchAllInquiriesUseCase';

describe('FetchAllInquiriesUseCase', () => {
  const mock = new InquiryRepositoryMock();

  const mockInquiry = generateMockInquiry();

  const useCase = new FetchAllInquiriesUseCase(mock);

  const spy = jest.spyOn(mock, 'fetchAllInquiries').mockImplementation(async () => [mockInquiry]);
  test('execute', async () => {
    const response = await useCase.execute();

    expect(spy).toHaveBeenCalled();
    expect(response).toEqual([mockInquiry]);
  });
});
