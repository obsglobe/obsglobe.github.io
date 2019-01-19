// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import 'vuetify/dist/vuetify.min.css'
import Vuetify from 'vuetify'
import VueResource from 'vue-resource'
import * as d3 from 'd3'
import * as topojson from 'topojson'

Vue.config.productionTip = false
Vue.prototype.$d3 = d3
Vue.prototype.$topojson = topojson
Vue.use(VueResource)
Vue.use(Vuetify)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
