import axiosInstance from '@/utils/axios';
class AuthService{
    async login(user){
        const response = await axiosInstance.post("/auth/login", user);
        const usr = response.data.user;
        if (usr) {
            localStorage.setItem('user', JSON.stringify(usr));
        }
        return usr;
    }

    async logout(){
        const user = localStorage.getItem("user")
        await axiosInstance.post("/auth/logout", user);
        localStorage.removeItem('user');
    }

    signup(user){
        return axiosInstance.post("/auth/signup", user)
    }
}

export default new AuthService(); 
