import Axios from 'axios';

Axios.defaults.withCredentials = true;
Axios.defaults.headers.common['Access-Control-Allow-Origin'] = 'http://localhost:8080';
