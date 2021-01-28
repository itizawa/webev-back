import { TodoModel, ITodo } from './todo';

export class TodoController {
	public async getAll(): Promise<ITodo[]> {
		try {
			let items: any = await TodoModel.find({});
			items = items.map((item) => { return {id: item._id, description: item.description}});
			return items;
		} catch (err) {
			console.error('Caught error', err);
		}
	}

}
