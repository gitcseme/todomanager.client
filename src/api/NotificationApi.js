import Axios from 'axios';

const root_api = 'https://localhost:7288';
const notification_api = root_api + '/api/v1/notifications';

export default {
    getNotifications() {
        return new Promise((resolve, reject) => {
            Axios.get(notification_api)
            .then(response => {
                resolve(response.data);
            })
            .catch(error => reject(error));
        });
    }
}