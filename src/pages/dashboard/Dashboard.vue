<template>
  <v-row align="center">
    <v-col cols="12" md="6">
      <v-card height="350" variant="elevated" elevation="10" to="/profile">
        <v-card-title class="text-center">
          <h2>{{ user.name }} {{ user.surname }}</h2>
        </v-card-title>
        <v-card-text>
          <v-row no-gutters class="mt-3 text-center">
            <v-col cols="12" md="6">
              <v-img :src="profilePicPath" alt="" height="200"/>
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field
                  readonly
                  variant="plain"
                  v-model="user.city"
                  hide-details
              >
                <template v-slot:prepend>
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
                  v-model="user.age"
                  hide-details
              >
                <template v-slot:prepend>
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
                    v-model="improvement.bodyWeight"
                    hide-details
                >
                  <template v-slot:prepend>
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
                    v-model="user.height"
                    hide-details
                >
                  <template v-slot:prepend>
                    <v-icon size="large">
                      <v-img
                          :src="require('@/assets/img/icons/height.png')"
                      />
                    </v-icon>
                  </template>
                </v-text-field>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </v-col>
    <v-col cols="12" md="6">
      <v-card height="350" variant="elevated" elevation="10">
        <v-btn
            to="/workouts/new"
            color="paletteBlue"
            prepend-icon="mdi-plus-box"
            variant="outlined"
            class="mt-2 ml-2"
        >Create new workout
        </v-btn>
        <v-card-title>
          <h2>Current Workout</h2>
        </v-card-title>
        <v-card-text>

        </v-card-text>
      </v-card>
    </v-col>
    <v-col cols="12" md="6">
      <v-card height="350" variant="elevated" elevation="10">
        <v-card-title>
          Workout Stats
        </v-card-title>
        <v-card-text>
          Content
        </v-card-text>
      </v-card>
    </v-col>
    <v-col cols="12" md="6">
      <v-card height="350" variant="elevated" elevation="10">
        <v-card-title>
          Goals Stats
        </v-card-title>
        <v-card-text>
          Content
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

export default {
  name: "Dashboard",
  data() {
    return {
      currentWorkout: null,
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
