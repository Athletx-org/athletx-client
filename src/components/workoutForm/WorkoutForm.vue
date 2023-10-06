<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" xs="12" md="8" l="6" xl="6">
        <div>
          <v-text-field v-model="workout.name" label="Name" variant="outlined"></v-text-field>
          <v-text-field v-model="workout.description" label="Description" variant="outlined"></v-text-field>
          <div class="mb-5">
            <div class="font-weight-bold mb-2">Difficulty</div>
            <v-btn v-for="(button, index) in difficultyButtons" variant="outlined" :ripple="false" :key="index" :class="{
              'active-green': workout.difficulty === index && button === 'easy',
              'active-yellow': workout.difficulty === index && button === 'medium',
              'active-red': workout.difficulty === index && button === 'hard',
            }" @click="setDifficulty(index)" class="mr-3">
              {{ button }}
            </v-btn>
          </div>
          <v-text-field
                    color="blue-darken-1"
                    variant="outlined"
                    type="number"
                    :min="1"
                    label="Duration (Days)"
                    v-model="workout.duration"
                />
          <v-btn prepend-icon="mdi-plus-box" @click="addTraining" variant="outlined" class="mb-4">New Training</v-btn>
          <draggable v-model="workout.trainings" @start="onDragStart" @end="onDragEnd">
            <div v-for="(training, tIndex) in workout.trainings" :key="tIndex">
              <v-card variant="outlined" class="mb-3">
                <v-card-title class="mb-3 mt-3">
                  <v-btn append-icon="mdi-delete" variant="flat" size="medium" @click="removeTraining(tIndex)">
                    Training {{ tIndex + 1 }}
                  </v-btn>
                </v-card-title>
                <v-card-text>
                  <v-btn prepend-icon="mdi-plus-box" variant="outlined" class="mb-2" @click="addExercise(training)">Add
                    Exercise</v-btn>
                  <draggable v-model="training.exercises" @start="onDragStart" @end="onDragEnd">
                    <div v-for="(exercise, exIndex) in training.exercises" :key="exIndex">
                      <v-card variant="outlined" class="mt-2">
                        <v-card-title class="mb-3 mt-3">
                          <v-btn append-icon="mdi-delete" variant="flat" size="medium"
                            @click="removeExercise(training, exIndex)">
                            Exercise {{ exIndex + 1 }}
                          </v-btn>
                        </v-card-title>
                        <v-card-text>
                          <div v-if="training.exercises[exIndex].exerciseId" class="mb-8">
                            <v-chip size="large" label v-if="default_exercises" closable
                              @click:close="deleteSelectedExercise(training, exIndex)" text-color="white">
                              {{ getDefaultExerciseName(training, exIndex) }}
                            </v-chip>
                          </div>
                          <div v-else class="mb-8">
                            <v-btn prepend-icon="mdi-magnify" variant="outlined" @click="openDialog(exIndex)">Choose
                              Exercise </v-btn>
                            <v-dialog v-model="dialog" max-width="500px">
                              <v-card>
                                <v-card-title>Select an exercise</v-card-title>
                                <v-card-text>
                                  <v-text-field autofocus v-model="searchQuery" label="Search Exercise" />
                                  <v-list>
                                    <v-list-item v-for="(ex, Index) in filterExercises()" :key="Index">
                                      <v-list-item @click="() => selectExercise(training, ex)">
                                        {{ ex.name }} (Muscle: {{ ex.muscle }}, Type: {{ ex.type }})
                                      </v-list-item>
                                    </v-list-item>
                                  </v-list>
                                </v-card-text>

                              </v-card>
                            </v-dialog>
                          </div>
                          <v-row>
                            <v-col cols="6" m="3" l="3" xl="3">
                              <v-text-field v-model="training.exercises[exIndex].reps" variant="outlined"
                                label="Reps"></v-text-field>
                            </v-col>
                            <v-col cols="6" m="3" l="3" xl="3">
                              <v-text-field v-model="training.exercises[exIndex].series" variant="outlined"
                                label="Series"></v-text-field>
                            </v-col>
                            <v-col cols="6" m="3" l="3" xl="3">
                              <v-text-field v-model="training.exercises[exIndex].rest" variant="outlined"
                                label="Rest (sec)"></v-text-field>
                            </v-col>
                            <v-col cols="6" m="3" l="3" xl="3">
                              <v-text-field v-model="training.exercises[exIndex].duration" variant="outlined"
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
          <div class="text-center">
            <v-btn color="paletteLightBlue" size="large" variant="flat" class="mt-5" @click="sendWorkout()">Send
              Workout</v-btn>
          </div>
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
      durationArray: Array.from({ length: 30 }, (_, index) => index + 1),
      selections: 1,
      difficultyButtons: ["easy", "medium", "hard"],
      isDragging: false,
      dialog: false,
      dialogIndex: "",
      workout: { ...this.workoutData },
      default_exercises: null,
      searchQuery: ref(""),
    };
  },
  created() {
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
    getDefaultExerciseName(training, exIndex) {
      return this.default_exercises.find(item => item._id === training.exercises[exIndex].exerciseId._id).name
    },
    setDifficulty(index) {
      this.workout.difficulty = index
    },
  },
};
</script>

<style src="./WorkoutForm.scss" lang="scss" scoped />
<style src="vue-scroll-picker/lib/style.css"></style>
