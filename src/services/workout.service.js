import axiosInstance from "@/utils/axios";
import authHeader from "@/services/auth-header";

class WorkoutService {
  async getWorkouts(userId) {
    const response = await axiosInstance.get("/" + userId + "/workouts", {
      headers: authHeader(),
    });
    return response.data;
  }

  async getWorkout(userId, workoutId) {
    const response = await axiosInstance.get(
      "/" + userId + "/workouts/" + workoutId,
      { headers: authHeader() }
    );
    return response.data;
  }

  async getCurrentWorkout(userId) {
    const response = await axiosInstance.get(
      "/" + userId + "/workouts/info/current",
      { headers: authHeader() }
    );
    return response.data;
  }

  deleteWorkout(userId, workoutId) {
    return axiosInstance.delete("/" + userId + "/workouts/" + workoutId, {
      headers: authHeader(),
    });
  }

  async setCurrentWorkout(userId, currentWorkout) {
    return await axiosInstance.post(
      "/" + userId + "/workouts/current",
      currentWorkout,
      { headers: authHeader() }
    );
  }

  async createWorkout(userId, workout) {
    const response = await axiosInstance.post(
      "/" + userId + "/workouts",
      workout,
      { headers: authHeader() }
    );
    return response;
  }

  async updateWorkout(userId, workoutId, workout) {
    return axiosInstance.patch(
      "/" + userId + "/workouts/" + workoutId,
      workout,
      { headers: authHeader() }
    );
  }

  async getDefaultExercise() {
    const response = await axiosInstance.get("/exercises", {
      headers: authHeader(),
    });
    return response.data;
  }

  async copyWorkout(userId, workoutId) {
    const response = await axiosInstance.post(
      "/" + userId + "/workouts/" + workoutId,
      {
        headers: authHeader(),
      }
    );
    return response.data;
  }
}

export default new WorkoutService();
