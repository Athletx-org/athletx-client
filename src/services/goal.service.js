import axiosInstance from '@/utils/axios';
import authHeader from './auth-header';

class GoalService{
    async getAllGoals(userId){
        const response = await axiosInstance.get("/" + userId + "/goals", {headers: authHeader()})
        return response.data
    }
    async createNewGoal(userId, goal){
        const response = await axiosInstance.post("/" + userId + "/goals", goal, {headers: authHeader()})
        return response
    }
    async setGoalAsAchieved(userId, goalId){
        const response = await axiosInstance.patch("/" + userId + "/goals/" + goalId, {headers: authHeader()})
        return response
    }
}

export default new GoalService(); 