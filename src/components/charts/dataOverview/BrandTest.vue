<template>
  <div class="fill-height">
    <highcharts ref="chart" :options="chartOptions"></highcharts>
  </div>
</template>

<script>
import {useAppStore} from "@/store/app";
import {toRaw} from "vue";
import Highcharts from 'highcharts';
import Heatmap from 'highcharts/modules/heatmap'
import Treemap from 'highcharts/modules/treemap'

Treemap(Highcharts);
Heatmap(Highcharts);

export default {
  name: "Brand",
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
      return toRaw(this.store.testData);
    },
    categories() {
      return [...new Set(this.rawData.map(d => d.BRAND))];
    },
    seriesData() {
      let data = this.categories.map(c => {
        const target = this.rawData.filter(d => d.BRAND == c);
        return {
          name: c,
          value: target.length || 0,
          colorValue: target.length || 0
        }
      });
      return data.filter(d => d.value > 1).sort((a, b) => b.value - a.value).slice(0, 15);
    },
    chartOptions() {
      return {
        // chart: {
        //   height: '28%'
        // },
        title: {
          text: this.title,
          align: "left"
        },
        colorAxis: {
          minColor: '#BBDEFB',
          maxColor: '#2962FF'
        },
        series: [{
          type: 'treemap',
          layoutAlgorithm: 'squarified',
          data: this.seriesData
          //   [{
          //   name: 'A',
          //   value: 6,
          //   colorValue: 2
          // }, {
          //   name: 'B',
          //   value: 6,
          //   colorValue: 5
          // }]
        }],
        credits: false
      }
    }
  }
}
</script>
