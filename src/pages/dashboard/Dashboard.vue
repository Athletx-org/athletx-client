<template>
  <v-row align="center">
    <v-col cols="12" md="6">
      <v-card height="350">
        <v-card-title>
          Current Workout
        </v-card-title>
      <v-card-text>
        Content
      </v-card-text>
      </v-card>
    </v-col>
    <v-col cols="12" md="6">
      <v-card height="350">
        <v-card-title>
          Section 2
        </v-card-title>
        <v-card-text>
          Content
        </v-card-text>
      </v-card>
    </v-col>
    <v-col cols="12" md="6">
      <v-card height="350">
        <v-card-title>
          Section 3
        </v-card-title>
        <v-card-text>
          Content
        </v-card-text>
      </v-card>
    </v-col>
    <v-col cols="12" md="6">
      <v-card height="350">
        <v-card-title>
          Section 4
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
