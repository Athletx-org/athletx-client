<template>
  <h1> {{ title }}</h1>
  <div v-if="currentWorkout">
    <h2>Current workout: {{currentWorkout.workoutId.name}}</h2>
    <p>Starting Date: {{currentWorkout.startingDate }}</p>
    <p>Ending Date: {{currentWorkout.endingDate }}</p>
  </div>
  <v-btn to="/newWorkout" color="success" >Add new workout</v-btn>
    <v-row>
      <v-col class="mt-5" cols="12" sm="3" md="4" v-for="workout in this.workouts" :key="workout._id">
        <v-card width="350" elevation="5" outlined>
          <v-card-title> {{ workout.name }}</v-card-title>
          <v-card-text>
            {{ workout.description }}
          </v-card-text>
          <v-card-actions>
            <v-btn size="small" color="secondary" variant="elevated" @click="setAsCurrent(workout._id)">
              START NOW
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
    this.fetchCurrentWorkout()
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
        if (this.currentWorkout.workoutId._id === workoutId) {
          this.currentWorkout = null
        }
      })
    },
    editWorkout(workoutId){
      console.log(workoutId)
    },
    setAsCurrent(workoutId) {
      const selectedWorkout = this.workouts.find(workout => workout._id === workoutId)
      this.currentWorkout.workoutId.name = selectedWorkout.name
      const startingDate = new Date()
      let endingDate = new Date()
      endingDate.setDate(startingDate.getDate() + selectedWorkout.duration)
      this.currentWorkout.startingDate =  startingDate.toLocaleDateString()
      this.currentWorkout.endingDate = endingDate.toLocaleDateString()
      const activeWorkout = {
        userId: this.userId,
        workoutId: workoutId,
        startingDate: startingDate,
        endingDate: endingDate
      }
      WorkoutService.setCurrentWorkout(this.userId, activeWorkout)
    }
  }
}
</script>
<style src="./Workouts.scss" lang="scss" scoped/>