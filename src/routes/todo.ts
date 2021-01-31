import * as express from 'express';
import {TodoModel} from '../models/todo'

const router = express.Router();

export const todoRoutes = (webevApp) => {

	router.get('/todo', async(request: any, response: any, next: any) =>{
		await TodoModel.create({description:'huga'})
		const hoge =  await TodoModel.find()

		return response.status(200).json({huga:hoge})
	});

	return router;
}
