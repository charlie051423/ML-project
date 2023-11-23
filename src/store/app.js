// Utilities
import {defineStore} from 'pinia'

export const useAppStore = defineStore('app', {
  state: () => ({
    isLoadingStatus: true,
    threshold: 0.01,
    dataOverview: {
      train: [],
      test: []
    },
    imgModel: {
      trainResult: [],
      testResult: [],
      trainClsTable: [],
      testClsTable: [],

      resNetOutputTrain: [],
      resNetOutputTest: [],
    },
    textModel: {
      clsTable: [],
      result: [],
    },
    combinedModel: {
      clsTable: [],
      result: [],
    },
  }),
  getters: {
    isLoading(state) {
      return state.isLoadingStatus;
    },
    chartThreshold(state) {
      return state.threshold;
    },
    trainData(state) {
      return state.dataOverview.train;
    },
    testData(state) {
      return state.dataOverview.test;
    },
    imgModelTrainResult(state) {
      return state.imgModel.trainResult;
    },
    imgModelTestResult(state) {
      return state.imgModel.testResult;
    },
    imgModelTrainClsTable(state) {
      return state.imgModel.trainClsTable;
    },
    imgModelTestClsTable(state) {
      return state.imgModel.testClsTable;
    },
    imgModelResNetOutputTrain(state) {
      return state.imgModel.resNetOutputTrain;
    },
    imgModelResNetOutputTest(state) {
      return state.imgModel.resNetOutputTest;
    },
    textModelClsTable(state) {
      return state.textModel.clsTable;
    },
    textModelResult(state) {
      return state.textModel.result;
    },
    combinedModelClsTable(state) {
      return state.combinedModel.clsTable;
    },
    combinedModelResult(state) {
      return state.combinedModel.result;
    },
  },
  actions: {
    setLoading(data) {
      this.isLoadingStatus = data;
    },
    setThreshold(data) {
      this.threshold = data;
    },
    setTrainingData(data) {
      this.dataOverview.train = data;
    },
    setTestingData(data) {
      this.dataOverview.test = data;
    },
    setImgModelTrainResult(data) {
      this.imgModel.trainResult = data;
    },
    setImgModelTestResult(data) {
      this.imgModel.testResult = data;
    },
    setImgModelTrainClsTable(data) {
      this.imgModel.trainClsTable = data;
    },
    setImgModelTestClsTable(data) {
      this.imgModel.testClsTable = data;
    },
    setImgModelResNetOutputTrain(data) {
      this.imgModel.resNetOutputTrain = data;
    },
    setImgModelResNetOutputTest(data) {
      this.imgModel.resNetOutputTest = data;
    },
    setTextModelClsTable(data) {
      this.textModel.clsTable = data;
    },
    setTextModelResult(data) {
      this.textModel.result = data;
    },
    setCombinedModelClsTable(data) {
      this.combinedModel.clsTable = data;
    },
    setCombinedModelResult(data) {
      this.combinedModel.result = data;
    }
  }
})
