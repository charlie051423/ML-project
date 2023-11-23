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
          <ChartCard title="Final Result" :component="TextModelResult"/>
        </v-col>
      </v-row>

    </v-responsive>
  </v-container>
</template>

<script>
import ChartCard from "@/components/ChartCard.vue";
import {defineComponent} from "vue";

import ClassPieTrain from "@/components/charts/textModel/ClassPieTrain.vue";
import ClassPieTest from "@/components/charts/textModel/ClassPieTest.vue";

import TextModelResult from "@/components/charts/textModel/TextModelResult.vue";

export default defineComponent({
  components: {ChartCard},
  data() {
    return {
      ClassPieTrain: ClassPieTrain,
      ClassPieTest: ClassPieTest,

      TextModelResult: TextModelResult
    }
  },
})


</script>
<style lang="scss" scoped>
.chart_row:first-child {
  height: 30%;
}

.chart_row:last-child {
  height: 60%;
}
</style>
