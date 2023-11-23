<template>
  <v-container class="fill-height">
    <v-responsive class="d-flex fill-height">

      <v-row class="chart_row d-flex">
        <v-col class="fill-height" cols="6">
          <ChartCard title="Class Distribution (2021)" :component="ClassPieTrain"/>
        </v-col>
        <v-col class="fill-height" cols="6">
          <ChartCard title="Class Distribution (2022)" :component="ClassPieTest"/>
        </v-col>
      </v-row>

      <v-row class="chart_row d-flex">
        <v-col class="fill-height" cols="12">
          <ChartCard title="Final Result" :component="CombinedModelResult"/>
        </v-col>
      </v-row>
      <v-row class="chart_row d-flex">
        <v-col class="fill-height" cols="6">
          <ChartCard title="Overall Comparison (Training)" opt="training" :component="CombinedModelAllThreshold"/>
        </v-col>
        <v-col class="fill-height" cols="6">
          <ChartCard title="Overall Comparison (Testing)" opt="testing" :component="CombinedModelAllThreshold"/>
        </v-col>
      </v-row>
    </v-responsive>
  </v-container>
</template>

<script>
import ChartCard from "@/components/ChartCard.vue";
import {defineComponent} from "vue";

import ClassPieTrain from "@/components/charts/combinedModel/ClassPieTrain.vue";
import ClassPieTest from "@/components/charts/combinedModel/ClassPieTest.vue";

import CombinedModelResult from "@/components/charts/combinedModel/CombinedModelResult.vue";
import CombinedModelAllThreshold from "@/components/charts/combinedModel/CombinedModelAllThreshold.vue";

export default defineComponent({
  components: {ChartCard},
  data() {
    return {
      ClassPieTrain: ClassPieTrain,
      ClassPieTest: ClassPieTest,

      CombinedModelResult: CombinedModelResult,
      CombinedModelAllThreshold: CombinedModelAllThreshold
    }
  },
})


</script>
<style lang="scss" scoped>
.chart_row {
  height: 30%;
}
</style>
