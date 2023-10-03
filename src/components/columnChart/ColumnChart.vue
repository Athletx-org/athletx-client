<template>
    <apexchart type="bar" height="350" :options="chartOptions" :series="series"></apexchart>
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
            series: [{
            data: []
          }],
          chartOptions: {
            chart: {
              height: 350,
              type: 'bar',
            },
            plotOptions: {
              bar: {
                columnWidth: '45%',
                distributed: true,
              }
            },
            dataLabels: {
              enabled: false
            },
            legend: {
              show: false
            },
            xaxis: {
              categories: [
                ["Hard"],
                ["Medium"],
                ["Easy"],
                
              ],
              labels: {
                style: {
                  fontSize: '12px'
                }
              }
            }
          },
        }
    },
    methods: {
      async loadWorkoutData() {
        WorkoutService.getWorkouts(this.$store.state.auth.user._id).then((workouts) => {
          this.series[0].data = [this.countByDifficulty(workouts, 2), this.countByDifficulty(workouts, 1), this.countByDifficulty(workouts, 0)]
        })
        
      },
      countByDifficulty(array, difficulty){
        return array.filter(obj => obj.difficulty === difficulty).length
      }
    },
    created() {
      this.loadWorkoutData()
    }
}


</script>
