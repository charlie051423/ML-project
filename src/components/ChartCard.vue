<template>
  <v-card
    class="flex-grow-1"
    height="100%"

  >
    <component class="chart_component" v-if="!!component" :is="{...component}" :title="title" :opt="opt"/>
  </v-card>
</template>

<script>
export default {
  name: "ChartCard",
  props: {
    height: {
      type: Number,
      default: 600,
    },
    title: {
      type: String,
      default: "N/A"
    },
    opt: {
      type: String,
      default: "N/A"
    },
    component: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      items: [],
      selectedItem: null
    }
  },

}
</script>

<style>
.chart_component > div {
  height: 100%;
}
</style>
