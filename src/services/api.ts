import axios from 'axios';
import { BASE_URL } from '../config/env';

axios.interceptors.response.use((response) => {
    console.log(response.data);
    return response;
});

const api = axios.create({
    baseURL: BASE_URL,
});

export default api;
