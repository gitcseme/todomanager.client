<template>
  <div class="home">
    <div class="row header">
      <div class="col-md-12 nav-bar">
        <div>
          <h2> Todo Dashboard </h2>
        </div>
        <div>
          <b-button variant="primary" @click="showModal = true">
            Add Todo
          </b-button>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-md-12">
        <ul class="todo-list">
          <li v-for="todo in todos" :key="todo.id">
            <Todo 
              :todo="todo" 
              @updateTodo="updateTodo" 
              @deleteTodo="deleteTodo"
            />
          </li>
        </ul>
      </div>
    </div>
    <todo-create-modal v-model="showModal" @createTodo="onCreateTodo"/>
  </div>
</template>

<script>
// @ is an alias to /src
import TodoService from '@/services/TodoService';
import Todo from '@/components/Todo';
import TodoCreateModal from '@/components/modals/TodoCreateModal.vue';

export default {
  name: 'Dashboard',
  components: { TodoCreateModal, Todo },
  data() {
    return {
      todos: [],
      showModal: false,
    }
  },
  mounted() {
    this.loadTodos();
  },
  methods: {
    onCreateTodo(description) {
      TodoService.createTodo(description).then(response => {
        this.loadTodos();
      })
      .catch(err => {
        console.log('error: ', err);
      });
    },
    loadTodos() {
      TodoService.getTodos().then(response => {
        this.todos = response;
      });
    },
    updateTodo(todo) {
      console.log('update todo: ', todo);
      TodoService.updateTodo(todo).then(response => {
        this.loadTodos();
      })
      .catch(err => {
        console.log('update error: ', err);
      });
    },
    deleteTodo(todo) {
      console.log('delete todo: ', todo);
      TodoService.deleteTodo(todo).then(response => {
        this.loadTodos();
      })
      .catch(err => {
        console.log('delete error: ', err);
      });
    }
  }
}
</script>

<style>
.todo-list {
  list-style: none;
  padding: 5px;
}

.todo-list li {
  margin: 10px;
  padding: 10px;
  background-color: #ededed;
  border-radius: 5px;
}

.col-md-12.nav-bar {
  display: flex;
  justify-content: space-between;
}

.header {
  padding: 10px 0px;
}

.row.toto-actions {
  display: flex;
}

.actions {
  width: auto !important;
}

</style>