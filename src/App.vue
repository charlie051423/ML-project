<template>
  <router-view/>
</template>

<script>
import {toRaw} from 'vue';
import csvtojson from 'csvtojson'
import axios from 'axios'
import {useAppStore} from "./store/app";

export default {
  name: "ChartCard",
  async mounted() {
    this.isLoading = true;
    await this.loadDataOverview();
    await this.loadImgModelData();
    await this.loadTextModelData();
    await this.loadCombinedModelData();
    this.isLoading = false;
  },
  data() {
    return {
      store: useAppStore()
    }
  },
  methods: {
    async readCsvToJSON(filename) {
      const options = {
        url: `./data/${filename}`,
        responseType: 'stream',
      };
      const axiosResponse = await axios(options);
      const jsonObj = await csvtojson().fromString(axiosResponse.data)
      return jsonObj;
    },
    async loadDataOverview() {
      this.trainingData = await this.readCsvToJSON(`data_overview/df_2021.csv`);
      this.testingData = await this.readCsvToJSON(`data_overview/df_2022.csv`);
    },
    async loadImgModelData() {
      let tmpResult;
      for (let i = 1; i < 11; i++) {
        const threshold = i / 100;

        // Load Img Model Training Result
        tmpResult = await this.readCsvToJSON(`imgModel/train_pred_${threshold}.csv`);
        this.imgModelTrainResult.push({threshold: threshold, data: tmpResult});

        // Load Img Model Testing Result
        tmpResult = await this.readCsvToJSON(`imgModel/test_pred_${threshold}.csv`);
        this.imgModelTestResult.push({threshold: threshold, data: tmpResult});

        // Load Img Model Training Cls Table
        tmpResult = await this.readCsvToJSON(`imgModel/train_cls_${threshold}.csv`);
        this.imgModelTrainClsTable.push({threshold: threshold, data: tmpResult});

        // Load Img Model Testing Cls Table
        tmpResult = await this.readCsvToJSON(`imgModel/test_cls_${threshold}.csv`);
        this.imgModelTestClsTable.push({threshold: threshold, data: tmpResult});
      }
      // Load ResNetOutput
      this.imgModelResNetOutputTrain = await this.readCsvToJSON(`imgModel/resnet50v2_train_output.csv`);
      this.imgModelResNetOutputTest = await this.readCsvToJSON(`imgModel/resnet50v2_test_output.csv`);
      this.imgModelResNetOutputTrain = this.imgModelResNetOutputTrain.map(d => {
        let f = d.pred.replace("(", "");
        f = f.replace(")", "");
        f = eval(f);
        return {
          ...d,
          output: f[1]
        }
      });
      this.imgModelResNetOutputTest = this.imgModelResNetOutputTest.map(d => {
        let f = d.pred.replace("(", "");
        f = f.replace(")", "");
        f = eval(f);
        return {
          ...d,
          output: f[1]
        }
      });
    },
    async loadTextModelData() {
      this.textModelClsTable = await this.readCsvToJSON(`textModel/cls.csv`);
      this.textModelResult = await this.readCsvToJSON(`textModel/result.csv`);
    },
    async loadCombinedModelData() {
      this.combinedModelClsTable = await this.readCsvToJSON(`combinedModel/cls.csv`);
      this.combinedModelResult = await this.readCsvToJSON(`combinedModel/result.csv`);
    }
  },
  computed: {
    isLoading: {
      get() {
        return toRaw(this.store.isLoading);
      },
      set(val) {
        this.store.setLoading(val)
      }
    },
    trainingData: {
      get() {
        return toRaw(this.store.trainData);
      },
      set(val) {
        this.store.setTrainingData(val)
      }
    },
    testingData: {
      get() {
        return toRaw(this.store.testData);
      },
      set(val) {
        this.store.setTestingData(val)
      }
    },
    imgModelTrainResult: {
      get() {
        return toRaw(this.store.imgModelTrainResult);
      },
      set(val) {
        this.store.setImgModelTrainResult(val)
      }
    },
    imgModelTestResult: {
      get() {
        return toRaw(this.store.imgModelTestResult);
      },
      set(val) {
        this.store.setImgModelTestResult(val)
      }
    },
    imgModelTrainClsTable: {
      get() {
        return toRaw(this.store.imgModelTrainClsTable);
      },
      set(val) {
        this.store.setImgModelTrainClsTable(val)
      }
    },
    imgModelTestClsTable: {
      get() {
        return toRaw(this.store.imgModelTestClsTable);
      },
      set(val) {
        this.store.setImgModelTestClsTable(val)
      }
    },
    imgModelResNetOutputTrain: {
      get() {
        return toRaw(this.store.imgModelResNetOutputTrain);
      },
      set(val) {
        this.store.setImgModelResNetOutputTrain(val)
      }
    },
    imgModelResNetOutputTest: {
      get() {
        return toRaw(this.store.imgModelResNetOutputTest);
      },
      set(val) {
        this.store.setImgModelResNetOutputTest(val)
      }
    },
    textModelClsTable: {
      get() {
        return toRaw(this.store.textModelClsTable);
      },
      set(val) {
        this.store.setTextModelClsTable(val)
      }
    },
    textModelResult: {
      get() {
        return toRaw(this.store.textModelResult);
      },
      set(val) {
        this.store.setTextModelResult(val)
      }
    },
    combinedModelClsTable: {
      get() {
        return toRaw(this.store.combinedModelClsTable);
      },
      set(val) {
        this.store.setCombinedModelClsTable(val)
      }
    },
    combinedModelResult: {
      get() {
        return toRaw(this.store.combinedModelResult);
      },
      set(val) {
        this.store.setCombinedModelResult(val)
      }
    },
  }
}
</script>
