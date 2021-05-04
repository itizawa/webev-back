import { generateMockPage, generateMockUser } from '../../../mock/domains';
import { PageRepositoryMock } from '../../../mock/repositories';
import { PostPageByUrlUseCase } from '../PostPageByUrlUseCase';

describe('PostPageByUrlUseCase', () => {
  const mockUrl = 'hogehoge.com';
  const mockUser = generateMockUser();
  const mock = new PageRepositoryMock();

  mock.createPage = async ({ url, title, createdUser }) => generateMockPage({ url, title, createdUser });

  const useCase = new PostPageByUrlUseCase(mock);

  const spy = jest.spyOn(mock, 'createPage');
  test('excute', async () => {
    const response = await useCase.execute(mockUrl, mockUser);

    expect(spy).toHaveBeenCalled();
    expect(response.url).toBe(mockUrl);
    expect(response.title).toBe('loading...');
    expect(response.createdUser).toBe(mockUser._id);
  });
});
