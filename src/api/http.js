import axios from 'axios'
import {Message} from 'iview'
import Cookies from 'js-cookie'//在cookie中获取token
import Qs from 'qs'
const downloadUrl = url => {
    var ua = navigator.userAgent.toLowerCase(),s
    let iframe = document.createElement('iframe')
    if(s = ua.match(/firefox\/([\d.]+)/)){
      window.open(url)
    }else{
      iframe.src = url
      iframe.style.display = 'none'
    }
    iframe.onload = function () {
      document.body.removeChild(iframe)
    }
    document.body.appendChild(iframe)
}/*创建iframe进行下载*/
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
            // const host = ' https://www.easy-mock.com/mock/5d0f1d0c7e96485dab3767e4/RBmeetin'
            const host = "http://192.168.31.185:8082/yjjk"
            const hasToken = Cookies.get("token");
            if (!/^(http|\/\/)/.test(request.url)) {
                request.url = host + request.url;
            }//设置默认host
            if(request.url=="http://192.168.31.185:8082/yjjk/PhysicalReservation/cancelReservation"||request.url=="http://192.168.31.185:8082/yjjk/PhysicalReservation/getProjectList"||request.url=="http://192.168.31.185:8082/yjjk/PhysicalReservation/getReservationTime"){
                request.headers['Content-Type'] = 'application/json;charset=utf-8'
            }else{
                if (hasToken) {
                    if(request.method=="get"){
                        request.params.token = hasToken
                    }else{
                        request.data.token = hasToken
                    }
                }
                request.data = Qs.stringify(request.data);//传参序列化
            }
            console.log(request)
            console.log(hasToken)
            return request;
    },
    // (config) => {
    //     config.data = Qs.stringify(config.data);
    //     console.log(config)
    //     console.log(hasToken)
    //     confing.headers = {
    //       'Content-Type':'application/x-www-form-urlencoded'
    //     }
    //     if (hasToken) {
    //         confing.headers.Authorization  = hasToken
    //     }
    //     return config;
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
        if (response.headers && response.headers['content-type'] === 'application/octet-stream;charset=utf-8') {
            downloadUrl(response.request.responseURL)
            return {data:{rCode:'success'}}
          }/*判断是否下载*/
        // response.data = JSON.parse(util.formatString(util.Decrypt(response.data)))
        return response
    },
    (error) => {
        console.log(error)
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