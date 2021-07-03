import { Article } from '../../domains/Article';

export const generateMockArticle = (mock: Partial<Article> = {}): Article => {
  const { _id, title, body, createdUser, isPublic, emojiId, createdAt, updatedAt } = mock;
  return new Article({
    _id: _id || 'mockUserId',
    title: title || 'mockTitle',
    body: body || 'mockBody',
    createdUser: createdUser || 'mockUserId',
    isPublic: isPublic || false,
    emojiId: emojiId || 'open_file_folder',
    createdAt: createdAt || new Date('2020-01-01'),
    updatedAt: updatedAt || new Date('2020-01-01'),
  });
};
