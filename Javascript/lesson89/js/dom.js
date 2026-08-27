const form = document.querySelector(".form");
const input = document.querySelector(".input");
const todosList = document.querySelector(".todos");

import { todoKeys } from "./constants.js";
import { createTodo, completeTodoById, deleteTodoById } from "./service.js";
import { setTodosToLocalStorage } from "./storage.js";

export function renderTodos(todos) {
  todos.forEach((element) => {
    const todoElement = createTodoElement(element);
    if (element[todoKeys.is_completed]) {
      todoElement.classList.add("completed");
    }
    todosList.append(todoElement);
  });
}
function createTodoElement(todos) {
  const todo = document.createElement("li");
  todo.classList.add("todo");
  // todo.id = todos[todoKeys.id];
  todo.dataset.id = todos[todoKeys.id];
  todo.innerHTML = `<div class="todo-text">${todos[todoKeys.text]}</div>
          <div class="todo-actions">
            <button class="button-complete button">&#10004;</button>
            <button class="button-delete button">&#10006;</button>
          </div>`;

  return todo;
}
function handleCreateTodo(todos, text) {
  const todo = createTodo(todos, text);
  const todoElement = createTodoElement(todo);
  todosList.prepend(todoElement);
  setTodosToLocalStorage(todos);
}

export const initTodoHandlers = (todos) => {
  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const text = input.value.trim();

    if (text == "") {
      return;
    }
    handleCreateTodo(todos, text);

    input.value = "";
  });
  todosList.addEventListener("click", (event) => {
    if (event.target.tagName === "BUTTON") {
      const task = event.target.closest(".todo");
      const taskId = task.dataset.id;
      if (event.target.classList.contains("button-complete")) {
        task.classList.toggle("completed");
        completeTodoById(todos, Number(taskId));
      } else if (event.target.classList.contains("button-delete")) {
        task.remove();
        deleteTodoById(todos, Number(taskId));
      }
      setTodosToLocalStorage(todos);
    }
  });
};
