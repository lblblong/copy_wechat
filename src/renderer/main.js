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
  DatePicker,
  Option,
  Form,
  FormItem,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  Upload
} from 'element-ui'
Vue.use(Button)
Vue.use(Dialog)
Vue.use(Input)
Vue.use(Select)
Vue.use(TimePicker)
Vue.use(DatePicker)
Vue.use(Option)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Dropdown)
Vue.use(DropdownItem)
Vue.use(DropdownMenu)
Vue.use(Upload)

window.expressions = []
for (let i = 1; i <= 130; i++) {
  let img = require(`./assets/expressions/${i}.gif`)
  window.expressions.push({
    img,
    index: i
  })
}

import EventEmitter from 'eventemitter3'
window.globalEvent = new EventEmitter()

/* eslint-disable no-new */
new Vue({
  components: { App },
  router,
  store,
  template: '<App/>'
}).$mount('#app')
