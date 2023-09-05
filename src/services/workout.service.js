import axiosInstance from '@/utils/axios'
import authHeader from "@/services/auth-header";

class WorkoutService {

    getWorkouts(userId) {
        return axiosInstance.get("/" + userId + "/workouts", {headers: authHeader()})
            .then(response => {
                return response.data
            })
    }
    getCurrentWorkout(userId) {
        return axiosInstance.get("/" + userId + "/workouts/current", {headers: authHeader()})
    }

    deleteWorkout(userId, workoutId) {
        return axiosInstance.delete("/" + userId + "/workouts/" + workoutId, {headers: authHeader()})
    }
}

export default new WorkoutService();
