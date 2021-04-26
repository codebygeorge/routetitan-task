import axios from 'axios';
import { BASE_API_URL } from 'constants/env-variables';


const axiosInstance = axios.create({
    baseURL: BASE_API_URL,
    timeout: 20000
});


export default axiosInstance;