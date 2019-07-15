import {todoStore} from "../services/todoStore";

export class TodosController {

    async getTodos(req, res) {
        res.json(await todoStore.all(req));
    };

    async createTodo(req, res) {
        res.json(await todoStore.add(req));
    };

    async updateTodo(req, res) {
        res.json(await todoStore.update(req));
    };

    async updateStateTodo(req, res) {
        res.json(await todoStore.updateState(req));
    };

    async showTodo(req, res) {
        res.json(await todoStore.get(req));
    };

    async deleteTodo(req, res) {
        res.json(await todoStore.delete(req));
    };
}

export const todosController = new TodosController();