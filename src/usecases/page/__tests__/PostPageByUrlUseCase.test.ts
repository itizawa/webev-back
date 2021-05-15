import { Page } from '../../../domains/Page';
import { generateMockUser, generateMockDirectory } from '../../../mock/domains';
import { PageRepositoryMock } from '../../../mock/repositories';
import { PostPageByUrlUseCase } from '../PostPageByUrlUseCase';

describe('PostPageByUrlUseCase', () => {
  const mockUrl = 'hogehoge.com';
  const mockUser = generateMockUser();
  const mockDirectory = generateMockDirectory();
  const mock = new PageRepositoryMock();

  mock.createPage = async (page: Page) => page;

  const useCase = new PostPageByUrlUseCase(mock);

  const spy = jest.spyOn(mock, 'createPage');
  test('without directory', async () => {
    const response = await useCase.execute({ url: mockUrl, user: mockUser });

    expect(spy).toHaveBeenCalled();
    expect(response.url).toBe(mockUrl);
    expect(response.title).toBe('loading...');
    expect(response.createdUser).toBe(mockUser._id);
    expect(response.directoryId).toBe(null);
  });

  test('with directory', async () => {
    const response = await useCase.execute({ url: mockUrl, directoryId: mockDirectory._id, user: mockUser });
    console.log(response);

    expect(spy).toHaveBeenCalled();
    expect(response.url).toBe(mockUrl);
    expect(response.title).toBe('loading...');
    expect(response.createdUser).toBe(mockUser._id);
    expect(response.directoryId).toBe(mockDirectory._id);
  });
});
