<template>
<h1> {{ title }}</h1>
</template>
<script>
import WorkoutService from "@/services/workout.service";

export default {
  name: "Workouts",
  data() {
    return {
      title: "Workouts",
      workouts: [],
    }
  },
  created() {
    this.workouts = this.fetchWorkouts()
  },
  methods: {
    async fetchWorkouts() {
      return await WorkoutService.getWorkouts(this.$store.state.auth.user._id)
    }
  }
}
</script>
<style src="./Workouts.scss" lang="scss" scoped />