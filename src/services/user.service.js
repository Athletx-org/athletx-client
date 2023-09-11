import axiosInstance from '@/utils/axios';
import authHeader from './auth-header';

class UserService{
    getUserInfo(userId){
        return axiosInstance.get("/users/info/"+userId, {headers: authHeader() })
            .then(response => {
                return response.data
            })
    }
}

export default new UserService(); 
