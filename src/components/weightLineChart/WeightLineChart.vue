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
                    name: "Weight",
                    data: []
                }
            ]
        }
    },
    methods: {
        loadWeight() {
            UserService.getAllUserImprovements(this.$store.state.auth.user._id).then((improvements) => {
                improvements.slice(0, 10)
                const dateTime = improvements.map(improvement => improvement.timeStamp)
                const weight = improvements.map(improvement => improvement.bodyWeight)
                this.series[0].data = dateTime.map((time, index) => {
                    return [time, weight[index]]
                })
            })
        },
    },
    created() {
        this.loadWeight()
    }

}
</script>
