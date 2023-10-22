import axios from 'axios';
import { BASE_URL } from '../config/env';
import { getAuthTokenInStorage } from '../Storage/getAuthToken';



const api = axios.create({
    baseURL: BASE_URL,
});

api.interceptors.request.use((request) => {
    const token = getAuthTokenInStorage()
  
    if (token) {
        request.headers.Authorization = `Bearer ${token}`;
    }
    return request;
});

export default api;
