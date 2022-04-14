<template>
  <div class="todo-box">
    <div class="row" style="align-items: center">
      <div class="col-md-8 col-sm-8 col-xs-12 todo-line">
        <div class="done-box">
          <input type="checkbox" class="form-check-input" v-model="todo.isDone" disabled>
        </div>
        <div v-if="isEditing" class="editible">
          <form>
            <input 
              width="100%"
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
      <div class="col-md-4 col-sm-4 col-xs-4">
        <div class="row toto-actions">
          <div v-if="!todo.isDone" class="actions" @click="setDeadline" title="Set deadline">
            <b-icon icon="calendar2-event" variant="warning"></b-icon>
          </div>
          <div v-if="!todo.isDone" class="actions" @click="markDone" title="Mark done">
            <b-icon icon="check" variant="success"></b-icon>
          </div>
          <div class="actions" @click="deleteTodo" title="Delete todo">
            <b-icon icon="trash-fill" variant="danger" aria-hidden="true"></b-icon>
          </div>
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
      isEditing: false,
      editingTodoDescription: '',
    };
  },
  methods: {
    markDone() {
      this.todo.isDone = true;
      this.updateTodo();
    },
    deleteTodo() {
      console.log('delete-todo...');
      this.$emit('delete-todo', this.todo.id);
    },
    updateTodo() {
      this.$validator.validateAll().then(result => {
        if (result) {
          this.$emit('updateTodo', this.todo);
          console.log('valid description...', this.todo);
        }
        else {
          this.todo.description = this.editingTodoDescription;
          console.log('invalid description...');
        }
      })
      .catch(err => {
        console.log('updating error: ', err);
        this.todo.description = this.editingTodoDescription;
      })
      .finally(() => {
        this.isEditing = false;
      });
    },
    editTodo() {
      if (!this.todo.isDone) {
        this.isEditing = true;
        this.editingTodoDescription = this.todo.description;
       
       // ensures that the v-dom has been updated before focusing the input
        this.$nextTick(() => {
          this.$refs.description.focus();
        });
      }

    },
    setDeadline() {
      console.log('set alarm...');
      this.$emit('setDeadline', this.todo.id);
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

  .actions {
    width: auto;
  }

  .actions:hover {
    cursor: pointer;
    background-color: cadetblue;
  }

  .editible {
    width: 100%;
  }

</style>