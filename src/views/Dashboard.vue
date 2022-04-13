<template>
  <div class="home">
    <div class="row">
      <div class="col-md-12">
        <nav>
          <b-button variant="primary" @click="showModal = true">
            Add Todo
          </b-button>
        </nav>
      </div>
    </div>
    <h2> Welcome to Dashboard </h2>
    <div class="row">
      <div class="col-md-12">
        <ul class="todo-list">
          <li v-for="todo in todos" :key="todo.id">
            <Todo :todo="todo" @updateTodo="updateTodo" />
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
  }
}
</script>
