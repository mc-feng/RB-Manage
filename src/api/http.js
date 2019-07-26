import axios from 'axios'
import {Message} from 'iview'
import Qs from 'qs'
// import util from "@/comment/util";
function startLoading() {
    Message.loading('正在加载中...', 0)
}

function endLoading() {
    Message.destroy()
}
axios.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded';
// 请求拦截
axios.interceptors.request.use(
    (request)=>{
             startLoading()
            const host = 'http://192.168.31.109:8080/yjjk'
            if (!/^(http|\/\/)/.test(request.url)) {
                request.url = host + request.url;
            }//设置默认host
            request.data = Qs.stringify(request.data);//传参序列化
            console.log(request.data)
            return request;
    },
    // (config) => {
    //     config.data = Qs.stringify(config.data);
    //     console.log(config.data)
    //     confing.headers = {
    //       'Content-Type':'application/x-www-form-urlencoded'
    //     }
    //     return confing;
    //     // //设置请求头
    //     // if (localStorage.eToken) {
    //     //     confing.headers.Authorization = localStorage.eToken
    //     // }

    //     // return confing
    // },
    (error) => {
        return Promise.reject(error)
    }
)

//响应拦截

axios.interceptors.response.use(
    (response) => {
        endLoading()
        // response.data = JSON.parse(util.formatString(util.Decrypt(response.data)))
        return response
    },
    (error) => {
        Message.error(error.response.data)
        endLoading()
        // 获取状态码
        const { status } = error.response

        if (status === 401) {
            Message.error('请重新登录')
        }
        return Promise.reject(error)
    }
)
export default axios