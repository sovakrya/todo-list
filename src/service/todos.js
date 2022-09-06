// const TODOS_KEY = "todos";
// const ID_COUNTER_KEY = "idCounter";

// let todos = [];

// const _todos = localStorage.getItem(TODOS_KEY);

// if (_todos) {
//   todos = JSON.parse(_todos);
// }

// let idCounter = 1;

// const _idCounter = localStorage.getItem(ID_COUNTER_KEY);

// if (_idCounter) {
//   idCounter = JSON.parse(_idCounter);
// }

// const saveTodos = () => {
//   localStorage.setItem(TODOS_KEY, JSON.stringify(todos));
// };

// const saveIdCounter = () => {
//   localStorage.setItem(ID_COUNTER_KEY, JSON.stringify(idCounter));
// };

export async function getTodos() {
  const response = await fetch("/api/todo");

  const result = await response.json();

  return result;

  // 1.
  // return  fetch("/api/todo").then((response) => response.json())

  // 2.
  // const response = await fetch("/api/todo");

  // return response.json();
}

export async function addTodo({ title, finishAt = null }) {
  const response = await fetch("/api/todo", {
    headers: {
      "content-type": "application/json",
    },

    method: "PUT",

    body: JSON.stringify({ title, finishAt: Math.floor(finishAt / 1000) }),
  });

  const todo = await response.json();

  return todo;
}

export async function deleteTodo(id) {
  const response = await fetch("/api/todo", {
    headers: {
      "content-type": "application/json",
    },

    method: "DELETE",

    body: JSON.stringify({ id }),
  });

  const deletedTodo = await response.json();

  return deletedTodo;
}

export async function updateTodo(id, { isComplete, name }) {
  const todo = todos.find((todo) => {
    return todo.id === id;
  });

  if (isComplete !== undefined) {
    todo.isComplete = isComplete;
  }

  if (name) {
    todo.name = name;
  }

  saveTodos();

  return todo;
}
