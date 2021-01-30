import * as express from 'express';

const router = express.Router();

export const todoRoutes = (webevApp) => {

	router.get('/todo', (request: any, response: any, next: any) =>{
		return response.status(200).json({huga:'hoge'})
	});

	return router;
}
