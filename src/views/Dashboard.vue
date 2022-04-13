<template>
  <div class="home">
    <h2> Welcome to Dashboard </h2>
    <div class="row">
      <div class="col-md-12">
        <p>hello</p>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import TodoService from '@/services/TodoService';

export default {
  name: 'Dashboard',
  components: {},
  data() {
    return {
      todos: []
    }
  },
  mounted() {
    TodoService.getTodos().then(response => {
      console.log('dash-response: ', response);
      this.todos = response;
    });
  },
}
</script>
