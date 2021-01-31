import * as express from 'express';
import {TodoModel} from '../models/todo'

const router = express.Router();

export const todoRoutes = (webevApp) => {

	router.get('/todo', async(req: express.Request, res: express.Response) =>{
		await TodoModel.create({description:'huga'})
		const hoge =  await TodoModel.find()

		return res.status(200).json({huga:hoge})
	});

	return router;
}
