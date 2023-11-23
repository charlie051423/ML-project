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
        <v-col class="fill-height" cols="6">
          <ChartCard title="ResNet50V2 output (Training)" :component="ImgModelPredTrain"/>
        </v-col>
        <v-col class="fill-height" cols="6">
          <ChartCard title="ResNet50V2 output (Testing)" :component="ImgModelPredTest"/>
        </v-col>
      </v-row>

      <v-row class="chart_row d-flex">
        <v-col class="fill-height" cols="12">
          <ChartCard title="Final Result" :component="ImgModelResult"/>
        </v-col>
      </v-row>


    </v-responsive>
  </v-container>
</template>

<script>
import ChartCard from "@/components/ChartCard.vue";
import {defineComponent} from "vue";

// Charts
import ClassPieTrain from "@/components/charts/imgModel/ClassPieTrain.vue";
import ClassPieTest from "@/components/charts/imgModel/ClassPieTest.vue";

import ImgModelPredTrain from "@/components/charts/imgModel/ImgModelPredTrain.vue";
import ImgModelPredTest from "@/components/charts/imgModel/ImgModelPredTest.vue";

import ImgModelResult from "@/components/charts/imgModel/ImgModelResult.vue";

export default defineComponent({
  components: {ChartCard},
  data() {
    return {
      ClassPieTrain: ClassPieTrain,
      ClassPieTest: ClassPieTest,

      ImgModelPredTrain: ImgModelPredTrain,
      ImgModelPredTest: ImgModelPredTest,

      ImgModelResult: ImgModelResult,
    }
  },
})


</script>
<style lang="scss" scoped>
.chart_row {
  height: 30%;
}
</style>
