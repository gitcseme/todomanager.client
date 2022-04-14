<template>
  <div class="todo-box">
    <div class="row" style="align-items: center">
      <div class="col-md-8 col-sm-8 col-xs-8 todo-line">
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
      <div class="col-md-4 col-sm-4 col-xs-4">
        <div class="row toto-actions">
          <!-- <button class="btn btn-outline-warning" @click="setAlarm">
            <b-icon icon="bell-fill"></b-icon>
          </button>
          <button class="btn btn-primary" @click="markDone">
            <b-icon icon="check"></b-icon>
          </button>
          <button class="btn btn-danger" @click="deleteTodo">
            <b-icon icon="trash-fill" aria-hidden="true"></b-icon>
          </button> -->
          <div class="actions" @click="setAlarm">
            <b-icon icon="bell-fill" variant="warning"></b-icon>
          </div>
          <div class="actions" @click="markDone">
            <b-icon icon="check" variant="success"></b-icon>
          </div>
          <div class="actions" @click="deleteTodo">
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
      isEditing: false
    };
  },
  methods: {
    markDone() {
      console.log('mark-done...');
      this.$emit('markDone', this.todo.id);
    },
    deleteTodo() {
      console.log('delete-todo...');
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
    },
    setAlarm() {
      console.log('set alarm...');
      this.$emit('setAlarm', this.todo.id);
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

</style>