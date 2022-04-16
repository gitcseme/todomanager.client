import Axios from 'axios';

const root_api = 'https://localhost:7288';
const account_api = root_api + '/api/v1/account';

export default {
    signin(data) {
        return new Promise((resolve, reject) => {
            Axios.post(account_api + '/signin', data)
            .then(response => {
                console.log('login-res', response);
                resolve(response.data);
            })
            .catch(error => reject(error));
        });
    },
    getUserInfo() {
        return new Promise((resolve, reject) => {
            Axios.get(account_api + '/userinfo')
            .then(response => resolve(response.data))
            .catch(error => reject(error));
        });
    },
    signout() {
        return new Promise((resolve, reject) => {
            Axios.post(account_api + '/signout')
            .then(response => resolve(response.data))
            .catch(error => reject(error));
        });
    },
    signup(data) {
        return new Promise((resolve, reject) => {
            Axios.post(account_api + '/signup', data)
            .then(response => resolve(response.data))
            .catch(error => reject(error));
        });
    }
}