<template>
    <div>
        <Dheader></Dheader>
        <div class="layout-warp" :style="{height:height}">
            <div class="layout-left">
                <Menu theme="light" width="185px" :open-names="opendSub">
                    <Submenu name="1">
                        <template slot="title">
                            <Icon type="md-person" />
                            体检预约
                        </template>
                        <router-link to="/tijian/name" tag='li'  class="ivu-menu-item" active-class="ivu-menu-item ivu-menu-item-active ivu-menu-item-selected" name="1-3">
                            <Icon type="ios-calendar-outline" class="font-st"/>
                            <span>订单管理</span>
                        </router-link>
                        <router-link to="/tijian/yuyue" tag='li'  class="ivu-menu-item" active-class="ivu-menu-item ivu-menu-item-active ivu-menu-item-selected" name="1-2">
                            <Icon type="ios-checkbox-outline" class="font-st"/>
                            <span>预约管理</span>
                        </router-link>
                        <router-link to="/tijian/card" tag='li'  class="ivu-menu-item" active-class="ivu-menu-item ivu-menu-item-active ivu-menu-item-selected" name="1-3" v-if="false">
                            <span>卡卷管理</span>
                        </router-link>
                    </Submenu>
                    <Submenu name="2" v-if="false">
                        <template slot="title">
                            <Icon type="ios-paper"></Icon>
                            会议室预约
                        </template>
                        <router-link to="/meet/manage" tag='li'  class="ivu-menu-item" active-class="ivu-menu-item ivu-menu-item-active ivu-menu-item-selected" name="1-1">
                            <span>预约查询</span>
                        </router-link>
                        <router-link to="/meet/setting" tag='li'  class="ivu-menu-item" active-class="ivu-menu-item ivu-menu-item-active ivu-menu-item-selected" name="1-2">
                            <span>预约设置</span>
                        </router-link>
                        <router-link to="/meet/whiteName" tag='li'  class="ivu-menu-item" active-class="ivu-menu-item ivu-menu-item-active ivu-menu-item-selected" name="1-3">
                            <span>预约白名单</span>
                        </router-link>
                    </Submenu>
                    <template v-if="role==0">
                        <Submenu name="3">
                            <template slot="title">
                                <Icon type="md-settings"></Icon>
                                系统设置
                            </template>
                            <router-link to="/guanli/account" tag='li'  class="ivu-menu-item" active-class="ivu-menu-item ivu-menu-item-active ivu-menu-item-selected" name="1-3">
                                <Icon type="md-person-add" class="font-st"/>
                                <span>账户管理</span>
                            </router-link>
                            <router-link to="/guanli/role" tag='li'  class="ivu-menu-item" active-class="ivu-menu-item ivu-menu-item-active ivu-menu-item-selected" name="1-3" v-if="false">
                                <span>角色权限</span>
                            </router-link>
                        </Submenu>
                    </template>
                </Menu> 
            </div>
            <div class="layout-right">
               <router-view/>
            </div>
        </div>
    </div>
</template>
<script>
import Dheader from "../components/header"
import {store} from "../until/store";//全局仓库
export default {
    data(){
       return{
           opendSub:["1","2","3"],
           height:(document.documentElement.clientHeight-80)+"px",
           message :""
       }
    },
    components:{
        Dheader
    },
    // bind event handlers to the handleResize method (defined below)
    mounted: function () {
       window.addEventListener('resize', this.handleResize);//监听浏览器的缩放事件
    }, 
    created:function(){
        this.role= store.state.account.role//前提要account存在
    },
    beforeDestroy: function () {
       window.removeEventListener('resize', this.handleResize)//减少性能开销移除监听事件
    },
    methods: {
       // whenever the document is resized, re-set the 'fullHeight' variable
        handleResize (height) {
         this.height = (height.currentTarget.innerHeight-80)+"px"
        }
    },
}
</script>
<style scoped>
  .layout-warp{
    display:flex;
    flex-flow: row nowrap;
  }
  .layout-left{
      height: 100%;
      border-right: 1px solid #F6F9FB ;
      width: 185px;
  }
  div>>>.ivu-menu-submenu-title{
     font-size: 18px;
     color: #000000;
     width: 185px;
  }
  div>>>.ivu-menu-submenu-title:hover{
      color: #ffffff;
      background: #F77557;
  }
  div>>>.ivu-menu-submenu-title-icon{
      right: 2px;
  }
  div>>>.ivu-menu{
      display: flex;
      flex-flow: column nowrap;
      align-items: center;
  }
  div>>>.ivu-menu-item{
      padding: 0 !important;
      text-align: center;
      line-height: 41px;
      width: 159px;
      height: 41px;
      border-radius: 100px;
      margin-top: 10px;
      margin-bottom: 10px;
  }
  div>>>.ivu-menu-item:hover{
       color: #F77557;
   }
   div>>>.ivu-menu-item-active:not(.ivu-menu-submenu){
       color: #ffffff !important;
       background: #F77557 !important;
   }
   div>>>.ivu-menu-item-active:not(.ivu-menu-submenu):after{
       display: none !important;
   }
   .layout-right{
       width: 100%;
       height: 100%;
   }
   .font-st{
       font-size: 20px;
       margin-top: -4px;
   }
</style>
