import { todoKeys, errTodoNotFound } from "./constants.js";
const getNewTodoId = (todos) => {
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
export const createTodo = (todos, text) => {
  const newTodo = {
    [todoKeys.id]: getNewTodoId(todos),
    [todoKeys.text]: text,
    [todoKeys.is_completed]: false,
  };
  todos.push(newTodo);
  return newTodo;
};

export const completeTodoById = (todos, todoId) => {
  const todo = todos.find((todo) => todo[todoKeys.id] === todoId);

  if (!todo) {
    console.error(errTodoNotFound(todoId));
    return null;
  }
  todo[todoKeys.is_completed] = !todo[todoKeys.is_completed];
  return todo;
};

export const deleteTodoById = (todos, todoId) => {
  const todoIndex = todos.findIndex((todo) => todo[todoKeys.id] === todoId);
  if (todoIndex === -1) {
    console.error(errTodoNotFound(todoId));
    return todos;
  }
  todos.splice(todoIndex, 1);
  return todos;
};
