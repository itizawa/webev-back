import * as express from 'express';

export function RegisterRoutes(app: express.Express) {

	app.get('/todo', (request: any, response: any, next: any) =>{
		return response.status(200).json({huga:'hoge'})
	});

}
