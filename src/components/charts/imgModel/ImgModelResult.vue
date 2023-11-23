<template>
  <div class="fill-height">
    <highcharts :options="chartOptions"></highcharts>
  </div>
</template>

<script>
import {useAppStore} from "@/store/app";
import _ from "lodash";
import {toRaw} from "vue";
import Highcharts from 'highcharts';

export default {
  name: "TopSellerCate",
  props: ["title"],
  data() {
    return {
      store: useAppStore()
    }
  },
  computed: {
    selectedThreshold() {
      return toRaw(this.store.chartThreshold);
    },
    trainData() {
      let tmpData = toRaw(this.store.imgModelTrainClsTable);
      return tmpData.find(d => d.threshold == this.selectedThreshold)?.data || [];
    },
    testData() {
      let tmpData = toRaw(this.store.imgModelTestClsTable);
      return tmpData.find(d => d.threshold == this.selectedThreshold)?.data || [];
    },
    accDataTrain() {
      let tmpData = toRaw(this.store.imgModelTrainResult);
      tmpData = tmpData.find(d => d.threshold == this.selectedThreshold)?.data || [];
      return tmpData.filter(d => d.CORRECT_PRED === "Yes").length / tmpData.length;
    },
    accDataTest() {
      let tmpData = toRaw(this.store.imgModelTestResult);
      tmpData = tmpData.find(d => d.threshold == this.selectedThreshold)?.data || [];
      return tmpData.filter(d => d.CORRECT_PRED === "Yes").length / tmpData.length;
    },
    chartOptions() {
      return {
        chart: {
          type: 'bar'
        },
        title: {
          text: this.title,
          align: 'left'
        },
        xAxis: {
          categories: ["Year 2021", "Year 2022"],
          title: {
            text: null
          }
        },
        yAxis: {
          title: {
            text: 'Score',
            // align: 'high'
          },
          labels: {
            overflow: 'justify'
          }
        },
        // tooltip: {
        //   valueSuffix: ' millions'
        // },
        plotOptions: {
          bar: {
            dataLabels: {
              enabled: true,
              formatter: function () {
                return Highcharts.numberFormat(this.y, 2);
              }
            },
          },

        },
        legend: {
          enable: true
        },
        credits: {
          enabled: false
        },
        series: [
          {
            name: "Accuracy",
            data: [Number(this.accDataTrain), Number(this.accDataTest)]
          },
          {
            name: "Precision",
            data: [Number(this.trainData[4].precision), Number(this.testData[4].precision)]
          },
          {
            name: "Recall",
            data: [Number(this.trainData[4].recall), Number(this.testData[4].recall)]
          },
          {
            name: "F1-Score",
            data: [Number(this.trainData[4]["f1-score"]), Number(this.testData[4]["f1-score"])]
          },
        ]
      }
    }
  }
}
</script>

<style scoped>

</style>
