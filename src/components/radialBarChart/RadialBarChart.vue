<template>
    <apexchart type="radialBar" height="390" :options="chartOptions" :series="series"></apexchart>
</template>
<script>
import VueApexCharts from "vue3-apexcharts";
import GoalService from "@/services/goal.service";

export default {
    name: "Analytics",
    components: {
        apexchart: VueApexCharts,
    },
    data() {
        return {
            series: [],
            chartOptions: {
                chart: {
                    height: 390,
                    type: 'radialBar',
                },
                plotOptions: {
                    radialBar: {
                        offsetY: 0,
                        startAngle: 0,
                        endAngle: 270,
                        hollow: {
                            margin: 5,
                            size: '30%',
                            background: 'transparent',
                        },
                        dataLabels: {
                            name: {
                                show: true,
                            },
                            value: {
                                show: false,
                            }
                        }
                    }
                },
                colors: ['#008000', '#DAA520', '#FF0000'],
                labels: ['Achieved', 'Active', 'Failed'],
                legend: {
                    show: true,
                    floating: true,
                    fontSize: '16px',
                    position: 'left',
                    offsetX: 160,
                    offsetY: 15,
                    labels: {
                        useSeriesColors: true,
                    },
                    markers: {
                        size: 0
                    },
                    formatter: function (seriesName, opts) {
                        return seriesName + ":  " + opts.w.globals.series[opts.seriesIndex]
                    },
                    itemMargin: {
                        vertical: 3
                    }
                },
                responsive: [{
                    breakpoint: 480,
                    options: {
                        legend: {
                            show: true,
                            position: 'up',
                        }
                    }
                }]
            },
        }
    },
    methods: {
      loadWorkoutData() {
        GoalService.getAllGoals(this.$store.state.auth.user._id).then((goals) => {          
            const completedGoals = goals.filter((goal) => goal.achieved).length / goals.length * 100
            const activeGoals = goals.filter((goal) => !goal.achieved && goal.expiration > new Date().toISOString()).length / goals.length * 100
            const notAchievedGoals = goals.filter((goal) => goal.expiration < new Date().toISOString()).length / goals.length * 100
            this.series = [completedGoals, activeGoals, notAchievedGoals]
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
