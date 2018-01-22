import Vue from 'vue'
import App from './App.vue'
import Vuex from 'vuex'
import { store as _store } from "./store";

Vue.use(Vuex)

const store = new Vuex.Store(_store)

new Vue({
  el: '#app',
  store,
  render: h => h(App)
})
