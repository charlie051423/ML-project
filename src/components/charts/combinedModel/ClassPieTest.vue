<template>
  <div class="fill-height">
    <highcharts :options="chartOptions"></highcharts>
  </div>
</template>

<script>
import {useAppStore} from "@/store/app";
import {toRaw} from "vue";

export default {
  name: "ClassPie",
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
    rawData() {
      let tmpData = toRaw(this.store.combinedModelClsTable);
      return tmpData.find(d => d.threshold == this.selectedThreshold);
    },
    chartOptions() {
      return {
        chart: {
          plotBackgroundColor: null,
          plotBorderWidth: null,
          plotShadow: false,
          type: 'pie'
        },
        title: {
          text: this.title,
          align: "left",
        },
        subtitle: {
          useHTML: true,
          text: `<div class="d-flex flex-column align-center mt-4 font-weight-bold">
                    <span class="text-h6 primary--text">${Number(this.rawData["testing_cls_0"]) + Number(this.rawData["testing_cls_1"])}</span>
                    <span>Total Count</span>
                </div>`,
          align: "center",
          verticalAlign: "middle"
        },
        tooltip: {
          pointFormat: '{series.name}: <b>{point.y}</b>'
        },
        accessibility: {
          point: {
            valueSuffix: '%'
          }
        },
        plotOptions: {
          pie: {
            cursor: 'pointer',
            dataLabels: {
              enabled: true,
              format: '<b>{point.name}</b>: {point.percentage:.1f} %'
            },
            innerSize: "60%",
            size: "100%"
          }
        },
        series: [{
          name: 'Count',
          colorByPoint: true,
          data: [{
            name: 'Class 0',
            y: Number(this.rawData["testing_cls_0"]),
          }, {
            name: 'Class 1',
            y: Number(this.rawData["testing_cls_1"]),
          }]
        }],
        credits: false
      }
    }
  }
}
</script>

<style scoped>

</style>
