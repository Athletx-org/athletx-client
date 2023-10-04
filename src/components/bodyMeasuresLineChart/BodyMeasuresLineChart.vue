<template>
    <apexchart type="line" height="350" :options="chartOptions" :series="series"></apexchart>
</template>
<script>
import VueApexCharts from "vue3-apexcharts";
import UserService from "@/services/user.service";

export default {
    components: {
        apexchart: VueApexCharts,
    },
    data() {
        return {
            chartOptions: {
                chart: {
                    type: "line"
                },
                xaxis: {
                    type: "datetime",
                }
            },
            series: [
                {
                    name: "Chest",
                    data: []
                },
                {
                    name: "Biceps",
                    data: []
                },
                {
                    name: "Quadriceps",
                    data: []
                }
            ]
        }
    },
    methods: {
        loadBodyMeasure() {
            UserService.getAllUserImprovements(this.$store.state.auth.user._id).then((improvements) => {
                improvements.slice(0, 10)
                const dateTime = improvements.map(improvement => improvement.timeStamp)
                const chest = improvements.map(improvement => improvement.chest)
                this.series[0].data = dateTime.map((time, index) => {
                    return [time, chest[index]]
                })
                const biceps = improvements.map(improvement => improvement.biceps)
                this.series[1].data = dateTime.map((time, index) => {
                    return [time, biceps[index]]
                })
                const quadriceps = improvements.map(improvement => improvement.quadriceps)
                this.series[2].data = dateTime.map((time, index) => {
                    return [time, quadriceps[index]]
                })
            })
        },
    },
    created() {
        this.loadBodyMeasure()
    }

}
</script>
