// 引入创建应用实例的方法
import { createApp } from 'vue'
// 引入清除默认样式
import '@/style/reset.scss'
// 引入根组件App
import App from '@/App.vue'
// 引入全局组件——顶部、底部都是全局组件
import HospitalTop from '@/components/hospital_top/index.vue'
import HospitalBottom from '@/components/hospital_bottom/index.vue'
import Login from '@/components/login/index.vue'
import Visitor from '@/components/visitor/visitor.vue'
// 引入vue-router核心插件安装
import router from '@/router'
// 引入pinia仓库
import pinia from '@/store'

// 引入element-plus插件并安装
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
// 国际化文件
//@ts-ignore
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
// 引入路由鉴权文件
import './permission'

// 利用createApp方法创建应用实例，且将应用实例挂在带挂载点上
const app = createApp(App)
app.component('HospitalTop', HospitalTop);
app.component('HospitalBottom', HospitalBottom);
app.component('Login', Login)
app.component('Visitor', Visitor)
app.use(router)
app.use(pinia)
app.use(ElementPlus, {
    locale: zhCn,
  })

app.mount('#app')
