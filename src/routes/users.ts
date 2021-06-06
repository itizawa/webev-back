import { Router, Response } from 'express';
import { body, param, query } from 'express-validator';
// import { apiValidatorMiddleware } from '../middlewares/api-validator';
// import { loginRequired } from '../middlewares/login-required';
// import { accessTokenParser } from '../middlewares/access-token-parser';
import { FindUserPageUseCase } from '../usecases/user/FindUserPageUseCase';

import { WebevApp } from 'src/services/WebevApp';
import { WebevRequest } from 'src/interfaces/webev-request';
import { UserRepository } from 'src/infrastructure/UserRepository';

const router = Router()

const validator = {}

export const users = (webevApp:WebevApp): Router => {

	router.get('/:id', async(req: WebevRequest, res: Response) => {
		// const {id} = req.params
		const { user } = req


		const userRepository = new UserRepository()
		const useCase = new FindUserPageUseCase(userRepository)

		try {
			console.log('user')
			const userPage = await useCase.execute(user._id)
			return res.status(200).json(userPage);
			
		} catch (err) {
			console.log(err)		
		}

	})
}