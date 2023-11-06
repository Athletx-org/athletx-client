import axiosInstance from '@/utils/axios';
import authHeader from './auth-header';

class GoalService{
    async getAllGoals(userId){
        const response = await axiosInstance.get("/" + userId + "/goals", {headers: authHeader()})
        return response.data
    }
    async createNewGoal(userId, goal){
        return await axiosInstance.post("/" + userId + "/goals", goal, {headers: authHeader()})
    }
    async setGoalAsAchieved(userId, goalId){
        return await axiosInstance.patch("/" + userId + "/goals/" + goalId, {headers: authHeader()})
    }
}

export default new GoalService(); 