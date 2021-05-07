import { generateMockPage } from '../../../mock/domains';
import { PageRepositoryMock } from '../../../mock/repositories';
import { CheerioServiceMock } from '../../../mock/CheerioServiceMock';
import { FetchOgpAndUpdatePageUseCase } from '../FetchOgpAndUpdatePageUseCase';

describe('FetchOgpAndUpdatePageUseCase', () => {
  const mockPage = generateMockPage({ url: 'test' });
  const mock = new PageRepositoryMock();
  const cheerioServiceMock = new CheerioServiceMock();

  cheerioServiceMock.retrieveDataByUrl = async (url) => generateMockPage({ url });
  mock.updatePageById = async (_id, page) => generateMockPage(page);
  const useCase = new FetchOgpAndUpdatePageUseCase(mock, cheerioServiceMock);

  const cheerioServiceSpy = jest.spyOn(cheerioServiceMock, 'retrieveDataByUrl');
  const spy = jest.spyOn(mock, 'updatePageById');
  test('excute', async () => {
    const response = await useCase.execute(mockPage.url, mockPage._id);

    expect(cheerioServiceSpy).toHaveBeenCalled();
    expect(spy).toHaveBeenCalled();
    expect(response.url).toBe('test');
  });
});
