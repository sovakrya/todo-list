const TODOS_KEY = "todos";
const ID_COUNTER_KEY = "idCounter";

let todos = [];

const _todos = localStorage.getItem(TODOS_KEY);

if (_todos) {
  todos = JSON.parse(_todos);
}

let idCounter = 1;

const _idCounter = localStorage.getItem(ID_COUNTER_KEY);

if (_idCounter) {
  idCounter = JSON.parse(_idCounter);
}

const saveTodos = () => {
  localStorage.setItem(TODOS_KEY, JSON.stringify(todos));
};

const saveIdCounter = () => {
  localStorage.setItem(ID_COUNTER_KEY, JSON.stringify(idCounter));
};

export async function getTodos() {
  return structuredClone(todos);
}

export async function addTodo({ name, completeAt = null }) {
  const todo = {
    createdAt: new Date().getTime(),
    id: idCounter++,
    isCompleted: false,
    name,
    completeAt,
  };

  todos.push(todo);

  saveTodos();
  saveIdCounter();

  return todo;
}

export async function deleteTodo(id) {
  const index = todos.findIndex((todo) => {
    return todo.id === id;
  });
  const [deletedTodo] = todos.splice(index, 1);

  saveTodos();

  return deletedTodo;
}

export async function updateTodo(id, { isCompleted, name }) {
  const todo = todos.find((todo) => {
    return todo.id === id;
  });

  if (isCompleted !== undefined) {
    todo.isCompleted = isCompleted;
  }

  if (name) {
    todo.name = name;
  }

  saveTodos();

  return todo;
}
