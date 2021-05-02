import { User } from '../domains/User';

export const generateMockUser = (mock: Partial<User> = {}): User => {
  const { _id, name, email, image, createdAt, updatedAt } = mock;
  return new User({
    _id: _id || 'mockUserId',
    name: name || 'mockUserName',
    email: email || 'mockUserEmail',
    image: image || 'mockUserImage',
    createdAt: createdAt || new Date('2020-01-01'),
    updatedAt: updatedAt || new Date('2020-01-01'),
  });
};
