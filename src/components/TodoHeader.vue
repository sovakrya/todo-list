<template>
  <div class="cool-border">
    <h1 class="heading">Мой список задач</h1>
    <div class="todo-header">
      <input
        v-model="todoText"
        class="todo-name-input"
        placeholder="Например: погладить кота"
      />

      <input v-model="completedAt" type="date" />

      <button @click="addTodo">
        <IconPlus class="button-plus"></IconPlus>
      </button>
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import IconPlus from "./IconPlus.vue";
import { addTodo } from "@/service/todos";

export default defineComponent({
  components: { IconPlus },
  emits: ["todo:added"],
  data() {
    return {
      todoText: "",
      completedAt: null,
    };
  },

  methods: {
    addTodo() {
      if (!this.todoText) return;

      addTodo({
        title: this.todoText,
        finishAt: new Date(this.completedAt).getTime(),
      })
        .then((todo) => {
          console.log("новое туду", todo);

          this.$emit("todo:added", todo);

          this.todoText = "";
          this.completedAt = null;
        })
        .catch((error) => {
          console.error(error);
        });
    },
  },
});
</script>

<style>
.heading {
  text-align: center;
}

.todo-header {
  display: flex;
  padding: 7px;
  gap: 0.5em;
}

.todo-name-input {
  flex-grow: 1;
}

.button-plus {
  width: 1.5em;
  height: 1.5em;
}
</style>
