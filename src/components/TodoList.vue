<template>
  <div>
    <TodoItem
      v-for="todo in todos"
      :key="todo.id"
      :todo="todo"
      @delete="deleteTodo(todo.id)"
      @complete="completeTodo($event, todo.id)"
      @update:name="updateTodo($event, todo.id)"
    />
  </div>
</template>

<script>
import { defineComponent } from "vue";
import { deleteTodo, getTodos, updateTodo } from "@/service/todos";
import TodoItem from "./TodoItem.vue";

export default defineComponent({
  components: { TodoItem },

  expose: ["fetchTodos"],

  data() {
    return {
      todos: [],
    };
  },

  mounted() {
    this.fetchTodos();
  },

  methods: {
    fetchTodos() {
      getTodos()
        .then((todos) => {
          this.todos = todos;
        })
        .catch((error) => {
          console.error(error.massage);
        });
    },

    deleteTodo(id) {
      deleteTodo(id)
        .then((deletedTodo) => {
          console.log("удаленное туду", deletedTodo);

          this.fetchTodos();
        })
        .catch((error) => {
          console.error(error);
        });
    },

    completeTodo(isCompleted, id) {
      updateTodo(id, { isCompleted })
        .then((todo) => {
          console.log("обновленная туду", todo);

          this.fetchTodos();
        })
        .catch((err) => {
          console.error(err);
        });
    },

    updateTodo(name, id) {
      updateTodo(id, { name })
        .then((todo) => {
          console.log("обновленное имя", todo);

          this.fetchTodos();
        })
        .catch((err) => {
          console.error(err);
        });
    },
  },
});
</script>

<style></style>
