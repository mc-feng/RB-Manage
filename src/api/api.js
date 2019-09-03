import axios from '../api/http'
export function login(data) { // 登录
    return axios.post('/manage/login',data)
}
export function loginOut(data) { // 登出
    return axios.delete('/manage/login',{
        data
    })
}
export function getInfo(data) { // 页面刷新
    if(!data){
       data ={}
    }
    return axios.get('/manage/token',{
        params:data
    })
}
export function getCity(datas){//获取城市
    return axios.get('/manage/city',{
        params:datas
    })
}
export function addManager(datas){//新增管理员信息
    return axios.post('/manage/manager',datas)
}
export function findUser(datas){//新增管理员信息
    return axios.get('/manage/manager',{
        params:datas
    })
}
export function deleteUser(data){//新增管理员信息
    return axios.delete('/manage/manager',{
        data
    })
}
export function reviseUser(data){//修改管理员信息
    return axios.put('/manage/manager',data)
}
export function getYuyue(data){//获取预约信息
    return axios.get('/manage/reservation',{
        params:data
    })
}
export function getOrder(data){//获取预约信息
    return axios.get('/manage/order',{
        params:data
    })
}