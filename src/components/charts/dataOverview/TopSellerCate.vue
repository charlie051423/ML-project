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
      return toRaw(this.store.trainData);
    },
    testData() {
      return toRaw(this.store.testData);
    },
    prdCateSum2021() {
      let data = [...this.trainData].map(d => {
        return {
          ...d,
          QTY_SALES: Number(d.QTY_SALES)
        }
      });
      return _(data)
        .groupBy('PRD_CATEGORY')
        .map((v, id) => ({
          PRD_CATEGORY: id,
          QTY_SALES: _.sumBy(v, 'QTY_SALES'),
        }))
        .value().sort((a, b) => b.QTY_SALES - a.QTY_SALES).slice(0, 5)
    },
    prdCateSum2022() {
      let data = [...this.testData].map(d => {
        return {
          ...d,
          QTY_SALES: Number(d.QTY_SALES)
        }
      });
      return _(data)
        .groupBy('PRD_CATEGORY')
        .map((v, id) => ({
          PRD_CATEGORY: id,
          QTY_SALES: _.sumBy(v, 'QTY_SALES'),
        }))
        .value().sort((a, b) => b.QTY_SALES - a.QTY_SALES).slice(0, 5)
    },
    categories() {
      return [...new Set(this.prdCateSum2021.map(d => d.PRD_CATEGORY.trim()).concat(this.prdCateSum2022.map(d => d.PRD_CATEGORY.trim())))];
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
          bar: {
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
          let data_2021 = this.prdCateSum2021.find(d => d.PRD_CATEGORY.trim() == c);
          let data_2022 = this.prdCateSum2022.find(d => d.PRD_CATEGORY.trim() == c);
          return {
            name: c,
            data: [(data_2021?.QTY_SALES || 0), (data_2022?.QTY_SALES || 0)]
          }
        })
      }
    }
  }
}
</script>

<style scoped>

</style>
