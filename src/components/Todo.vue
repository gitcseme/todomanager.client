<template>
  <div class="todo-box">
    <div class="row" style="align-items: center">
      <div class="col-md-9 col-sm-9 col-xs-12 todo-line">
        <div class="done-box">
          <input type="checkbox" class="form-check-input" v-model="todo.isDone" disabled>
        </div>
        <div v-if="isEditing" class="editible">
          <form>
            <textarea 
              width="100%"
              ref="description"
              type="text" 
              class="form-control" 
              v-model="todo.description" 
              @blur="updateTodo"
              data-vv-name="description"
              data-vv-as="Description"
              v-validate="'required|max:255'"
            />
          </form>
        </div>
        <div 
          v-if="!isEditing" 
          @click="editTodo" 
          class="description"
          v-b-tooltip.hover
          :title="todo.isDone ? 'Can\'t edit completed todo' : 'Click to edit in place'"
        >
          {{ todo.description }}
        </div>
      </div>
      <div class="col-md-3 col-sm-3 col-xs-4">
        <div class="row toto-actions">
          <div 
            v-if="!todo.isDone" 
            class="actions" 
            @click="openDeadlinePicker = !openDeadlinePicker" 
            v-b-tooltip.hover
            :title="todo.deadline ? 'Open deadline' : 'Set deadline'">
            <b-icon icon="calendar2-event" :variant="todo.deadline ? 'success':'warning'"></b-icon>
          </div>
          <div v-if="!todo.isDone" class="actions" @click="markDone" v-b-tooltip.hover title="Mark done">
            <b-icon icon="check-circle" variant="success"></b-icon>
          </div>
          <div class="actions" @click="deleteTodo" v-b-tooltip.hover title="Delete todo">
            <b-icon icon="trash-fill" variant="danger" aria-hidden="true"></b-icon>
          </div>
        </div>
      </div>
    </div>
    <div v-if="openDeadlinePicker" class="row mt-2">
      <template v-if="todo.deadline == null">
        <div class="col-md-6">
          <b-form-datepicker 
            width="40%"
            id="example-datepicker" 
            :date-format-options="{ year: 'numeric', month: 'numeric', day: 'numeric' }"
            v-model="deadline" 
            class="mb-1"
          ></b-form-datepicker>
        </div>
        <div class="col">
          <b-button 
            :disabled="deadline == ''" 
            variant="primary" 
            @click="setDeadline"
          >
            Set deadline
          </b-button>
        </div>
      </template>
      <div v-else class="col">
        <small style="color: gray"><span class="text-danger">Deadline:</span> {{ todo.deadline }}</small>
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
      openDeadlinePicker: false,
      deadline: '',
    };
  },
  methods: {
    markDone() {
      this.todo.isDone = true;
      this.updateTodo();
    },
    deleteTodo() {
      console.log('delete-todo...');
      this.$emit('deleteTodo', this.todo);
    },
    updateTodo() {
      this.$validator.validateAll().then(result => {
        if (result) {
          this.$emit('updateTodo', this.todo);
          this.openDeadlinePicker = false;
        }
        else {
          this.todo.description = this.editingTodoDescription;
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
      let time = Date.parse(this.deadline);
      this.todo.deadline = time;
      this.updateTodo();
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
  }

  .editible {
    width: 100%;
  }

</style>