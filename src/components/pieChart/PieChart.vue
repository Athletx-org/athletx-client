<template>
  <apexchart type="pie" width="380" :options="chartOptions" :series="series"></apexchart>
</template>
<script>
import VueApexCharts from "vue3-apexcharts";

export default {
  name: "pieChart",
  props: {
    series: [],
    labels: []
  },
  components: {
    apexchart: VueApexCharts,
  },
  data() {
    return {
      chartOptions: {
        labels: this.labels,
        responsive: [{
          breakpoint: 480,
          options: {
            chart: {
              width: 200
            },
            legend: {
              position: 'bottom'
            }
          }
        }]
      },
    }
  }
}

</script>
