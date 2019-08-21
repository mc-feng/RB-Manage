import axios from '../api/http'
export function login(data) { // 登录
    return axios.get('/manage/login',{
        params:data
    })
}
export function getInfo(data) { // 登录
    if(!data){
       data ={}
    }
    return axios.get('/user/getInfo',{
        params:data
    })
}
export function manager(datas){//新增管理员信息
    return axios.post('/manage/manager',datas)
}