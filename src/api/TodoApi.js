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
        })
    }
}