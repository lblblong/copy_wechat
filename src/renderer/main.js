import Vue from 'vue'
import axios from 'axios'

import App from './App'
import router from './router'
import store from './store'

import '@/icons/style.css'
import '@/style/normalize.css'

if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
Vue.http = Vue.prototype.$http = axios
Vue.config.productionTip = false

import 'element-ui/lib/theme-chalk/index.css'
import {
  Button,
  Dialog,
  Input,
  Select,
  TimePicker,
  DatePicker
} from 'element-ui'
Vue.use(Button)
Vue.use(Dialog)
Vue.use(Input)
Vue.use(Select)
Vue.use(TimePicker)
Vue.use(DatePicker)

/* eslint-disable no-new */
new Vue({
  components: { App },
  router,
  store,
  template: '<App/>'
}).$mount('#app')
