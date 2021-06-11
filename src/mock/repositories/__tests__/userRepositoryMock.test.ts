import { UserRepositoryMock } from '../UserRepositoryMock';
import { generateMockUser } from '../../domains';

describe('InquiryRepositoryMock test', () => {
  const mockUser = generateMockUser();

  const userRepositoryMock = new UserRepositoryMock();

  test('findUserById', async () => {
    try {
      await userRepositoryMock.findUserById(mockUser._id);
    } catch (e) {
      expect(e).toEqual(new Error('Method not implemented.'));
    }
  });

  test('findAllUsers', async () => {
    try {
      await userRepositoryMock.findAllUsers();
    } catch (e) {
      expect(e).toEqual(new Error('Method not implemented.'));
    }
  });
});
