import axiosInstance from '@/utils/axios'
import authHeader from "@/services/auth-header";

class WorkoutService {

    getWorkouts(userId) {
        return axiosInstance.get("/" + userId + "/workouts", {headers: authHeader()})
            .then(response => {
                return response.data
            })
    }

    getWorkout(userId, workoutId) {
        return axiosInstance.get("/" + userId + "/workouts/" + workoutId, {headers: authHeader()})
            .then(response => {
                return response.data
            })
    }

    getCurrentWorkout(userId) {
        return axiosInstance.get("/" + userId + "/workouts/info/current", {headers: authHeader()})
            .then( response => {
                return response.data
            }
        )
    }

    deleteWorkout(userId, workoutId) {
        return axiosInstance.delete("/" + userId + "/workouts/" + workoutId, {headers: authHeader()})
    }

    async setCurrentWorkout(userId, currentWorkout) {
        return await axiosInstance.post("/" + userId + "/workouts/current", currentWorkout, {headers: authHeader()})
    }

    async createWorkout(userId, workout) {
        const response = await axiosInstance.post("/" + userId + "/workouts", workout, {headers: authHeader()})
        return response
    }

    async updateWorkout(userId, workoutId, workout) {
        return axiosInstance.patch("/" + userId + "/workouts/" + workoutId, workout, {headers: authHeader()} )
    }

    async getDefaultExercise(){
        const response = await axiosInstance.get("/exercises", {headers: authHeader()})
        return response.data
    }
}

export default new WorkoutService();
