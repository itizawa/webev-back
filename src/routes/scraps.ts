import { Router, Response } from 'express';
import { body, param } from 'express-validator';
import { loginRequired } from '../middlewares/login-required';
import { apiValidatorMiddleware } from '../middlewares/api-validator';
import { accessTokenParser } from '../middlewares/access-token-parser';

import { WebevRequest } from '../interfaces/webev-request';

import { Scrap, UpdatableProperty } from '../domains/Scrap';

import { CreateScrapUseCase } from '../usecases/scrap/CreateScrapUseCase';
import { DeleteScrapUseCase } from '../usecases/scrap/DeleteScrapUseCase';
import { FindScrapByIdUseCase } from '../usecases/scrap/FindScrapByIdUseCase';
import { UpdateScrapUseCase } from '../usecases/scrap/UpdateScrapUseCase';

const router = Router();

import { factory } from '../repositories/factory';
const scrapRepository = factory.scrapRepository();

const validator = {
  postScrap: [
    body('scrap').custom((value: Partial<Scrap>) => {
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
  findScrap: [param('id').isMongoId()],
  updateScrap: [param('id').isMongoId()],
  deleteScrap: [param('id').isMongoId()],
};

type PostScrap = {
  body: {
    scrap: Partial<Scrap>;
  };
};

export const scraps = (): Router => {
  router.post('/', accessTokenParser, loginRequired, validator.postScrap, apiValidatorMiddleware, async (req: WebevRequest & PostScrap, res: Response) => {
    const { user } = req;

    const scrap = new Scrap(req.body.scrap);
    scrap.createdUser = user._id;

    const useCase = new CreateScrapUseCase(scrapRepository);

    try {
      const result = await useCase.execute({ scrap });
      return res.status(200).json(result);
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  });

  type FindScrap = {
    params: {
      id: string;
    };
  };

  router.get('/:id', validator.findScrap, apiValidatorMiddleware, async (req: WebevRequest & FindScrap, res: Response) => {
    const { id: scrapId } = req.params;

    const useCase = new FindScrapByIdUseCase(scrapRepository);

    try {
      const result = await useCase.execute({ scrapId });
      return res.status(200).json(result);
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  });

  type PutScrap = {
    params: {
      id: string;
    };
    body: {
      property: UpdatableProperty;
    };
  };

  router.put('/:id', accessTokenParser, loginRequired, validator.updateScrap, apiValidatorMiddleware, async (req: WebevRequest & PutScrap, res: Response) => {
    const { user } = req;
    const { property } = req.body;
    const { id: scrapId } = req.params;

    const useCase = new UpdateScrapUseCase(scrapRepository);

    try {
      const result = await useCase.execute({ scrapId, property, userId: user._id });
      return res.status(200).json(result);
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  });

  router.delete('/:id', accessTokenParser, loginRequired, validator.deleteScrap, apiValidatorMiddleware, async (req: WebevRequest & PutScrap, res: Response) => {
    const { user } = req;
    const { id: scrapId } = req.params;

    const useCase = new DeleteScrapUseCase(scrapRepository);

    try {
      const result = await useCase.execute({ scrapId, userId: user._id });
      return res.status(200).json(result);
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  });

  return router;
};
