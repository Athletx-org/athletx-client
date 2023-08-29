import axios from 'axios'

const apiPath = '/api/v1'

const axiosInstance = axios.create({ 
    baseURL: process.env.VUE_APP_BASE_URL + apiPath,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
      }
  });

export default axiosInstance    
