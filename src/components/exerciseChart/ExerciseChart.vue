<template>
    <apexchart type="treemap" height="350" :options="chartOptions" :series="series"></apexchart>
</template>
<script>
import VueApexCharts from "vue3-apexcharts";
import WorkoutService from "@/services/workout.service";

export default {
    name: "Analytics",
    components: {
        apexchart: VueApexCharts,
    },
    data() {
        return {
            series: [
                {
                    data: [
                        {
                            x: '',
                            y: 0
                        },
                        {
                            x: '',
                            y: 0
                        },
                        {
                            x: '',
                            y: 0
                        }
                    ]
                }
            ],
            chartOptions: {
                legend: {
                    show: false
                },
                chart: {
                    height: 340,
                    type: 'treemap'
                },

                plotOptions: {
                    treemap: {
                        distributed: true,
                        enableShades: true
                    }
                }
            },
        }
    },
    methods: {
        async loadWorkoutData() {
            WorkoutService.getWorkouts(this.$store.state.auth.user._id).then((workouts) => {
                const exerciseFrequency = {};

                for (const workout of workouts) {
                    for (const training of workout.trainings) {
                        for (const exercise of training.exercises) {
                            const exerciseId = exercise.exerciseId._id;
                            const exerciseName = exercise.exerciseId.name;
                            if (exerciseFrequency[exerciseId]) {
                                exerciseFrequency[exerciseId].frequency++;
                            } else {
                                exerciseFrequency[exerciseId] = {
                                    frequency: 1,
                                    name: exerciseName,
                                };
                            }
                        }
                    }
                }

                const exerciseFrequencyArray = Object.entries(exerciseFrequency);
                exerciseFrequencyArray.sort((a, b) => b[1].frequency - a[1].frequency);
                const top3Exercises = exerciseFrequencyArray.slice(0, 3);
                const formattedData = top3Exercises.map((exerciseData) => ({
                    x: exerciseData[1].name,
                    y: exerciseData[1].frequency
                }));
                this.series[0].data = formattedData
            })
        }

    },
    created() {
        this.loadWorkoutData()
    }
}



</script>
