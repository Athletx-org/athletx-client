<template>
    <div>
        <v-card>
            <v-list>
                <v-list-item v-for="(goal, index) in goals" :key="index">
                    <v-checkbox v-model="goal.achieved" :label="goal.text"
                        @change="handleCheckboxChange(goal)"></v-checkbox>
                </v-list-item>
            </v-list>
        </v-card>

        <v-text-field v-model="newGoal.text" label="Inserisci un nuovo goal" outlined>
        </v-text-field>
        <VueDatePicker v-model="newGoal.expiration"></VueDatePicker>
        <v-btn class="mt-5" @click="addGoal">Add Goal</v-btn>
    </div>
</template>
  
<script>
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'
import { ref } from 'vue';
import GoalService from "@/services/goal.service";



export default {
    components: { VueDatePicker },
    data() {
        return {
            goals: null,
            newGoal: {
                text: '',
                expiration: null,
                achieved: false
            },
            date: ref()
        };
    },
    methods: {
        addGoal() {
            if (this.newGoal.text.trim() !== '') {
                this.saveGoal()
                this.goals.push(this.newGoal);
                this.newGoal = {
                    text: '',
                    expiration: null,
                    achieved: false
                };
            }
        },
        async saveGoal() {
            await GoalService.createNewGoal(this.$store.state.auth.user._id, this.newGoal)
        },
        async handleCheckboxChange(goal) {
            await GoalService.setGoalAsAchieved(this.$store.state.auth.user._id, goal._id)
        },
        async getAllGoals() {
            this.goals = await GoalService.getAllGoals(this.$store.state.auth.user._id)
        },
    },
    mounted() {
        this.getAllGoals()
    }
};
</script>
  