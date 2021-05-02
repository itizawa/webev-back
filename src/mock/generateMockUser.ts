import { User } from '../domains/User';
export const generateMockUser = (): User => {
  return new User({
    _id: 'mockUserId',
    name: 'mockUserName',
    email: 'mockUserEmail',
    image: 'mockUserImage',
    createdAt: new Date('2020-01-01'),
    updatedAt: new Date('2020-01-01'),
  });
};
