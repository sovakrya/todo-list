<template>
  <div
    class="cool-border todo-item-box"
    :class="{ 'todo-item-completed': todo.isCompleted }"
  >
    <div class="todo-date-container">
      <div>
        {{ new Date(todo.createdAt).toLocaleString() }}
      </div>

      <div v-if="todo.completeAt">
        {{ new Date(todo.completeAt).toLocaleString() }}
      </div>
    </div>

    <div class="todo-body">
      <input
        type="checkbox"
        class="todo-item-checkbox"
        :checked="todo.isCompleted"
      />

      <span
        v-if="!isEdit"
        class="todo-body__name"
        :class="{ 'todo-item__name-completed': todo.isCompleted }"
      >
        {{ todo.name }}
      </span>

      <input v-else class="todo-body__name" />

      <div>
        <button v-if="!isEdit" @click="editTodo">
          <IconPencil></IconPencil>
        </button>

        <button v-else @click="saveTodo">
          <IconCheckMark></IconCheckMark>
        </button>

        <button>
          <IconTrash></IconTrash>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import IconPencil from "./IconPencil.vue";
import IconCheckMark from "./IconCheckMark.vue";
import IconTrash from "./IconTrash.vue";

export default defineComponent({
  components: { IconPencil, IconCheckMark, IconTrash },

  props: {
    todo: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      isEdit: false,
    };
  },

  methods: {
    editTodo() {
      this.isEdit = true;
    },

    saveTodo() {
      this.isEdit = false;
    },
  },
});
</script>

<style>
.todo-item-box {
  display: flex;
  padding: 1em;
  gap: 1em;
  margin-top: 10px;
  flex-direction: column;
}

.todo-item-checkbox {
  width: 1.5em;
  height: 1.5em;
  cursor: pointer;
  accent-color: rgba(165, 216, 71, 0.89);
}

.todo-date-container {
  display: flex;
  justify-content: space-between;
}

.todo-body {
  display: flex;
  gap: 1em;
  align-items: center;
}

.todo-body__name {
  flex-grow: 1;
}

.todo-item-completed {
  background-color: rgb(148, 148, 150);
}

.todo-item__name-completed {
  text-decoration: line-through;
}
</style>
