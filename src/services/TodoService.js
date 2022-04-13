import TodoApi from "@/api/TodoApi";

export default { 
    getTodos() { 
        return TodoApi.getTodos();
    },
    createTodo(description) {
        return TodoApi.createTodo(description);
    },
    updateTodo(todo) {
        return TodoApi.updateTodo(todo);
    }
}