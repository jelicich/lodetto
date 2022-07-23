import Vue from 'vue'
import App from './App.vue'
import Loading from "@/directives/Loading/Loading.directive";
import "@/styles/styles.scss"

Vue.config.productionTip = false

export const bus = new Vue();

Vue.directive("loading", Loading);

new Vue({
  render: h => h(App),
}).$mount('#app')
