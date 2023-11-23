<template>
  <div class="fill-height">
    <highcharts ref="chart" :options="chartOptions"></highcharts>
  </div>
</template>

<script>
import {useAppStore} from "@/store/app";
import Highcharts from 'highcharts';
import bellCurve from 'highcharts/modules/histogram-bellcurve'
import {toRaw} from "vue";

bellCurve(Highcharts);

export default {
  props: ["title"],
  data() {
    return {
      store: useAppStore()
    }
  },
  mounted() {
    this.$refs.chart.chart.addSeries({
      name: 'Standardized Sales',
      data: this.rawData
    });
  },
  methods: {
    binData(data) {
      let hData = [], // the output array
        size = data.length, // how many data points
        bins = Math.round(Math.sqrt(size)); // determine how many bins we need
      bins = bins > 50 ? 50 : bins; // adjust if more than 50 cells
      let max = Math.max.apply(null, data), // lowest data value
        min = Math.min.apply(null, data), // highest data value
        range = max - min, // total range of the data
        width = range / bins, // size of the bins
        binBottom, // placeholders for the bounds of each bin
        binTop;

      // loop through the number of cells
      for (let i = 0; i < bins; i++) {

        // set the upper and lower limits of the current cell
        binBottom = min + (i * width);
        binTop = binBottom + width;

        // . check for and set the x value of the bin
        if (!hData[i]) {
          hData[i] = [];
          hData[i][0] = binBottom + (width / 2);
        }

        // loop through the data to see if it fits in this bin
        for (let j = 0; j < size; j++) {
          let x = data[j];

          // adjust if it's the first pass
          binBottom = i === 0 && j === 0 ? binBottom -= 1 : binBottom;

          // if it fits in the bin, add it
          if (x > binBottom && x <= binTop) {
            hData[i][1] = !hData[i][1] ? 1 : hData[i][1] += 1;
          }
        }
      }
      hData.forEach((point, i) => {
        if (typeof point[1] === 'undefined') {
          hData[i][1] = null;
        }
      });
      return hData;
    },
  },

  computed: {
    selectedThreshold() {
      return toRaw(this.store.chartThreshold);
    },
    rawData() {
      let tmpData = toRaw(this.store.trainData);
      return this.binData(tmpData.map(d => Number(d.STD_SALES)));
    },
    chartOptions() {
      return {
        chart: {
          type: 'column',
        },
        title: {
          text: this.title,
          align: "left"
        },
        plotOptions: {
          series: {
            minPointLength: 2,
            pointPadding: 0,
            groupPadding: 0,
            borderWidth: 0.5,
            borderColor: 'rgba(255,255,255,0.5)'
          }
        },
        xAxis: [{
          title: {
            text: 'Standardized Sales'
          }
        }],
        yAxis: {
          title: {
            text: 'Count'
          },
          maxPadding: 0,
          endOnTick: false
        },
        credits: false,
      }
    }
  }
}
</script>

<style scoped>

</style>
