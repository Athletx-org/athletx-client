<template>
  <div>    
    <workout-form v-if="workoutData" :workoutData="workoutData" @submit="saveWorkout" />
  </div>
</template>

<script>
import WorkoutForm from "@/components/workoutForm/WorkoutForm";
import WorkoutService from "@/services/workout.service";

export default {
  components: {
    WorkoutForm,
  },
  data() {
    return {
      editing: false,
      workoutData: null,
      userId: this.$store.state.auth.user._id,
      workoutId: this.$route.params.workoutId
    };
  },
  created() {
    if (this.workoutId && this.workoutId !== "new") {
      this.editing = true;
      this.loadWorkoutData(this.workoutId);
    } else {
      this.workoutData = {
        name: "",
        difficulty: "",
        description: "",
        duration: "",
        trainings: []
      }
    }
  },
  methods: {
    async loadWorkoutData(workoutId) {
      this.workoutData = await WorkoutService.getWorkout(this.userId, workoutId)
    },
    saveWorkout(formData) {
      if (this.editing) {
        console.log(formData.target)
        WorkoutService.updateWorkout(this.userId, this.workoutId, formData).then(() => {
          this.$router.push("/workouts")
        })
      } else {
        WorkoutService.createWorkout(this.userId, formData).then(() => {
          this.$router.push("/workouts")
        })
      }
    },
  },
};
</script>
