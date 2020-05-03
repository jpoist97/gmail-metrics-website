import Vue from 'vue'
import Vuex from 'vuex'
import EventService from '../services/EventService';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    fGmailData: [],
    tGmailData: [],
    fOtherData: [],
    tOtherData: [],
    completed: false,
    isLoading: true
  },
  mutations: {
    APPEND_FGMAILDATA(state, fGmailData){
      state.fGmailData.push(fGmailData);
    },
    APPEND_TGMAILDATA(state, tGmailData){
      state.tGmailData.push(tGmailData);
    },
    APPEND_FOTHERDATA(state, fOtherData){
      state.fOtherData.push(fOtherData);
    },
    APPEND_TOTHERDATA(state, tOtherData){
      state.tOtherData.push(tOtherData);
    },
    SORT_METRICS(state){
      state.fGmailData.sort((a,b) => (a[0] > b[0]) ? 1:-1);
      state.tGmailData.sort((a,b) => (a[0] > b[0]) ? 1:-1);
      state.fOtherData.sort((a,b) => (a[0] > b[0]) ? 1:-1);
      state.tOtherData.sort((a,b) => (a[0] > b[0]) ? 1:-1);
    },
    FINISH_LOAD(state){
      // Waiting a small amount of time so that Highcharts can plot properly
      setTimeout(() => {
        state.isLoading = false;
        state.completed = true;
      }, 250)
    }
  },
  actions: {
    fetchMetrics({ commit }, date){
      let dateArr = date.split('-')

        EventService.getDailyMetrics(date)
          .then(response => {
            if(response.data.metrics.Items){
              for(let item of response.data.metrics.Items){
                commit('APPEND_FGMAILDATA', [Date.UTC(dateArr[0], dateArr[1], dateArr[2], item.Hour), item['from-gmail']]);
                commit('APPEND_TGMAILDATA', [Date.UTC(dateArr[0], dateArr[1], dateArr[2], item.Hour), item['to-gmail']]);
                commit('APPEND_FOTHERDATA', [Date.UTC(dateArr[0], dateArr[1], dateArr[2], item.Hour), item['from-other']]);
                commit('APPEND_TOTHERDATA', [Date.UTC(dateArr[0], dateArr[1], dateArr[2], item.Hour), item['to-other']]);
              }
            }
          })
          .then(() => {
            commit('SORT_METRICS');
          })
          .then(() => {
            commit('FINISH_LOAD');
          })
          .catch(error => {
            console.log("error "+ error);
          })

    },
  },
  modules: {
  }
})
