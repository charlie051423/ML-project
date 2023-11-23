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
        <v-col class="fill-height" cols="3">
          <ChartCard title="Vendor Distribution (2021)" :component="VendorTrain"/>
        </v-col>
        <v-col class="fill-height" cols="3">
          <ChartCard title="Brand Distribution (2021)" :component="VendorTest"/>
        </v-col>
        <v-col class="fill-height" cols="3">
          <ChartCard title="Vendor Distribution (2022)" :component="BrandTrain"/>
        </v-col>
        <v-col class="fill-height" cols="3">
          <ChartCard title="Brand Distribution (2022)" :component="BrandTest"/>
        </v-col>
      </v-row>
      <v-row class="chart_row d-flex">
        <v-col class="fill-height" cols="4">
          <ChartCard title="STD Sales Distribution (Training)" :component="StdDistTrain"/>
        </v-col>
        <v-col class="fill-height" cols="4">
          <ChartCard title="STD Sales Distribution (Testing)" :component="StdDistTest"/>
        </v-col>
        <v-col class="fill-height" cols="4">
          <ChartCard title="Top Product Category" :component="TopSellerCate"/>
        </v-col>
      </v-row>
    </v-responsive>
  </v-container>
</template>

<script>
import ChartCard from "@/components/ChartCard.vue";
import {defineComponent} from "vue";

// Charts
import ClassPieTrain from "@/components/charts/dataOverview/ClassPieTrain.vue";
import ClassPieTest from "@/components/charts/dataOverview/ClassPieTest.vue";

import VendorTrain from "@/components/charts/dataOverview/VendorTrain.vue";
import VendorTest from "@/components/charts/dataOverview/VendorTest.vue";
import BrandTrain from "@/components/charts/dataOverview/BrandTrain.vue";
import BrandTest from "@/components/charts/dataOverview/BrandTest.vue";

import StdDistTrain from "@/components/charts/dataOverview/StdDistTrain.vue";
import StdDistTest from "@/components/charts/dataOverview/StdDistTest.vue";
import TopSellerCate from "@/components/charts/dataOverview/TopSellerCate.vue";

export default defineComponent({
  components: {ChartCard},
  data() {
    return {
      ClassPieTrain: ClassPieTrain,
      ClassPieTest: ClassPieTest,

      VendorTrain: VendorTrain,
      VendorTest: VendorTest,
      BrandTrain: BrandTrain,
      BrandTest: BrandTest,

      StdDistTrain: StdDistTrain,
      StdDistTest: StdDistTest,
      TopSellerCate: TopSellerCate,
    }
  },
})
</script>
<style lang="scss" scoped>
.chart_row {
  height: 30%;
}
</style>
