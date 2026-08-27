export function getTodosFromLocalStorage(todos) {
  todos.splice(0, todos.length, ...(JSON.parse(localStorage.getItem("todos")) || []));
}
export function setTodosToLocalStorage(todos) {
  localStorage.setItem("todos", JSON.stringify(todos));
}
