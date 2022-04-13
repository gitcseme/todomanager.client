<template>
  <div class="todo-box">
    <div class="row">
      <div class="col-md-8 todo-line">
        <div class="done-box">
          <input type="checkbox" class="form-check-input" v-model="todo.IsDone" disabled>
        </div>
        <div v-if="isEditing">
          <form>
            <input 
              ref="description"
              type="text" 
              class="form-control" 
              v-model="todo.description" 
              @blur="updateTodo"
              data-vv-name="description"
              data-vv-as="Description"
              v-validate="'required|max:255'"
            >
          </form>
        </div>
        <div v-if="!isEditing" @click="editTodo" class="description">{{ todo.description }}</div>
      </div>
      <div class="col-md-4">
        <div class="row toto-actions">
          <button class="btn btn-primary" @click="markDone(todo)">Mark done</button>
          <button class="btn btn-danger" @click="deleteTodo(todo)">Delete</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Todo',
  props:{
    todo: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      isEditing: false
    };
  },
  methods: {
    markDone() {
      this.$emit('mark-done', this.todo.id);
    },
    deleteTodo() {
      this.$emit('delete-todo', this.todo.id);
    },
    updateTodo() {
      this.$validator.validateAll().then(result => {
        if (result) {
          this.$emit('updateTodo', this.todo);
          console.log('valid description...');
        }
      })
      .catch(err => {
        console.log('updating error: ', err);
      })
      .finally(() => {
        this.isEditing = false;
      });
    },
    editTodo() {
      this.isEditing = true;

      // ensures that the v-dom has been updated before focusing the input
      this.$nextTick(() => {
        this.$refs.description.focus();
      });
    }
  }
}
</script>

<style>
  .todo-line {
    display: flex;
    align-items: flex-start;
  }

  .todo-line .description {
    margin-left: 15px;
  }

  .toto-actions {
    display: flex;
    align-items: center;
    justify-content: flex-end;
  }

  .toto-actions button {
    width: auto;
  }
</style>