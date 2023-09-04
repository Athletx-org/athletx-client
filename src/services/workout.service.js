import axiosInstance from '@/utils/axios'
import authHeader from "@/services/auth-header";

class WorkoutService {

    getWorkouts(userId) {
        return axiosInstance.get("/" + userId + "/workouts", {headers: authHeader() })
    }
}

export default new WorkoutService();
