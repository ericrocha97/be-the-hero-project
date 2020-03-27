import axios from 'axios';

const api = axios.create({
    baseURL: 'https://be-the-hero-backend-node-api.herokuapp.com/'
});

export default api;