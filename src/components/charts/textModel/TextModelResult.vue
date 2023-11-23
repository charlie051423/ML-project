<template>
  <div class="fill-height">
    <highcharts :options="chartOptions"></highcharts>
  </div>
</template>

<script>
import {useAppStore} from "@/store/app";
import {toRaw} from "vue";
import Highcharts from 'highcharts';

export default {
  props: ["title"],
  data() {
    return {
      store: useAppStore()
    }
  },
  mounted() {
    console.log("kkkk", this.rawData)
  },
  computed: {
    selectedThreshold() {
      return toRaw(this.store.chartThreshold);
    },
    rawData() {
      let tmpData = toRaw(this.store.textModelResult);
      return tmpData.find(d => d["Threshold"] == this.selectedThreshold);
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
            data: [Number(this.rawData["training accuracy"]), Number(this.rawData["testing accuracy"])]
          },
          {
            name: "Precision",
            data: [Number(this.rawData["training precision"]), Number(this.rawData["testing precision"])]
          },
          {
            name: "Recall",
            data: [Number(this.rawData["training recall"]), Number(this.rawData["testing recall"])]
          },
          {
            name: "F1-Score",
            data: [Number(this.rawData["training f1-score"]), Number(this.rawData["testing f1-score"])]
          },
        ]
      }
    }
  }
}
</script>

<style scoped>

</style>
