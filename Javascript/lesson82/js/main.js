"use strict";

const todoKeys = {
  id: "id",
  text: "text",
  is_completed: "is_completed",
};

const todos = [];

const errTodoNotFound = (todoId) => `Todo with id ${todoId} not found`;

const getMaxId = (todos) => todos.reduce((maxId, todo) => Math.max(maxId, todo[todoKeys.id]), 0);
const getNewTodoId = () => {
  // if (maxId === 0) {
  //   return 1;
  // }
  // for (let i = 1; i <= maxId + 1; ++i) {
  //   for (let j = 0; j < todos.length; ++j) {
  //     let element = todos[j];
  //     if (i === element[todoKeys.id]) {
  //       break;
  //     } else if (j === todos.length - 1) {
  //       return i;
  //     }
  //   }
  // }
  let id = 1;
  while (
    todos.some((element) => {
      return element[todoKeys.id] === id;
    })
  ) {
    id++;
  }
  return id;
};
const createTodo = (todos, text) => {
  const newTodo = {
    [todoKeys.id]: getNewTodoId(),
    [todoKeys.text]: text,
    [todoKeys.is_completed]: false,
  };
  todos.push(newTodo);
  return newTodo;
};

const completeTodoById = (todos, todoId) => {
  const todo = todos.find((todo) => todo[todoKeys.id] === todoId);

  if (!todo) {
    console.error(errTodoNotFound(todoId));
    return null;
  }
  todo[todoKeys.is_completed] = !todo[todoKeys.is_completed];
  return todo;
};

const deleteTodoById = (todos, todoId) => {
  const todoIndex = todos.findIndex((todo) => todo[todoKeys.id] === todoId);
  if (todoIndex === -1) {
    console.error(errTodoNotFound(todoId));
    return todos;
  }
  todos.splice(todoIndex, 1);
  return todos;
};

// При помощи метода querySelector получаем элементы .form, .input и .todos
// Создаем функцию createTodoElement(text), которая будет создавать todo в виде разметки
// Создаем функцию handleCreateTodo(todos, text), которая будет вызывать createTodo и createTodoElement
const form = document.querySelector(".form");
const input = document.querySelector(".input");
const todosList = document.querySelector(".todos");
const buttonSubmit = document.querySelector(".button-create");

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
}

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
  }
});
