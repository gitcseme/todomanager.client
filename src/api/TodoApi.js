import Axios from 'axios';

const root_api = 'https://localhost:7288';
const todo_api = root_api + '/api/v1/todos';

export default {
    getTodos() {
        return new Promise((resolve, reject) => {
            Axios.get(todo_api)
            .then(response => {
                resolve(response.data);
            })
            .catch(error => reject(error));
        });
    },
    createTodo(description) {
        return new Promise((resolve, reject) => {
            Axios.post(todo_api, { description })
            .then(response => resolve(response.data))
            .catch(error => reject(error));
        });
    },
    updateTodo(todo) {
        console.log('api: ', todo);
        return new Promise((resolve, reject) => {
            Axios.put(todo_api + '/' + todo.id, 
            {
                description: todo.description,
                isDone: todo.isDone
            })
            .then(response => resolve(response.data))
            .catch(error => reject(error));
        });
    }
}