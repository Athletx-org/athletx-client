<template>
    <h1>Dashboard</h1>
  <div v-if="currentWorkout">
    <h2>Current workout: {{currentWorkout.workoutId.name}}</h2>
    <p>Starting Date: {{currentWorkout.startingDate }}</p>
    <p>Ending Date: {{currentWorkout.endingDate }}</p>
  </div>
</template>

<script>
import WorkoutService from "@/services/workout.service";

export default {
  name: "Dashboard",
  data(){
    return {
      currentWorkout: null,
      userId: this.$store.state.auth.user._id,
    }
  },
  created() {
    this.fetchCurrentWorkout()
  },
  methods: {
    async fetchCurrentWorkout() {
      this.currentWorkout = await WorkoutService.getCurrentWorkout(this.userId)
    },
  }
}
</script>

<style src="./Dashboard.scss" lang="scss" scoped/>
