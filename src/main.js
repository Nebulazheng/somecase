import Vue from 'vue'
import App from './App.vue'
import router from './router/router'
import store from './store/store'
import i18n from './lang'
import './plugins/element.js'
import './directive/premissionBtn'
import './assets/css/public.css'
import './element-variables.scss'
import FormMaking from '@/views/formDesign/index'
import VueParticles from 'vue-particles'
import VueClipboard from 'vue-clipboard2'
import { messages } from './assets/js/common'
import moment from 'moment'//导入文件
import VueQuillEditor from 'vue-quill-editor'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// 引入字体文件
import '@/assets/icon/iconfont.css'
import '@/assets/icon/iconfont.js'
Vue.use(ElementUI);
Vue.use(VueQuillEditor);
     
     moment.locale('zh-cn');//需要汉化
Vue.use(VueParticles)
Vue.use(FormMaking)
Vue.use(VueClipboard)
//全局挂载提示框
Vue.prototype.$moment = moment;//赋值使用
Vue.prototype.$message = messages
Vue.config.productionTip = false
new Vue({
    i18n,
    router,
    store,
    render: h => h(App)
}).$mount('#app')