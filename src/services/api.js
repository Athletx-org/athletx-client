import axios from 'axios'

const apiPath = '/api/v1'

const apiClient = axios.create({
    baseURL: process.env.VUE_APP_BASE_URL + apiPath, 
    timeout: 10000,
  });

export default {

    provaGet() {
        return apiClient.get('/prova')
    }

}