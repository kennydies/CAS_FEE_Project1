import {todoStore} from "../services/todoStore";
import {SecurityUtil} from '../utils/security'

export class TodosController {

    async getTodos(req, res) {
        res.json((await todoStore.all(SecurityUtil.currentUser(req)) || []));
    };

    async createTodo(req, res) {
        res.json(await todoStore.add(
            SecurityUtil.currentUser(req),
            req.body.title,
            req.body.description,
            req.body.importance,
            req.body.dueDate));
    };

    async updateTodo(req, res) {
        res.json(await todoStore.update(
            SecurityUtil.currentUser(req),
            req.params.id,
            req.body.title,
            req.body.description,
            req.body.importance,
            req.body.dueDate,
            req.body.state));
    };

    async showTodo(req, res) {
        res.json(await todoStore.get(SecurityUtil.currentUser(req), req));
    };

    async deleteTodo(req, res) {
        res.json(await todoStore.delete(SecurityUtil.currentUser(req), req));
    };
}

export const todosController = new TodosController();