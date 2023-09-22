<template>
    <v-container>
        <v-row justify="center">
            <v-col cols="12" xs="12" md="10" l="6" xl="6">
                <div>
                    <v-text-field variant="outlined" v-model="newGoal.text" label="Insert New Goal" outlined>
                    </v-text-field>
                    <VueDatePicker v-model="newGoal.expiration" :min-date="new Date().setDate(new Date().getDate() + 1)"
                        placeholder="Select Expiration Date" :enable-time-picker="false"></VueDatePicker>
                    <v-btn class="mt-5 mb-8" color="paletteLightBlue" @click="addGoal">Save Goal</v-btn>
                </div>
                <h2>
                    Active Goals
                </h2>
                
                    <div class="items">
                        <v-card class="mb-5 item" v-for="(goal, index) in activeGoals" :key="index">
                            <v-card-title style="white-space: normal; overflow-wrap: break-word;">
                                {{ goal.text }}
                            </v-card-title>
                            <v-card-text>
                                <v-row align="center" justify="center">
                                    <v-col cols="5" class="text-subtitle-1 font-weight-bold">
                                        Expiration:
                                    </v-col>
                                    <v-col>
                                        <VueDatePicker v-model="goal.expiration"
                                            :min-date="new Date().setDate(new Date().getDate() + 1)"
                                            :enable-time-picker="false"></VueDatePicker>
                                    </v-col>
                                </v-row>
                                <v-chip class="mt-5" color="teal" text-color="white"
                                    prepend-icon="mdi-checkbox-marked-circle" @click=setGoalAsAchieved(goal)
                                    :model-value="true">
                                    Done
                                </v-chip>
                            </v-card-text>
                        </v-card>
                    </div>
            </v-col>

            <v-col cols="12" xs="12" md="10" l="6" xl="6">

                <v-card class="mb-8">
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
            </v-col>
        </v-row>
    </v-container>
</template>
  
<script>
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'
import { ref } from 'vue';
import GoalService from "@/services/goal.service";
import { reactive } from 'vue';
import { computed } from 'vue';



export default {
    components: {
        VueDatePicker,
    },
    data() {
        return {
            goals: reactive([]),
            completedGoals: computed(() => {
                return this.goals.filter((goal) => goal.achieved)
            }),
            activeGoals: computed(() => {
                return this.goals.filter((goal) => !goal.achieved && goal.expiration > new Date().toISOString())
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
        async setGoalAsAchieved(goal) {
            await GoalService.setGoalAsAchieved(this.$store.state.auth.user._id, goal._id)
            await this.getAllGoals()
        },
        async getAllGoals() {
            this.goals = await GoalService.getAllGoals(this.$store.state.auth.user._id)
        },
        getShortDate(fullDate) {
            const date = new Date(fullDate)
            return date.getDay() + "-" + date.getMonth() + "-" + date.getFullYear()
        }
    },
    async created() {
        await this.getAllGoals()

    }
};
</script>
<style src="./Goal.scss" lang="scss" scoped/>