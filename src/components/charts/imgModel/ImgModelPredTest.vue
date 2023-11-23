<template>
  <div class="fill-height">
    <highcharts :options="chartOptions"></highcharts>
  </div>
</template>

<script>
import {useAppStore} from "@/store/app";
import _ from "lodash";
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
      let tmpData = toRaw(this.store.imgModelResNetOutputTest);
      let result = _.countBy([...tmpData], 'output');
      return Object.entries(result).map(d => {
        return {
          name: d[0],
          value: d[1]
        }
      }).sort((a, b) => b.value - a.value).slice(0, 10);
    },
    categories() {
      return [...new Set(this.rawData.map(d => d.name))];
    },
    chartOptions() {
      return {
        chart: {
          type: 'column'
        },
        title: {
          text: this.title,
          align: 'left'
        },
        xAxis: {
          categories: ["Model Output"],
          title: {
            text: null
          }
        },
        yAxis: {
          title: {
            text: 'Count',
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
          column: {
            dataLabels: {
              enabled: true
            },
          },
        },
        legend: {
          enable: true
        },
        credits: {
          enabled: false
        },
        series: this.categories.map(c => {
          let data = this.rawData.find(d => d.name == c)
          return {
            name: c,
            data: [(data?.value || 0)]
          }
        })
      }
    }
  }
}
</script>

<style scoped>

</style>
