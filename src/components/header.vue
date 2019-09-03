<template>
    <div class="header">
      <div class="loge">
          <img src="../images/loge.png" alt="图标">
      </div>
      <div class="header-title">PPICC健康上海预约后台管理系统</div>
      <div class="touxiang-warp" v-if="show">
          <div class="touxiang-left">
              <div class="border"></div>
              <span>{{name}}</span>
           </div>
          <div class="touxiang-right" @click="exit">退出</div>
      </div>
    </div>
</template>
<style scoped>
 .header{
     width: 100%;
     height: 80px;
     background: #F77557;
     position: relative;
     display: flex;
     align-items: center
 }
 .loge{
     position: absolute;
     left: 0;
     height: 80px;
     width: 185px;
     background: #DA4C2A;
     display: flex;
     align-items: center;
     justify-content: center;
 }
 .loge img{
    width: 67px;
    height: 46px;
 }
 .header-title{
     margin-left: 208px;
     font-size: 18px;
     color: #FFFFFF;
 }
 .touxiang-warp{
     display: flex;
     position:absolute;
     right: 44px;
     font-family: PingFangSC-Regular;
     font-size: 16px;
     color: #FFFFFF;
 }
 .touxiang-right{
     margin-left: 72px;
     cursor: pointer;
     line-height: 30px;
 }
 .touxiang-left{
     display: flex;
     align-items: center;
 }
 .border{
     width: 30px;
     height: 30px;
     border-radius: 50%;
     background: #FFFFFF;
     margin-right: 11px;
 }
</style>
<script>
import Cookies from 'js-cookie';//在cookie中获取token
import {store} from "../until/store";
import {loginOut} from "../api/api";
import {Message} from 'iview';
export default {
    data(){
        return{
            show:false,
            name:"李子柒"
        }
    },
    mounted(){
        if(Cookies.get("token")){
            this.show = true
            console.log(store.state)
            this.name = store.state.account.name
        }
     console.log(Cookies.get("token"))
    },
    methods:{
        exit(){
            loginOut({}).then((res)=>{
                if(res.data.success){
                    Cookies.remove("token")
                    store.clearMessageAction("account")
                    this.$router.replace({path: '/login'});
                    Message.success('退出成功')
                }else{
                     Message.error(response.data.message);
                }
              console.log(res)
            })
        }
    }
}
</script>

