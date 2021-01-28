import { TodoController } from './todo.controller';
import * as express from 'express';

export function RegisterRoutes(app: express.Express) {
    app.get('/todo',
        function(request: any, response: any, next: any) {
            const controller = new TodoController();

            return response.status(200).json({huga:'hoge'})
        });
}
