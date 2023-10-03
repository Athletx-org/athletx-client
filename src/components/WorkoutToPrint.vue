<template>
    <v-container>

        <div id="toPrint">
            <h2>{{ workout.name }}</h2>
            <p>
                <strong>Descrizione:</strong> {{ workout.description }}
            </p>
            <p>
                <strong>Difficoltà:</strong> {{ workout.difficulty }}
            </p>
            <p>
                <strong>Durata:</strong> {{ workout.duration }}
            </p>

            <div class="mt-5 mb-5" v-for="(training, index) in workout.trainings" :key="index">
                <h3>Training {{ index + 1 }}</h3>
                <v-table fixed-header>
                    <thead>
                        <tr>
                            <th>exercise</th>
                            <th>series</th>
                            <th>reps</th>
                            <th>rest</th>
                            <th>duration</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(exercise, exIndex) in training.exercises" :key="exIndex">
                            <td>{{ exercise.exerciseId.name }}</td>
                            <td>{{ exercise.series }}</td>
                            <td>{{ exercise.reps }}</td>
                            <td>{{ exercise.rest }}</td>
                            <td>{{ exercise.duration }}</td>
                        </tr>
                    </tbody>
                </v-table>
            </div>
        </div>
    </v-container>
</template>
  
<script>
export default {
    props: {
        workoutData: Object, 
    },
    data() {
        return {
            workout: { ...this.workoutData },
        }
    }
};
</script>
  