"use strict";

const todoKeys = {
  id: "id",
  text: "text",
  is_completed: "is_completed",
};

const todos = [];
const createTodo = (array, text) => {
  let maxId = 0;
  if (array.length === 0) {
    maxId = 0;
  } else {
    maxId = Math.max(
      ...array.map(function (element) {
        return element[todoKeys.id];
      }),
    );
  }
  const newTask = {
    [todoKeys.id]: maxId + 1,
    [todoKeys.text]: text,
    [todoKeys.is_completed]: false,
  };
  array.push(newTask);
  return newTask;
};
const completeTodoById = (todos, id) => {
  const todosFindedTask = todos.find(function (element) {
    return element[todoKeys.id] === id;
  });
  if (todosFindedTask !== undefined) {
    todosFindedTask[todoKeys.is_completed] = !todosFindedTask[todoKeys.is_completed];
  } else {
    console.error(`Todo Id not found: ${id}`);
    return null;
  }
  return todosFindedTask;
};
const deleteTodoById = (todos, todoId) => {
  for (let i = 0; i < todos.length; ++i) {
    let task = todos[i];
    if (task[todoKeys.id] === todoId) {
      todos.splice(
        0,
        todos.length,
        ...todos.filter(function (element) {
          return element[todoKeys.id] !== todoId;
        }),
      );
      return todos;
    }
  }
  console.error(`ID not found: ${todoId}`);
};
const editTodoById = (todos, editedText, todoId) => {
  const obj = todos.find(function (element) {
    return element[todoKeys.id] === todoId;
  });
  if (obj) {
    obj.text = editedText;
    return obj;
  }
  console.error(`Todo Id not found: ${todoId}`);
};
createTodo(todos, "Любить");
createTodo(todos, "Играть");
createTodo(todos, "Бегать");
createTodo(todos, "Учиться");

completeTodoById(todos, 2);
deleteTodoById(todos, 3);

editTodoById(todos, "Отжиматься", 1);
