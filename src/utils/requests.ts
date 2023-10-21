// 对于axios函数库进行二次封装
    // 目的：1.利用自带的请求、相应拦截器功能   2.请求拦截器，一般可以在请求头中携带公共参数token； 3.相应拦截器可以简化服务器返回的数据，处理http网络错误
import axios from 'axios'
import { ElMessage } from 'element-plus'
import useUserStore from '@/store/modules/user'
import { userInfo } from 'os'


// 利用axios.create方法创建一个axios实例：设置基础路径、超时时间的设置
const requests = axios.create({
    baseURL:'/api',//请求路径的基础设置
    timeout:5000
})

requests.interceptors.request.use((config) =>{
    // 获取用户仓库
    let userStore = useUserStore();
    if(userStore.userInfo.token){
        config.headers.token = userStore.userInfo.token
    }
    // config：请求拦截器回调注入的对象（配置对象的身上最重要的事情是headers属性
    // 可以通过请求头携带公共参数）
    return config
})

requests.interceptors.response.use((response) =>{
    // 简化返回数据
    return response.data;
}, (error) =>{
    let status = error.response.status;
    switch(status){
        case 404:
            ElMessage({
                type:"error",
                message:error.message
            })
            break;
        case 500 | 501 | 502 | 503 | 504 | 505:
            ElMessage({
                type:"error",
                message:error.message
            })
            break;
        case 500 | 501 | 502 | 503 | 504 | 505:
        ElMessage({
            type:"error",
            message:error.message
        })
        break;

    }
    return Promise.reject(new Error(error.message))
})



// 对外暴露requests
export {
    requests
}

