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
  <v-row class="ml-2">
    <v-col class="mt-5" cols="12" sm="3" md="4" v-for="workout in this.workouts" :key="workout._id">
      <v-hover v-slot:default="{ isHovering, props }">
        <v-card
            :to="this.$route.path+'/'+workout._id"
            v-bind="props"
            :variant="isHovering ? 'elevated' : 'flat'"
            :elevation="isHovering ? 10: 4"
            :width="isHovering ? 350 : 350"
            :class="isHovering ? 'up' : undefined"
            rounded="lg"
        >
          <v-card-title> {{ workout.name }}</v-card-title>
          <v-card-text>
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
    editWorkout(workoutId) {
      this.$router.push("/workouts/" + workoutId)
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