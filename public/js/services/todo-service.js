import { httpService } from './http-service.js'

class TodoService {
    async createTodo(todoTitle, todoDescription, todoImportance, todoDueDate) {
        return await httpService.ajax("POST", "/todos/", {
            title: todoTitle,
            description: todoDescription,
            importance: todoImportance,
            dueDate: todoDueDate,
        });
    }

    async getTodos() {
        return await httpService.ajax("GET", "/todos/", undefined);
    }

    async getTodo(id) {
        return await httpService.ajax("GET", `/todos/${id}`, undefined);
    }

    async deleteTodo(id) {
        return await httpService.ajax("DELETE", `/todos/${id}`, undefined);
    }

    async switchStateTodo(id, done) {
        console.log(id, done);
        return await httpService.ajax("PATCH", `/todos/${id}`,{ done: done });
    }

    async updateTodo(id, todoTitle, todoDescription, todoImportance, todoDueDate) {
        return await httpService.ajax("PUT", `/todos/${id}`, {
            title: todoTitle,
            description: todoDescription,
            importance: todoImportance,
            dueDate: todoDueDate,
        });
    }
}

export const todoService = new TodoService();