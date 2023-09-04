<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" xs="12" md="6" l="5" xl="4">
        <div>
          <v-btn @click="addTraining">New Training</v-btn>
          <draggable v-model="trainings" @start="onDragStart" @end="onDragEnd">
            <div v-for="(training, tIndex) in trainings" :key="tIndex">
              <v-card>
                <v-card-title>
                  Training {{ tIndex + 1 }}
                  <v-btn @click="removeTraining(tIndex)">Delete</v-btn>
                </v-card-title>
                <v-card-text>
                  <v-btn @click="addExercise(training)">Add Exercise</v-btn>
                  <draggable v-model="training.exercises" @start="onDragStart" @end="onDragEnd">
                    <div v-for="(exercise, exIndex) in training.exercises" :key="exIndex">
                      <v-card>
                        <v-card-title>
                          Exercise {{ exIndex + 1 }}
                          <v-btn @click="removeExercise(training, exIndex)">Delete</v-btn>
                        </v-card-title>
                        <v-card-text>
                          <div>
                            <v-btn v-show="!training.exercises[exIndex].exerciseId" @click="openDialog(exIndex)">Choose
                              Exercise </v-btn>
                            <v-dialog v-model="dialog" max-width="500px">
                              <v-card>
                                <!-- Contenuto del dialog -->
                                <v-card-title>Select an exercise</v-card-title>
                                <v-card-text>
                                  <v-text-field autofocus v-model="searchQuery" label="Search Exercise" />

                                  <!-- Contenuto della "pop-up page" -->
                                  <v-list> 
                                    <v-list-item v-for="(default_exercise) in filterExercises()" :key="default_exercise">
                                      <v-list-item
                                        @click="() => selectExercise(training, default_exercise, exIndex)">
                                        {{ default_exercise }}
                                      </v-list-item>
                                    </v-list-item>
                                  </v-list>
                                </v-card-text>

                              </v-card>
                            </v-dialog>
                          </div>
                          <!-- Elemento selezionato -->
                          <div v-if="training.exercises[exIndex].exerciseId">
                            <v-chip>{{ training.exercises[exIndex].exerciseId }}</v-chip>
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
                              <v-text-field v-model="training.exercises[exIndex].duration" label="Duration (min)"></v-text-field>
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
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { ref } from 'vue';
import { VueDraggableNext } from 'vue-draggable-next'

export default {
  components: {
    draggable: VueDraggableNext,
  },

  data() {
    return {
      trainings: [],
      isDragging: false,
      dialog: false,
      dialogIndex: "",
      default_exercises: ["Elemento 1", "Elemento 2", "Elemento 3"],
      searchQuery: ref(""), 
    };
  },
  methods: {
    addTraining() {
      this.trainings.push({
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
        // Aggiungi altre informazioni sull'esercizio qui
      });
    },
    removeTraining(tIndex) {
      this.trainings.splice(tIndex, 1);
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
      this.dialogIndex=index
    },
    closeDialog() {
      this.dialog = false;
    },
    selectExercise(training, exercise) {
      training.exercises[this.dialogIndex].exerciseId = exercise
      this.searchQuery = ""
      this.closeDialog();
      
    },
    deleteSelectedExercise(training, exIndex) {
      training.exercises[exIndex].exerciseId = null;
    },
    filterExercises(){
        return this.default_exercises.filter((default_exercise) => default_exercise.toLowerCase().includes(this.searchQuery.toLowerCase()))
    }
  },

};
</script>
