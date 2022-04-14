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

    <!-- Search -->
    <div class="row">
      <div class="col-md-8">
        <b-form @submit.prevent="onSearchTodos" class="search-tools">
          <input 
            type="text"
            class="form-control"
            placeholder="Search..."
            v-model="searchText"
            data-vv-name="searchText"
            data-vv-as="Search"
            v-validate="'required|max:255'"
          />
          <button class="btn">
            <b-icon icon="search"></b-icon>
          </button>
        </b-form>
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
      searchText: '',
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
    },
    onSearchTodos() {
      this.$validator.validateAll().then(result => {
        if (result) {
          TodoService.searchTodos(this.searchText).then(response => {
            this.todos = response;
          });
        }
        else {
          console.log('invalid search...');
        }
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

.search-tools {
  margin-left: 15px;
  width: 100%;
  display: flex;
  justify-content: space-between;
}

</style>