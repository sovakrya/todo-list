<template>
  <div class="main-box">
    <TodoHeader style="width: 450px" @todo:added="fetchTodos" />

    <TodoList ref="todoList" style="width: 450px" />
  </div>
</template>

<script>
import { defineComponent } from "vue";
import TodoHeader from "./components/TodoHeader.vue";
import TodoList from "./components/TodoList.vue";

export default defineComponent({
  components: { TodoHeader, TodoList },

  methods: {
    fetchTodos() {
      if (!this.$refs.todoList) return;

      this.$refs.todoList.fetchTodos();
    },
  },
});
</script>

<style>
.main-box {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1em 0px;
}

.cool-border {
  border-radius: 7px;
  box-shadow: 0px 1px 2px 0px rgba(104, 235, 235, 0.89),
    1px 2px 4px 0px rgb(243, 105, 128),
    2px 4px 8px 0px rgba(104, 235, 235, 0.89),
    2px 4px 16px 0px rgba(221, 155, 238, 0.966);
}
</style>
