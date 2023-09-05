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

    async createWorkout(userId, workout) {
        const response = await axiosInstance.post("/" + userId + "/workouts", workout, {headers: authHeader()})
        return response
    }

    async getDefaultExercise(){
        const response = await axiosInstance.get("/exercises", {headers: authHeader()})
        return response.data
    }
}

export default new WorkoutService();
