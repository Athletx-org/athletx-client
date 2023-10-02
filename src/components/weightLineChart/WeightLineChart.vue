<template>
    <apexchart type="line" height="350" :options="chartOptions" :series="series"></apexchart>
</template>
<script>
import VueApexCharts from "vue3-apexcharts";

export default {
    name: "Analytics",
    components: {
        apexchart: VueApexCharts,
    },
    data() {
        return {
            series: [{
                name: 'Weight',
                data: [4, 3, 10, 9, 29, 19, 22, 9, 12, 7, 19, 5, 13, 9, 17, 2, 7, 5]
            }],
            chartOptions: {
                title: {
                    text: 'Weight',
                    align: 'left',
                    style: {
                        fontSize: "16px",
                        color: '#666'
                    }
                },
                chart: {
                    height: 350,
                    type: 'line',
                },
                stroke: {
                    width: 5,
                    curve: 'smooth'
                },
                xaxis: {
                    type: 'datetime',
                    categories: ['1/11/2000', '2/11/2000', '3/11/2000', '4/11/2000', '5/11/2000', '6/11/2000', '7/11/2000', '8/11/2000', '9/11/2000', '10/11/2000', '11/11/2000', '12/11/2000', '1/11/2001', '2/11/2001', '3/11/2001', '4/11/2001', '5/11/2001', '6/11/2001'],
                    tickAmount: 10,
                    labels: {
                        formatter: function (value, timestamp, opts) {
                            return opts.dateFormatter(new Date(timestamp), 'dd MMM')
                        }
                    }
                },

                yaxis: {
                    min: -10,
                    max: 40
                }
            },
        }
    }
}


</script>
