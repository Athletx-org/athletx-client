<template>
  <v-container>
    <v-row justify="center" class="align-center">
      <v-col xs="12" md="3" xl="2">
        <v-col>
          <v-btn to="/workouts/new" color="paletteBlue" prepend-icon="mdi-plus-box" variant="outlined" elevation="10">Create new workout
          </v-btn>
        </v-col>
      </v-col>
      <v-col xs="12" md="4" xl="3">
        <v-col>
          <v-btn  class="align-center" v-show="!importWorkoutDialog" @click="importWorkoutDialog = !importWorkoutDialog" color="paletteBlue"
            prepend-icon="mdi-plus-box" variant="outlined" elevation="10">Import workout
          </v-btn>
          <v-text-field  class="mt-4 align-center" v-show="importWorkoutDialog" autofocus v-model="importWorkoutText" label="Workout Id"
          prepend-icon="mdi-close-circle-outline" @click:prepend="importWorkoutDialog = !importWorkoutDialog" append-icon="mdi-send" variant="outlined" @click:append="importWorkout()" />
        </v-col>
      </v-col>
      <v-col xs="12" md="4" xl="4">
        <v-col>
          <v-timeline direction="horizontal" density="compact" line-thickness="2" line-color="black">
            <v-timeline-item dot-color="green" size="small" elevation="6"
            fill-dot ><strong>Easy</strong></v-timeline-item>
            <v-timeline-item dot-color="yellow" size="small" elevation="6"
            fill-dot ><strong>Medium</strong></v-timeline-item>
            <v-timeline-item dot-color="red" size="small" elevation="6"
            fill-dot ><strong>Hard</strong></v-timeline-item>
          </v-timeline>
        </v-col>
      </v-col>
    </v-row>
    <v-row justify="center">
      <div cols="12" class="ma-5" v-for="workout in this.workouts" :key="workout._id">
        <v-hover v-slot:default="{ isHovering, props }">
          <v-card :to="this.$route.path + '/' + workout._id" v-bind="props" :variant="isHovering ? 'flat' : 'elevated'"
            :elevation="isHovering ? 10 : 4" :width="isHovering ? 300 : 300" :height="300"
            :class="isHovering ? undefined : undefined" rounded="lg">
            <v-img height="80"
              :src="workout.difficulty === 0 ? colors.easy : workout.difficulty === 1 ? colors.medium : colors.hard" cover
              class="text-white" />
            <v-card-title class="text-center"> {{ workout.name }}</v-card-title>
            <v-card-text class="text-center">
              {{ workout.description }}
            </v-card-text>
            <v-card-text>
              <strong>Trainings: </strong> {{ workout.trainings.length }} <br>
              <strong>Duration:</strong> {{ workout.duration }} days
            </v-card-text>
            <v-card-actions>
              <v-btn size="small" color="black" variant="flat" class="bg-white" elevation="8" v-on:click.prevent
                @click="setAsCurrent(workout._id)">
                <strong>START NOW</strong>
              </v-btn>
              <v-spacer></v-spacer>
              <v-btn v-on:click.prevent variant="elevated" elevation="6" class="mx-auto" size="small"
                @click="openShareWorkoutDialog(workout._id)">
                <v-icon color="black" size="x-large">mdi-share-variant</v-icon>
              </v-btn>
              <v-dialog v-model="shareWorkoutDialog" max-width="500px">
                <v-card class="text-center">
                  <v-card-title>Share Workout Code</v-card-title>
                  <div class="mb-2">
                    <v-btn class="mr-2" @click.prevent="copyWorkoutId()" data-clipboard-target="#workoutId">Copy</v-btn>
                    <input type="text" v-model="dialogWorkoutId" ref="workoutId" id="workoutId" />
                  </div>
                </v-card>
              </v-dialog>
              <v-btn v-on:click.prevent variant="elevated" elevation="6" size="small"
                @click="exportToPDF(workout._id)">
                <v-icon color="black" size="x-large">mdi-printer</v-icon>
                <WorkoutToPrint :id="workout._id" v-show="false" :workoutData="workout"></WorkoutToPrint>
              </v-btn>
              <v-btn v-on:click.prevent variant="elevated" elevation="6" size="small">
                <v-icon color="red" size="x-large">mdi-delete</v-icon>
                <v-dialog v-model="dialog" activator="parent" transition="dialog-top-transition" width="auto">
                  <v-card>
                    <v-card-text class="text-center">Are you sure you want to delete workout "<strong>{{ workout.name
                    }}</strong>"?</v-card-text>
                    <v-card-actions>
                      <v-row class="text-center" align-content="center" justify="space-around">
                        <v-col cols="12" class="text-center">
                          <v-btn color="blue-darken-1" variant="elevated" elevation="6"
                            @click="deleteWorkout(workout._id)">Yes</v-btn>
                          <v-btn color="red" variant="elevated" elevation="6" @click="this.dialog = false">No</v-btn>
                        </v-col>
                      </v-row>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-hover>
      </div>
    </v-row>
  </v-container>
</template>
<script>
import WorkoutService from "@/services/workout.service";
import html2pdf from "html2pdf.js";
import WorkoutToPrint from "../../components/WorkoutToPrint"

export default {
  name: "Workouts",
  components: {
    WorkoutToPrint: WorkoutToPrint
  },
  data() {
    return {
      title: "Workouts",
      userId: this.$store.state.auth.user._id,
      workouts: [],
      colors: {
        easy: 'https://singlecolorimage.com/get/32a852/400x100',
        medium: 'https://singlecolorimage.com/get/fcfa49/400x100',
        hard: 'https://singlecolorimage.com/get/cc0000/400x100',
      },
      dialog: false,
      shareWorkoutDialog: false,
      dialogWorkoutId: "",
      importWorkoutDialog: false,
      importWorkoutText: ""
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
        this.dialog = false
      })
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
    },
    openShareWorkoutDialog(workoutId) {
      this.shareWorkoutDialog = true;
      this.dialogWorkoutId = workoutId
    },
    exportToPDF(workoutId) {
      const toPrint = (document.getElementById(workoutId));
      var clonedElement = toPrint.cloneNode(true);
      clonedElement.style.display = "block";
      html2pdf().from(clonedElement).save();
      clonedElement.remove();
    },
    async copyWorkoutId() {
      await navigator.clipboard.writeText(this.dialogWorkoutId);
      this.shareWorkoutDialog = false
    },
    async importWorkout() {
      await WorkoutService.copyWorkout(this.userId, this.importWorkoutText).then(() => {
        this.importWorkoutDialog = false
        this.importWorkoutText = ""
        this.fetchWorkouts()
      })
    }
  }
}
</script>
<style src="./Workouts.scss" lang="scss" scoped/>