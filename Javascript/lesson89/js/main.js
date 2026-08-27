import { getTodosFromLocalStorage } from "./storage.js";
import { renderTodos, initTodoHandlers } from "./dom.js";

let todos = [];
getTodosFromLocalStorage(todos);
// При помощи метода querySelector получаем элементы .form, .input и .todos
// Создаем функцию createTodoElement(text), которая будет создавать todo в виде разметки
// Создаем функцию handleCreateTodo(todos, text), которая будет вызывать createTodo и createTodoElement
document.addEventListener("DOMContentLoaded", () => {
  renderTodos(todos);
  initTodoHandlers(todos);
});
