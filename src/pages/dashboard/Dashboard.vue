<template>
  <v-row align="center">
    <v-col cols="12" md="6">
      <v-card variant="elevated" elevation="10">
        <v-card-title class="text-center">
          <h2><i>{{ user.name }} {{ user.surname }}</i></h2>
        </v-card-title>
        <v-card-text>
          <v-row class="mt-3 text-center">
            <v-col md="1"></v-col>
            <v-col cols="12" md="5">
              <v-img class="mt-2 profileImage" :src="profilePicPath"/>
            </v-col>
            <v-col cols="6" md="3">
              <v-text-field
                  readonly
                  label="City"
                  variant="plain"
                  v-model="user.city"
                  hide-details
              >
                <template v-slot:prepend-inner>
                  <v-icon size="large">
                    <v-img
                        :src="require('@/assets/img/icons/city.png')"
                    />
                  </v-icon>
                </template>
              </v-text-field>
              <v-text-field
                  readonly
                  variant="plain"
                  label="Age"
                  v-model="user.age"
                  hide-details
              >
                <template v-slot:prepend-inner>
                  <v-icon size="large">
                    <v-img
                        :src="require('@/assets/img/icons/age.png')"
                    />
                  </v-icon>
                </template>
              </v-text-field>
              <v-text-field
                  readonly
                  variant="plain"
                  label="Weight (Kg)"
                  v-model="improvement.bodyWeight"
                  hide-details
              >
                <template v-slot:prepend-inner>
                  <v-icon size="large">
                    <v-img
                        :src="require('@/assets/img/icons/weight.png')"
                    />
                  </v-icon>
                </template>
              </v-text-field>
              <v-text-field
                  readonly
                  variant="plain"
                  label="Height"
                  v-model="user.height"
                  hide-details
              >
                <template v-slot:prepend-inner>
                  <v-icon size="large">
                    <v-img
                        :src="require('@/assets/img/icons/height.png')"
                    />
                  </v-icon>
                </template>
              </v-text-field>
            </v-col>
            <v-col cols="6" md="3">
              <v-text-field
                  readonly
                  label="Body Fat (%)"
                  variant="plain"
                  v-model="improvement.bodyFat"
                  hide-details
              >
                <template v-slot:prepend-inner>
                  <v-icon size="large">
                    <v-img
                        :src="require('@/assets/img/icons/body-fat.png')"
                    />
                  </v-icon>
                </template>
              </v-text-field>
              <v-text-field
                  readonly
                  variant="plain"
                  label="Chest (cm)"
                  v-model="improvement.chest"
                  hide-details
              >
                <template v-slot:prepend-inner>
                  <v-icon size="large">
                    <v-img
                        :src="require('@/assets/img/icons/chest.png')"
                    />
                  </v-icon>
                </template>
              </v-text-field>
              <v-text-field
                  readonly
                  variant="plain"
                  label="Biceps (Cm)"
                  v-model="improvement.biceps"
                  hide-details
              >
                <template v-slot:prepend-inner>
                  <v-icon size="large">
                    <v-img
                        :src="require('@/assets/img/icons/biceps.png')"
                    />
                  </v-icon>
                </template>
              </v-text-field>
              <v-text-field
                  readonly
                  variant="plain"
                  label="Quadriceps (Cm)"
                  v-model="improvement.quadriceps"
                  hide-details
              >
                <template v-slot:prepend-inner>
                  <v-icon size="large">
                    <v-img
                        :src="require('@/assets/img/icons/quadriceps.png')"
                    />
                  </v-icon>
                </template>
              </v-text-field>
            </v-col>
          </v-row>
          <v-row class="text-center">
            <v-col cols="12">
              <v-btn
                  to="profile"
                  color="blue"
                  prepend-icon="mdi-pencil"
                  variant="flat"
                  elevation="10"
                  class="mt-2 ml-2 text-white"
              >Edit
              </v-btn>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </v-col>
    <v-col cols="12" md="6">
      <v-card variant="elevated" elevation="10">
        <v-card-title class="text-center">
          <h2><i>Current Workout</i></h2>
        </v-card-title>
        <v-card-text class="ml-5">
          <v-row class="text-center mt-3" justify="space-around">
            <v-col md="1"></v-col>
            <v-col cols="12" md="4">
              <v-text-field readonly label="Name" v-model="currentWorkout.workoutId.name" variant="plain" hide-details>
                <template v-slot:prepend-inner>
                  <v-icon size="large">
                    <v-img
                        :src="require('@/assets/img/icons/workout_name.png')"
                    />
                  </v-icon>
                </template>
              </v-text-field>
              <v-text-field readonly label="Expiration" v-model="currentWorkout.endingDate" variant="plain" hide-details>
                <template v-slot:prepend-inner>
                  <v-icon size="large">
                    <v-img
                        :src="require('@/assets/img/icons/calendar.png')"
                    />
                  </v-icon>
                </template>
              </v-text-field>
              <v-text-field readonly
                            label="Difficulty"
                            v-model="this.currentWorkout.workoutId.difficulty"
                            variant="plain"
                            hide-details
              >
                <template v-slot:prepend-inner>
                  <v-icon size="large">
                    <v-img
                        :src="require('@/assets/img/icons/difficulty.png')"
                    />
                  </v-icon>
                </template>
              </v-text-field>
              <v-text-field readonly label="Trainings per week" v-model="currentWorkout.workoutId.trainings.length" variant="plain" hide-details>
                <template v-slot:prepend-inner>
                  <v-icon size="large">
                    <v-img
                        :src="require('@/assets/img/icons/trainings.png')"
                    />
                  </v-icon>
                </template>
              </v-text-field>
            </v-col>
            <v-col cols="12" md="6" class="mt-5">
              <pie-chart
                  :series="[completedGoals.length, activeGoals.length, notAchievedGoals.length]"
                  :labels="['Completed', 'Active', 'Not Achieved']"
              />
            </v-col>
          </v-row>
          <v-row class="text-center">
            <v-col cols="12">
              <v-btn
                  :to="'workouts/'+this.currentWorkout.workoutId._id"
                  color="blue"
                  prepend-icon="mdi-pencil"
                  variant="flat"
                  elevation="10"
                  class="mt-2 ml-2 text-white"
              >Edit
              </v-btn>
              <v-btn
                  to="workouts/new"
                  color="green"
                  prepend-icon="mdi-plus-box"
                  variant="flat"
                  elevation="10"
                  class="mt-2 ml-2 text-white"
              >New
              </v-btn>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </v-col>
    <v-col cols="12" md="6">
      <v-card variant="elevated" elevation="10">
        <v-card-title class="text-center">
          <h2><i>Goals</i></h2>
        </v-card-title>
        <v-card-text>
          <v-row justify="space-around">
            <v-col md="1"></v-col>
            <v-col cols="12" md="4">
              <v-card variant="flat">
                <v-card-text>
                  <v-text-field readonly label="Completed" v-model="completedGoals.length" variant="plain" hide-details>
                    <template v-slot:prepend-inner>
                      <v-icon size="large">
                        <v-img
                            :src="require('@/assets/img/icons/completed.png')"
                        />
                      </v-icon>
                    </template>
                  </v-text-field>
                  <v-text-field readonly label="Active goals" v-model="activeGoals.length" variant="plain" hide-details>
                    <template v-slot:prepend-inner>
                      <v-icon size="large">
                        <v-img
                            :src="require('@/assets/img/icons/active.png')"
                        />
                      </v-icon>
                    </template>
                  </v-text-field>
                  <v-text-field readonly label="Not Achieved goals" v-model="notAchievedGoals.length" variant="plain" hide-details>
                    <template v-slot:prepend-inner>
                      <v-icon size="large">
                        <v-img
                            :src="require('@/assets/img/icons/deadline.png')"
                        />
                      </v-icon>
                    </template>
                  </v-text-field>
                  <v-text-field readonly label="Total goals" v-model="goals.length" variant="plain" hide-details>
                    <template v-slot:prepend-inner>
                      <v-icon size="large">
                        <v-img
                            :src="require('@/assets/img/icons/list.png')"
                        />
                      </v-icon>
                    </template>
                  </v-text-field>
                </v-card-text>
              </v-card>
            </v-col>
            <v-col cols="12" md="6" class="mt-5">
              <pie-chart
                  :series="[completedGoals.length, activeGoals.length, notAchievedGoals.length]"
                  :labels="['Completed', 'Active', 'Not Achieved']"
              />
            </v-col>
          </v-row>
          <v-row class="text-center">
            <v-col cols="12">
              <v-btn
                  to="goals"
                  color="blue"
                  prepend-icon="mdi-check-circle-outline"
                  variant="flat"
                  class="ml-2 text-white"
                  elevation="10"
              >View all
              </v-btn>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </v-col>
    <v-col cols="12" md="6">
      <v-card height="350" variant="text" elevation="10">
        <v-card-title class="text-center">
          <h2><i>Stats</i></h2>
        </v-card-title>
        <v-card-text class="mt-14">
          <v-row justify="center">
            <v-col v-for="(stat, index) in stats" :key="index">
              <v-card variant="elevated" elevation="10" width="150" height="130" class="stat-card" :color="stat.color">
                <v-card-title class="stat-title">{{ stat.title }}</v-card-title>
                <v-divider color="black"/>
                <v-card-text class="stat-value">{{ stat.value }}</v-card-text>
              </v-card>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </v-col>

  </v-row>
</template>

<script>
import WorkoutService from "@/services/workout.service";
import UserService from "@/services/user.service";
import {computed, reactive} from "vue";
import GoalService from "@/services/goal.service";
import PieChart from "@/components/pieChart/PieChart";

export default {
  name: "Dashboard",
  components: {PieChart},
  data() {
    return {
      currentWorkout: {
        endingDate: new Date(),
        workoutId: {
          trainings: []
        }
      },
      userId: this.$store.state.auth.user._id,
      user: {
        name: '',
        surname: '',
        city: '',
        country: '',
        age: '',
        height: '',
        bio: '',
        profilePic: '',
      },
      profilePicPath: null,
      improvement: {
        timeStamp: null,
        bodyWeight: null,
        bodyFat: null,
        biceps: null,
        chest: null,
        quadriceps: null
      },
      stats: [
        {title: 'Workouts', value: 10, color: 'cyan'},
        {title: 'Messages', value: 6, color: 'orange'},
        {title: 'Notifications', value: 2, color: 'green'},
        {title: 'Friends', value: 8, color: 'pink'},

      ],
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
    }
  },
  created() {
    this.fetchCurrentWorkout()
    this.fetchUserInfo()
    this.fetchUserImprovement()
    this.fetchAllGoals()
  },
  methods: {
    async fetchCurrentWorkout() {
      this.currentWorkout = await WorkoutService.getCurrentWorkout(this.userId)
      this.currentWorkout.endingDate = new Date(this.currentWorkout.endingDate).toLocaleDateString()
      this.currentWorkout.workoutId.difficulty = this.currentWorkout.workoutId.difficulty === 0 ? 'Easy' : this.currentWorkout.workoutId.difficulty === 1 ? 'Medium' : 'Hard'
    },
    async fetchUserInfo() {
      await UserService.getUserInfo(this.userId).then(
          res => {
            if (res != null) {
              this.user = res
              this.profilePicPath = process.env.VUE_APP_BASE_URL + this.user.profilePic
            }
          })
    },
    async fetchUserImprovement() {
      await UserService.getUserImprovement(this.userId).then(
          res => {
            if (res != null) {
              this.improvement = res
            }
          }
      )
    },
    async fetchAllGoals() {
      this.goals = await GoalService.getAllGoals(this.userId)
    },
  }
}
</script>

<style src="./Dashboard.scss" lang="scss" scoped/>
