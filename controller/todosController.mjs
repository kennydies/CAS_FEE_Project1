import {todoStore} from "../services/todoStore";

export class TodosController {

    async getTodos(req, res) {
        res.json(await todoStore.all());
    };

    async createTodo(req, res) {
        res.json(await todoStore.add(
            req.body.title,
            req.body.description,
            req.body.importance,
            req.body.dueDate));
    };

    async updateTodo(req, res) {
        res.json(await todoStore.update(
            req.params.id,
            req.body.title,
            req.body.description,
            req.body.importance,
            req.body.dueDate));
    };

    async updateStateTodo(req, res) {
        res.json(await todoStore.updateState(
            req.params.id,
            req.body.done,
            ));
    };

    async showTodo(req, res) {
        res.json(await todoStore.get(req));
    };

    async deleteTodo(req, res) {
        res.json(await todoStore.delete(req));
    };
}

export const todosController = new TodosController();