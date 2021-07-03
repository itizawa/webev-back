import { Router, Response } from 'express';
import { body } from 'express-validator';
import { adminRequired } from '../middlewares/admin-required';
import { apiValidatorMiddleware } from '../middlewares/api-validator';
import { accessTokenParser } from '../middlewares/access-token-parser';

import { WebevRequest } from '../interfaces/webev-request';

import { CreateArticleUseCase } from '../usecases/article/CreateArticleUseCase';

const router = Router();

import { Article } from '../domains/Article';
import { factory } from '../repositories/factory';
const articleRepository = factory.articleRepository();

const validator = {
  postArticle: [
    body('article').custom((value: Partial<Article>) => {
      console.log(value);

      if (typeof value.title !== 'string') {
        throw new Error('Title is required');
      }

      if (typeof value.body !== 'string') {
        throw new Error('Body is required');
      }

      return true;
    }),
  ],
};

type PostArticle = {
  body: {
    article: Partial<Article>;
  };
};

export const articles = (): Router => {
  router.post('/', accessTokenParser, adminRequired, validator.postArticle, apiValidatorMiddleware, async (req: WebevRequest & PostArticle, res: Response) => {
    const { user } = req;

    const article = new Article(req.body.article);
    article.createdUser = user._id;

    const useCase = new CreateArticleUseCase(articleRepository);

    try {
      const result = await useCase.execute({ article });
      return res.status(200).json(result);
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  });

  return router;
};
