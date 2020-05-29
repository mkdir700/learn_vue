import Vue from 'vue'
import App from './App.vue'
import router from './router'

/*导入全局样式表*/
import './assets/css/global.css'

/*使用elementUI*/
// import ElementUI from 'element-ui';
import './plugins/element'
import 'element-ui/lib/theme-chalk/index.css'
// Vue.use(ElementUI)

/*配置axios*/
import axios from 'axios'

axios.defaults.baseURL = "http://127.0.0.1:9999/api/private/v1/"
Vue.prototype.$http = axios

/*配置axios请求拦截*/
axios.interceptors.request.use(config => {
    config.headers.Authorization = window.sessionStorage.getItem('token')
    return config
})

Vue.config.productionTip = false

new Vue({
    router,
    render: h => h(App),
}).$mount('#app')
