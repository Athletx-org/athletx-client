<template>
  <v-container class="te">
    <v-row class="mt-md-15" justify="center">
      <v-col cols="12" xs="12" md="6" l="5" xl="5">
        <v-card>
          <v-card-title>Weight</v-card-title>
          <WeightLineChart></WeightLineChart>
        </v-card>
      </v-col>
      <v-col cols="12" xs="12" md="6" l="5" xl="5">
        <v-card>
          <v-card-title>Body Measures</v-card-title>
          <BodyMeasuresLineChart></BodyMeasuresLineChart>
        </v-card>
      </v-col>
    </v-row>

    <v-row class="mt-md-15" justify="center">
      <v-col cols="12" xs="12" md="4" l="3" xl="2">
        <v-card>
          <v-card-title>Created Workouts</v-card-title>
          <ColumnChart></ColumnChart>
        </v-card>
      </v-col>
      <v-col cols="12" xs="12" md="7" l="3" xl="3">
        <v-card>
          <v-card-title>Most performed exercises</v-card-title>
          <ExerciseChart></ExerciseChart>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import ColumnChart from "@/components/columnChart/ColumnChart";
import WeightLineChart from "@/components/weightLineChart/WeightLineChart";
import BodyMeasuresLineChart from "@/components/bodyMeasuresLineChart/BodyMeasuresLineChart";
import ExerciseChart from "@/components/exerciseChart/ExerciseChart";



export default {
  name: "Analytics",
  components: {
    ColumnChart: ColumnChart,
    WeightLineChart: WeightLineChart,
    BodyMeasuresLineChart: BodyMeasuresLineChart,
    ExerciseChart: ExerciseChart
  },
  data() {
    return {
    }
  }
}


</script>
<style src="./Analytics.scss" lang="scss" scoped/>