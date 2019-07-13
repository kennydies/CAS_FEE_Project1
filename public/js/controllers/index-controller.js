import { todoService } from '../services/todo-service.js';

const listRenderer = Handlebars.compile(document.querySelector("#list-template").innerHTML);
const listContainer = document.querySelector("#list-container");
const inputfieldsCreateTodo =  document.querySelectorAll('.create-form > input');
const btnToggleTheme = document.querySelector(".js-toggle-theme");
const btnToggleDone = document.querySelector(".js-toggle-done");
const btnSaveTodo = document.querySelector(".js-update");
const btnCreateNewTodo = document.querySelector(".js-create-new-todo");

const inputTodoTitle = document.querySelector("#create-form__title");
const inputTodoDescription = document.querySelector("#create-form__description");
const inputTodoImportanceValue = document.querySelector("input[name='importance']:checked");
const inputTodoDueDate = document.querySelector("#create-form__due-date");


function wipeInputFields(){
    for (var inputField of inputfieldsCreateTodo){
        inputField.value = '';
    }
    document.getElementById("create-form__importance-1").checked = true;
}

async function saveTodo(event){
    event.preventDefault();
    const inputTodoImportance = document.querySelector("input[name='importance']:checked");

    await todoService.createTodo(
        inputTodoTitle.value,
        inputTodoDescription.value,
        inputTodoImportance.value,
        inputTodoDueDate.value
    );

    renderTodoList();
    wipeInputFields();
}

async function updateTodo(event){
    event.preventDefault();
    const inputTodoImportance = document.querySelector("input[name='importance']:checked");

    await todoService.updateTodo(
        event.target.dataset.id,
        inputTodoTitle.value,
        inputTodoDescription.value,
        inputTodoImportance.value,
        inputTodoDueDate.value
    );

    renderTodoList();
    wipeInputFields();
}

btnCreateNewTodo.addEventListener("click", async event => {
    event.preventDefault();
    renderCreateView();
});

btnToggleTheme.addEventListener("click", async event => {
    event.preventDefault();
    document.querySelector('html').classList.toggle('alt-style');
});

listContainer.addEventListener("click", async function (event) {
    if(event.target.classList.contains("js-delete")){

        await todoService.deleteTodo(event.target.dataset.id);
        await renderTodoList();
    }
    if(event.target.classList.contains("js-update")){

        await renderCreateView(event.target.dataset.id);
    }
    if(event.target.classList.contains("js-switch-state")){

        let done = event.target.checked;

        await todoService.switchStateTodo(event.target.dataset.id, done);
        await renderTodoList();
    }
});

async function renderCreateView(todoId) {

    btnSaveTodo.removeEventListener("click", updateTodo);
    btnSaveTodo.removeEventListener("click", saveTodo);

    if (todoId){
        const todoData = await todoService.getTodo(todoId);

        inputTodoTitle.value = todoData.title;
        inputTodoDescription.value = todoData.description;
        inputTodoImportanceValue.value = todoData.importance;
        inputTodoDueDate.value = moment(todoData.dueDate).format('YYYY-MM-DD');

        let selectedRadio = document.getElementById(`create-form__importance-${todoData.importance}`);
        selectedRadio.checked = true;

        btnSaveTodo.addEventListener("click", updateTodo);
        btnSaveTodo.setAttribute('data-id', todoId);
    } else {
        wipeInputFields();
        btnSaveTodo.addEventListener("click", saveTodo);
        btnSaveTodo.removeAttribute('data-id');
    }

    inputTodoTitle.setAttribute("required", "");
}

async function renderTodoList() {
    listContainer.innerHTML = listRenderer({todos: await todoService.getTodos()});
}

renderTodoList();