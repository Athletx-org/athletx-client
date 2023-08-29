import axiosInstance from '@/utils/axios';
class AuthService{
    login(user){
        return axiosInstance.post("/auth/loginAthlete", user)
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
        return axiosInstance.post("/auth/logoutAthlete", user)
            .then(() => {
                localStorage.removeItem('user');
            })
    }

    register(user){
        return axiosInstance.post("/auth/registerAthlete", user)
    }
}

export default new AuthService(); 
