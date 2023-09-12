<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" xs="12" md="6" l="5" xl="4">
        <div>
          <v-text-field v-model="workout.name" label="Name"></v-text-field>
          <v-text-field v-model="workout.description" label="Description"></v-text-field>
          <v-text-field v-model="workout.difficulty" label="Difficulty"></v-text-field>
          <v-text-field v-model="workout.duration" label="Duration"></v-text-field>
          <v-btn @click="addTraining">New Training</v-btn>
          <draggable v-model="workout.trainings" @start="onDragStart" @end="onDragEnd">
            <div v-for="(training, tIndex) in workout.trainings" :key="tIndex">
              <v-card class="mb-3">
                <v-card-title>
                  Training {{ tIndex + 1 }}
                  <v-btn @click="removeTraining(tIndex)">Delete</v-btn>
                </v-card-title>
                <v-card-text>
                  <v-btn @click="addExercise(training)">Add Exercise</v-btn>
                  <draggable v-model="training.exercises" @start="onDragStart" @end="onDragEnd">
                    <div v-for="(exercise, exIndex) in training.exercises" :key="exIndex">
                      <v-card class="mt-2">
                        <v-card-title>
                          Exercise {{ exIndex + 1 }}
                          <v-btn @click="removeExercise(training, exIndex)">Delete</v-btn>
                        </v-card-title>
                        <v-card-text>
                          <div>
                            <v-btn class="mt-3 mb-3" v-show="!training.exercises[exIndex].exerciseId"
                              @click="openDialog(exIndex)">Choose
                              Exercise </v-btn>
                            <v-dialog v-model="dialog" max-width="500px">
                              <v-card>
                                <v-card-title>Select an exercise</v-card-title>
                                <v-card-text>
                                  <v-text-field autofocus v-model="searchQuery" label="Search Exercise" />

                                  <v-list>
                                    <v-list-item v-for="(ex, Index) in filterExercises()" :key="Index">
                                      <v-list-item @click="() => selectExercise(training, ex._id)">
                                        {{ ex.name }} (Muscle: {{ ex.muscle }}, Type: {{ ex.type }})
                                      </v-list-item>
                                    </v-list-item>
                                  </v-list>
                                </v-card-text>

                              </v-card>
                            </v-dialog>
                          </div>
                          <div v-if="training.exercises[exIndex].exerciseId">
                           <v-chip v-if="default_exercises">{{ getDefaultExerciseName(training, exIndex) }}</v-chip>
                            <v-btn @click="deleteSelectedExercise(training, exIndex)">x</v-btn>
                          </div>
                          <v-row>
                            <v-col cols="6" m="3" l="3" xl="3">
                              <v-text-field v-model="training.exercises[exIndex].reps" label="Reps"></v-text-field>
                            </v-col>
                            <v-col cols="6" m="3" l="3" xl="3">
                              <v-text-field v-model="training.exercises[exIndex].series" label="Series"></v-text-field>
                            </v-col>
                            <v-col cols="6" m="3" l="3" xl="3">
                              <v-text-field v-model="training.exercises[exIndex].rest" label="Rest (sec)"></v-text-field>
                            </v-col>
                            <v-col cols="6" m="3" l="3" xl="3">
                              <v-text-field v-model="training.exercises[exIndex].duration"
                                label="Duration (min)"></v-text-field>
                            </v-col>
                          </v-row>
                        </v-card-text>

                      </v-card>
                    </div>
                  </draggable>
                </v-card-text>
              </v-card>
            </div>
          </draggable>
          <v-btn class="mt-5" @click="sendWorkout()">Send Workout</v-btn>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { ref } from 'vue';
import { VueDraggableNext } from 'vue-draggable-next'
import WorkoutService from "@/services/workout.service";

export default {
  components: {
    draggable: VueDraggableNext,
  },
  props: {
    workoutData: Object
  },
  data() {
    return {
      isDragging: false,
      dialog: false,
      dialogIndex: "",
      workout: { ...this.workoutData},
      default_exercises: null,
      searchQuery: ref(""),
    };
  },
  mounted() {
    this.getDefaultExercise()
  },
  methods: {
    addTraining() {
      this.workout.trainings.push({
        exercises: [],
      });
    },
    addExercise(training) {
      training.exercises.push({
        exerciseId: null,
        reps: "",
        series: "",
        rest: "",
        duration: ""
      });
    },
    removeTraining(tIndex) {
      this.workout.trainings.splice(tIndex, 1);
    },
    removeExercise(training, exIndex) {
      training.exercises.splice(exIndex, 1);
    },
    onDragEnd() {
      this.isDragging = false
    },
    onDragStart() {
      this.isDragging = true;
    },
    openDialog(index) {
      this.dialog = true;
      this.dialogIndex = index
    },
    closeDialog() {
      this.dialog = false;
      this.searchQuery = ""
    },
    selectExercise(training, exercise) {
      training.exercises[this.dialogIndex].exerciseId = exercise
      this.closeDialog();
    },
    deleteSelectedExercise(training, exIndex) {
      training.exercises[exIndex].exerciseId = null;
    },
    filterExercises() {
      return this.default_exercises.filter(item => item.name.toLowerCase().includes(this.searchQuery.toLowerCase()))
    },
    sendWorkout() {
      this.$emit('submit', this.workout);
    },
    async getDefaultExercise() {
      this.default_exercises = await WorkoutService.getDefaultExercise()
    }, 
    getDefaultExerciseName(training, exIndex){
       return this.default_exercises.find(item => item._id === training.exercises[exIndex].exerciseId).name
    }
  },
};
</script>

<style src="./WorkoutForm.scss" lang="scss" scoped />