import { todoService } from '../services/todo-service.js'

const listContainer = document.querySelector("#list-container");
const inputfieldsCreateTodo =  document.querySelectorAll('.create-form > input');
const btnSaveTodo = document.querySelector(".js-update");

const inputTodoTitle = document.querySelector("#create-form__title");
const inputTodoDescription = document.querySelector("#create-form__description");
const inputTodoImportance = document.querySelector("input[name='importance']:checked");
const inputTodoDueDate = document.querySelector("#create-form__due-date");

const listRenderer = Handlebars.compile(document.querySelector("#list-template").innerHTML);



btnSaveTodo.addEventListener("click", async event => {
    event.preventDefault();
    const inputTodoImportance = document.querySelector("input[name='importance']:checked");

    await todoService.createTodo(
        inputTodoTitle.value,
        inputTodoDescription.value,
        inputTodoImportance.value,
        inputTodoDueDate.value
    );

    renderTodoList();

    for (var inputField of inputfieldsCreateTodo){
        inputField.value = '';
    }
});

async function renderTodoList() {
    listContainer.innerHTML = listRenderer({todos: await todoService.getTodos()});
}

async function renderCreateView(todoId) {
    const todoData = await todoService.getTodo(todoId);

    inputTodoTitle.value = todoData.title;
    inputTodoDescription.value = todoData.description;
    inputTodoImportance.value = todoData.importance;
    inputTodoDueDate.value = todoData.dueDate;
}

listContainer.addEventListener("click", async function (event) {
    if(event.target.classList.contains("js-delete")){

        await todoService.deleteTodo(event.target.dataset.id);
        await renderTodoList()

    }
    if(event.target.classList.contains("js-update")){

        await renderCreateView(event.target.dataset.id);

    }
});

renderTodoList();