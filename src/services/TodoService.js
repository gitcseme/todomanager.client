import TodoApi from "@/api/TodoApi";

export default { 
    getTodos() { 
        return TodoApi.getTodos();
    }
}