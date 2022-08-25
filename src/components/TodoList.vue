<template>
  <div>
    <TodoItem v-for="todo in todos" :key="todo.id" :todo="todo" />
  </div>
</template>

<script>
import { defineComponent } from "vue";
import { getTodos } from "@/service/todos";
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
  },
});
</script>

<style></style>
