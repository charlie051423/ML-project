<template>
  <!--  <Dashboard />-->
  <v-card class="overflow-y-hidden">
    <v-layout>
      <v-navigation-drawer
        dark
      >
        <v-list class="mt-2">
          <v-list-item
            title="Book sales Prediction"
            subtitle="Dashboard"
          >
            <template v-slot:prepend>
              <v-avatar :rounded="1" style="background: #2979FF; color: #FFFFFF">
                C
              </v-avatar>
            </template>
          </v-list-item>
        </v-list>

        <v-divider></v-divider>
        <v-list v-if="!isLoading" v-model="selectedNav" nav>
          <v-list-item :active="v.name == selectedNav" v-for="(v, i) in navItems" :key="i" :title="v.name"
                       :prepend-icon="v.icon"
                       @click="selectedNav = v.name"
                       active-color="primary"
                       :value="v.name"></v-list-item>
        </v-list>
        <div style="height: 200px" v-else>
          <v-row class="fill-height" align="center" justify="center">
            <v-progress-circular
              :size="40"
              :width="5"
              indeterminate
            ></v-progress-circular>
          </v-row>
        </div>
      </v-navigation-drawer>
      <v-main style="height: 100vh; background: #F5F5F5">
        <div v-if="!isLoading && navComponent" class="fill-height">
          <v-row dense class="pa-2">
            <v-col cols="9">
              <div class="text-h6 pa-4">{{ selectedNav }}</div>
            </v-col>
            <v-col cols="3">
              <v-select v-model="selectedThreshold" density="compact" label="Threshold" :items="thresholdList"/>
            </v-col>
          </v-row>
          <component :is="{...navComponent}"/>
        </div>
        <div v-else class="fill-height">
          <v-row class="fill-height" align="center" justify="center">
            <v-progress-circular
              :size="70"
              :width="7"
              indeterminate
            ></v-progress-circular>
          </v-row>

        </div>
      </v-main>
    </v-layout>
  </v-card>
</template>

<script>
import DataOverview from "@/components/DataOverview.vue";
import ImgModel from "@/components/ImgModel.vue";
import TextModel from "@/components/TextModel.vue";
import CombinedModel from "@/components/CombinedModel.vue";
import {toRaw, shallowRef} from "vue";
import {useAppStore} from "@/store/app";

export default {
  data() {
    return {
      store: useAppStore(),
      navItems: [
        {name: "Data Overview", comp: shallowRef(DataOverview), icon: "mdi-magnify"},
        {name: "Image Model", comp: shallowRef(ImgModel), icon: "mdi-image"},
        {name: "Feature Model", comp: shallowRef(TextModel), icon: "mdi-database"},
        {name: "Combined Model", comp: shallowRef(CombinedModel), icon: "mdi-vector-combine"},
      ],
      selectedNav: "Data Overview",
      // selectedNav: "Image Model",
      thresholdList: [0.01, 0.02, 0.03, 0.04, 0.05, 0.06, 0.07, 0.08, 0.09, 0.1]
    }
  },
  computed: {
    isLoading() {
      return toRaw(this.store.isLoading);
    },
    selectedThreshold: {
      get() {
        return toRaw(this.store.chartThreshold);
      },
      set(val) {
        this.store.setThreshold(val)
      }
    },
    navComponent() {
      if (!this.selectedNav) return null;
      const targetNav = this.navItems.find(i => i.name == this.selectedNav);
      return targetNav ? targetNav.comp : null;
    }
  },
}
</script>
<style scoped>
</style>
