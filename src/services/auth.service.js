import axiosInstance from '@/utils/axios';
class AuthService{
    login(user){
        return axiosInstance.post("/auth/login", user)
            .then(response => {
                const user = response.data.user
                if (user) {
                    localStorage.setItem('user', JSON.stringify(user));
                }
            return user;
          });
    }

    logout(){
        const user = localStorage.getItem("user")
        return axiosInstance.post("/auth/logout", user)
            .then(() => {
                localStorage.removeItem('user');
            })
    }

    signup(user){
        return axiosInstance.post("/auth/signup", user)
    }
}

export default new AuthService(); 
