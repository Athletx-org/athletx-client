import axiosInstance from '@/utils/axios';
import authHeader from './auth-header';

class UserService{
    getUserInfo(){
        return axiosInstance.get("/auth/userInfo", {headers: authHeader() })
    }
}

export default new UserService(); 
