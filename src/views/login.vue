<template>
    <div>
        <Dheader></Dheader>
        <div class="main" :style="{height:height}">
             <div class="loge-warp">
                 <div class="loge-left">
                     <img src="../images/loge.png" alt="">
                     <div class="loge-name">PICC健康上海预约管理平台</div>
                     <div class="loge-font1">WELCOME</div>
                 </div>
                 <div class="loge-right">
                     <div class="right-warp">
                         <div class="right-title">LOGIN/登录</div>
                         <Form ref="formInline" :model="formInline" :rules="ruleInline">
                            <Form-item prop="user">
                                <Input type="text" v-model="formInline.user" placeholder="请输入账号">
                                     <Icon type="md-person" slot="prepend"/>
                                    <Icon type="ios-person-outline" ></Icon>
                                </Input>
                            </Form-item>
                            <Form-item prop="password">
                                <Input type="password" v-model="formInline.password" placeholder="请输入密码">
                                     <Icon type="ios-lock" slot="prepend" />
                                </Input>
                            </Form-item>
                            <Form-item>
                                <Button type="primary" @click="handleSubmit('formInline')" long style="background: #F77557;border-radius: 7px;height: 53px;margin-top:78px;border:none;font-size: 15px;">登录</Button>
                            </Form-item>
                        </Form>
                     </div>
                 </div>
             </div>
        </div>
    </div>
</template>
<script>
import Dheader from "../components/header";
import {login} from "../api/api";
import {store} from "../until/store";
import {Message} from 'iview';
import Cookies from 'js-cookie'//在cookie中获取token
export default {
    data(){
        return{
            height:(document.documentElement.clientHeight-80)+"px",
            formInline: {
                user: '',
                password: ''
            },
            ruleInline: {
                user: [
                    { required: true, message: '请填写用户名', trigger: 'blur' }
                ],
                password: [
                    { required: true, message: '请填写密码', trigger: 'blur' },
                    { type: 'string', min: 6, message: '密码长度不能小于6位', trigger: 'blur' }
                ]
            }
        }
    },
    components:{
        Dheader
    },
    // bind event handlers to the handleResize method (defined below)
    mounted: function () {
       window.addEventListener('resize', this.handleResize)//监听浏览器的缩放事件
    }, 
    beforeDestroy: function () {
       window.removeEventListener('resize', this.handleResize)//减少性能开销移除监听事件
    },
    methods: {
       // whenever the document is resized, re-set the 'fullHeight' variable
        handleResize (height) {
         this.height = (height.currentTarget.innerHeight-80)+"px"
        },
        handleSubmit(name) {
            var that = this
            this.$refs[name].validate((valid) => {
                if (valid) {
                    console.log(valid)
                    // Message.success('提交成功!');
                    login({
                        "account":this.formInline.user,
                        "password":this.formInline.password
                    }).then(response=>{
                        console.log(response)
                        // if(response.data.code==200){
                        //       Message.success('登录成功')
                        //       Cookies.set("token", true)
                        //       Cookies.set("account",response.data.data.account)
                        //       Cookies.set("manageId",response.data.data.managerId)
                        //       that.$router.push({ name:"首页" })
                        // }else{
                        //     Message.error(response.data.message);
                        // }
                        if(response.data.success){
                              Message.success('登录成功')
                              Cookies.set("token", response.data.data.token)
                              store.setMessageAction("account",response.data.data)
                              that.$router.push({ name:"首页" })
                        }else{
                            Message.error(response.data.message);
                        }
                    })
                } else {
                    Message.error('表单验证失败!');
                }
            })
        }
    },
}
</script>
<style scoped lang="scss">
  .main{
      background: url("../images/background.png");
      background-size: cover;
      width: 100%;
      height:100%;
      display: flex;
      flex-flow:row nowrap;
      align-items: center;
      justify-content: center;
  }
  .loge-warp{
      width: 986px;
      height: 490px;
      box-shadow: 0 2px 8px 0 rgba(0,0,0,0.50);
      border-radius: 8px;
      overflow: hidden;
      display: flex;
      flex-flow: row nowrap;
  }
  .loge-left{
      img{
            width: 144px;
            height:99px;
            margin-top: 172px;
      }
      .loge-name{
          font-size: 22px;
          color: #FFFFFF;
          margin-top: 17px;
      }
      .loge-font1{
          font-size: 22px;
          color: #FFFFFF;
          margin-top: 93px;
      }
      width: 411px;
      background: rgba(199,63,31,0.80);
      display: flex;
      flex-flow: column nowrap;
      align-items: center;
  }
  .loge-right{
      .right-warp{
         width: 423px;
         margin-top: 50px;
      }
      .right-title{
          font-family: PingFangSC-Light;
          font-size: 31px;
          color: #F77557;
          font-weight: 100
      }
      width: 575px;
      background: #FFFFFF;
      display: flex;
      flex-flow: column nowrap;
      align-items: center;
  }
  .ivu-form{
      margin-top: 65px;
      & /deep/ .ivu-input{
            height: 41px !important;
            font-size: 16px !important;
            color: #6D7278 !important;
        }
       & /deep/ .ivu-icon{
          font-size: 20px ;
        }
  }
</style>

