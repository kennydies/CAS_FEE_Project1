import { todoService } from '../services/todo-service.js'

const todoContainer = document.querySelector("#todoContainer");
const todoRenderer = Handlebars.compile(document.querySelector("#todo-template").innerHTML);

const todoId = window.location.hash.substring(1);

async function renderTodo() {
    todoContainer.innerHTML = todoRenderer(await todoService.getTodo(todoId))
}

todoContainer.addEventListener("click", async event => {
    if (event.target.classList.contains("js-delete")) {
        await todoService.deleteTodo(event.target.dataset.id);
        renderTodo()
    }
});

renderTodo();