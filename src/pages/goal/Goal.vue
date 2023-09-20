<template>
    <div>
        <v-text-field v-model="newGoal.text" label="Inserisci un nuovo goal" outlined>
        </v-text-field>
        <VueDatePicker v-model="newGoal.expiration" :min-date="new Date()" :enable-time-picker="false"></VueDatePicker>
        <v-btn class="mt-5 mb-5" @click="addGoal">Add Goal</v-btn>
    </div>
    <div>
        <v-card>
            <v-card-title>
                Active Goals
            </v-card-title>
            <v-list>
                <v-list-item v-for="(goal, index) in activeGoals" :key="index">
                    <v-checkbox v-model="goal.achieved" :label="goal.text"
                        @change="handleCheckboxChange(goal)"></v-checkbox>
                </v-list-item>
            </v-list>
        </v-card>

        <v-card>
            <v-card-title>
                Achieved Goals
            </v-card-title>
            <v-list>
                <v-list-item v-for="(goal, index) in completedGoals" :key="index">
                    <div>
                        {{ goal.text }}
                    </div>
                </v-list-item>
            </v-list>
        </v-card>

        <v-card>
            <v-card-title>
                Not Achieved Goals
            </v-card-title>
            <v-list>
                <v-list-item v-for="(goal, index) in notAchievedGoals" :key="index">
                    <div>
                        {{ goal.text }}
                    </div>
                </v-list-item>
            </v-list>
        </v-card>
    </div>
</template>
  
<script>
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'
import { ref } from 'vue';
import GoalService from "@/services/goal.service";
import { reactive } from 'vue';
import { computed } from 'vue';



export default {
    components: { VueDatePicker },
    data() {
        return {
            goals: reactive([]),
            completedGoals: computed(() => {
                return this.goals.filter((goal) => goal.achieved)
            }),
            activeGoals: computed(() => {
                return this.goals.filter((goal) => !goal.achieved && goal.expiration >= new Date().toISOString())
            }),
            notAchievedGoals: computed(() => {
                return this.goals.filter((goal) => goal.expiration < new Date().toISOString())
            }),
            newGoal: {
                text: '',
                expiration: null,
                achieved: false
            },
            date: ref({
            })
        };
    },
    methods: {
        async addGoal() {
            if (this.newGoal.text.trim() !== '') {
                await this.saveGoal()
                await this.getAllGoals()
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
        }
    },
    async created() {
        await this.getAllGoals()

    }
};
</script>
  