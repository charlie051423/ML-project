<template>
  <div class="fill-height">
    <highcharts :options="chartOptions"></highcharts>
  </div>
</template>

<script>
import {useAppStore} from "@/store/app";
import {toRaw} from "vue";

export default {
  name: "TopSellerCate",
  props: ["title", "opt"],
  data() {
    return {
      store: useAppStore()
    }
  },
  mounted() {
    console.log("kkk", this.rawData)
  },
  computed: {
    selectedThreshold() {
      return toRaw(this.store.chartThreshold);
    },
    rawData() {
      return this.opt == "training" ? this.trainData : this.testData;
    },
    trainData() {
      let tmpData = toRaw(this.store.combinedModelResult);
      return tmpData.map(t => {
        return {
          threshold: Number(t["Threshold"]),
          accuracy: Number(t["training accuracy"]),
          recall: Number(t["training recall"]),
          precision: Number(t["training precision"]),
          f1: Number(t["training f1-score"]),
        }
      })
    },
    testData() {
      let tmpData = toRaw(this.store.combinedModelResult);
      return tmpData.map(t => {
        return {
          threshold: Number(t["Threshold"]),
          accuracy: Number(t["testing accuracy"]),
          recall: Number(t["testing recall"]),
          precision: Number(t["testing precision"]),
          f1: Number(t["testing f1-score"]),
        }
      })
    },
    chartOptions() {
      return {
        title: {
          text: this.title,
          align: 'left'
        },

        yAxis: {
          title: {
            text: 'Score'
          }
        },

        xAxis: {
          max: 0.1,
          title: {
            text: 'Threshold'
          }
        },
        tooltip: {
          formatter: function () {
            return `Threshold ${this.x.toFixed(2)}<br />${this.series.name}: ${this.y}`;
          }
        },
        legend: {
          layout: 'vertical',
          align: 'right',
          verticalAlign: 'middle'
        },

        plotOptions: {
          series: {
            label: {
              connectorAllowed: false
            },
            pointStart: 0.01,
            pointInterval: 0.01,
            // pointIntervalUnit: 4,
          },
        },

        series: [
          {
            name: 'Accuracy',
            data: this.rawData.map(d => d.accuracy)
          },
          {
            name: 'Precision',
            data: this.rawData.map(d => d.precision)
          },
          {
            name: 'Recall',
            data: this.rawData.map(d => d.recall)
          },
          {
            name: 'F1-Score',
            data: this.rawData.map(d => d.f1)
          }
        ],
        credits: false
      }
    }
  }
}
</script>

<style scoped>

</style>
