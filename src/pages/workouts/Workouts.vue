<template>
  <h1> {{ title }}</h1>
  <v-btn to="/newWorkout" color="success">Add new workout</v-btn>
    <v-row>
      <v-col class="mt-5" cols="12" sm="3" md="4" v-for="workout in this.workouts" :key="workout._id">
        <v-card width="350" elevation="5" outlined>
          <v-card-title> {{ workout.name }}</v-card-title>
          <v-card-text>
            {{ workout.description }}
          </v-card-text>
          <v-card-actions>
            <v-btn size="small" color="secondary" variant="elevated" @click="setAsCurrent(workoutId)">
              SET AS CURRENT
            </v-btn>
            <v-spacer></v-spacer>
            <v-btn @click="editWorkout(workout._id)">
              <v-icon size="small">mdi-pencil</v-icon>
            </v-btn>
            <v-btn @click="deleteWorkout(workout._id)">
              <v-icon size="small">mdi-delete</v-icon>
            </v-btn>
          </v-card-actions>
        </v-card>
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
      currentWorkout: null
    }
  },
  mounted() {
    this.fetchWorkouts()
    //this.fetchCurrentWorkout()
  },
  methods: {
    async fetchWorkouts() {
      this.workouts = await WorkoutService.getWorkouts(this.userId)
    },
    async fetchCurrentWorkout() {
      this.currentWorkout = await WorkoutService.getCurrentWorkout(this.userId)
    },
    async deleteWorkout(workoutId) {
      WorkoutService.deleteWorkout(this.userId, workoutId).then(() => {
        this.workouts = this.workouts.filter(workout => workout._id !== workoutId)
      })
    },
    editWorkout(workoutId){
      console.log(workoutId)
    },
    setAsCurrent(workoutId) {
      console.log(workoutId)
    }
  }
}
</script>
<style src="./Workouts.scss" lang="scss" scoped/>