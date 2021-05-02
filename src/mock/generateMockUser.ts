/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { User } from '../domains/User';

export const generateMockUser = ({ _id, name, email, image, createdAt, updatedAt }: any): User => {
  return new User({
    _id: _id || 'mockUserId',
    name: name || 'mockUserName',
    email: email || 'mockUserEmail',
    image: image || 'mockUserImage',
    createdAt: createdAt || new Date('2020-01-01'),
    updatedAt: updatedAt || new Date('2020-01-01'),
  });
};
