import { UserRepositoryMock } from '../UserRepositoryMock';
import { generateMockUser } from '../../domains';

describe('InquiryRepositoryMock test', () => {
  const mockUser = generateMockUser();

  const userRepositoryMock = new UserRepositoryMock();

  test('findUserById', async () => {
    try {
      await userRepositoryMock.findUserById({ userId: mockUser._id });
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

  test('updateUserInfoById', async () => {
    try {
      await userRepositoryMock.updateUserInfoById({ userId: mockUser._id, properity: { name: mockUser.name } });
    } catch (e) {
      expect(e).toEqual(new Error('Method not implemented.'));
    }
  });

  test('updateIsExecutedTutorial', async () => {
    try {
      await userRepositoryMock.updateIsExecutedTutorial({ userId: mockUser._id });
    } catch (e) {
      expect(e).toEqual(new Error('Method not implemented.'));
    }
  });
});
