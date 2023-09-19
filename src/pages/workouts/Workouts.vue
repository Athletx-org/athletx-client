<template>
  <v-row class="ml-5">
    <v-btn
        to="/workouts/new"
        color="paletteBlue"
        prepend-icon="mdi-plus-box"
        variant="outlined"
        elevation="6"
        class="mt-5"
    >Create new workout
    </v-btn>
  </v-row>
  <v-row class="ml-2" justify="start">
    <v-col class="mt-5" cols="12" sm="3" md="4" v-for="(workout,i) in this.workouts" :key="workout._id">
      <v-hover v-slot:default="{ isHovering, props }">
        <v-card
            :to="this.$route.path+'/'+workout._id"
            v-bind="props"
            :variant="isHovering ? 'flat' : 'elevated'"
            :elevation="isHovering ? 10: 4"
            :width="isHovering ? 350 : 350"
            :class="isHovering ? 'up' : undefined"
            rounded="lg"
        >
          <v-img
              height="80"
              :src="colors[i % colors.length]"
              cover
              class="text-white"
          />
          <v-card-title class="text-center"> {{ workout.name }}</v-card-title>
          <v-card-text class="text-center">
            {{ workout.description }}
          </v-card-text>
          <v-card-text>
            <strong>Difficulty:</strong> {{ workout.difficulty }} <br>
            <strong>Duration:</strong> {{ workout.duration }} days
          </v-card-text>
          <v-card-actions>
            <v-btn
                size="small"
                color="paletteBlue"
                variant="elevated"
                elevation="8"
                v-on:click.prevent
                @click="setAsCurrent(workout._id)"
            >
              START NOW
            </v-btn>
            <v-spacer></v-spacer>
            <v-btn v-on:click.prevent @click="deleteWorkout(workout._id)">
              <v-icon size="large">mdi-delete</v-icon>
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-hover>
    </v-col>
  </v-row>
</template>
<script>
import WorkoutService from "@/services/workout.service";

export default {
  name: "Workouts",
  data() {
    return {
      title: "Workouts",
      userId: this.$store.state.auth.user._id,
      workouts: [],
      colors: [
        "https://singlecolorimage.com/get/33fd8f/400x100",
        "https://singlecolorimage.com/get/11b7bf/400x100",
        "https://singlecolorimage.com/get/e03e22/400x100",
        "https://singlecolorimage.com/get/f5eb31/400x100"

      ]
    }
  },
  created() {
    this.fetchWorkouts()
  },
  methods: {
    async fetchWorkouts() {
      this.workouts = await WorkoutService.getWorkouts(this.userId)
    },
    async deleteWorkout(workoutId) {
      WorkoutService.deleteWorkout(this.userId, workoutId).then(() => {
        this.workouts = this.workouts.filter(workout => workout._id !== workoutId)
        if (this.currentWorkout.workoutId._id === workoutId) {
          this.currentWorkout = null
        }
      })
    },
    getRandomColor() {
      console.log("here")
      const basePath = "https://singlecolorimage.com/get/"
      const color = Math.floor(Math.random()*16777215).toString(16)
      console.log(basePath+color)
      return basePath +color
    },
    async setAsCurrent(workoutId) {
      const selectedWorkout = this.workouts.find(workout => workout._id === workoutId)
      const startingDate = new Date()
      let endingDate = new Date()
      endingDate.setDate(startingDate.getDate() + selectedWorkout.duration)
      const activeWorkout = {
        userId: this.userId,
        workoutId: workoutId,
        startingDate: startingDate,
        endingDate: endingDate
      }
      return await WorkoutService.setCurrentWorkout(this.userId, activeWorkout)
    }
  }
}
</script>
<style src="./Workouts.scss" lang="scss" scoped/>