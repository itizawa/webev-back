import { Router, Response } from 'express';
import { body, param } from 'express-validator';
import { loginRequired } from '../middlewares/login-required';
import { apiValidatorMiddleware } from '../middlewares/api-validator';
import { accessTokenParser } from '../middlewares/access-token-parser';

import { WebevRequest } from '../interfaces/webev-request';

import { Article, UpdatableProperty } from '../domains/Article';

import { CreateArticleUseCase } from '../usecases/article/CreateArticleUseCase';
import { DeleteArticleUseCase } from '../usecases/article/DeleteArticleUseCase';
import { UpdateArticleUseCase } from '../usecases/article/UpdateArticleUseCase';

const router = Router();

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
  updateArticle: [param('id').isMongoId()],
  deleteArticle: [param('id').isMongoId()],
};

type PostArticle = {
  body: {
    article: Partial<Article>;
  };
};

export const articles = (): Router => {
  router.post('/', accessTokenParser, loginRequired, validator.postArticle, apiValidatorMiddleware, async (req: WebevRequest & PostArticle, res: Response) => {
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

  type PutArticle = {
    params: {
      id: string;
    };
    body: {
      property: UpdatableProperty;
    };
  };

  router.put('/:id', accessTokenParser, loginRequired, validator.updateArticle, apiValidatorMiddleware, async (req: WebevRequest & PutArticle, res: Response) => {
    const { property } = req.body;
    const { id: articleId } = req.params;

    const useCase = new UpdateArticleUseCase(articleRepository);

    try {
      const result = await useCase.execute({ articleId, property });
      return res.status(200).json(result);
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  });

  router.delete('/:id', accessTokenParser, loginRequired, validator.deleteArticle, apiValidatorMiddleware, async (req: WebevRequest & PutArticle, res: Response) => {
    const { user } = req;
    const { id: articleId } = req.params;

    const useCase = new DeleteArticleUseCase(articleRepository);

    try {
      const result = await useCase.execute({ articleId, userId: user._id });
      return res.status(200).json(result);
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  });

  return router;
};
