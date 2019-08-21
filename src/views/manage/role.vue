<template>
    <div class="main-warp">
         <div class="header">
              <Input v-model="value" placeholder="输入姓名/手机号直接查找" style="width: 319px" />
              <div class="button header-right">检索</div>
         </div>
         <div class="right-top">
             <div class="button">新增人员</div>
             <!-- <div class="button" @click="newPeople">新增人员</div> -->
         </div>
         <Table :data="tableData" :columns="tableColumn" style="margin-top:98px;" ref="table" width=1567>
            <template slot-scope="{row}" slot="power">
                <div class="power-warp">
                    <div  v-for="(item,index) in row.power" :key="index" class="power">
                        {{item}}
                    </div>
                </div>
            </template>
         </Table>
         <Modal
            v-model="modal"
            :footer-hide="hideFoot"
            width="928"
            >
            <div class="modal-title">
                <Icon type="ios-desktop-outline" color="#F77557" size="27"/>
                <div class="title-font">会议预约白名单管理</div>
            </div>
            <div class="modal-tips">
                <Icon type="ios-information-circle-outline" color="#FF9900" size="32" style="margin-top:4px;"/>
                <div class="tips-font">迁出员工信息</div>
            </div>
            <div class="modal-small-font">请确认，该员工是否为离职状态</div>
            <div class="modal-content">
                <div class="modal-content-left">
                    <div class="modal-content-font">
                        <span>日期：</span><p>2019-06-19</p>
                    </div>
                    <div class="modal-content-font">
                        <span>日期：</span><p>2019-06-19</p>
                    </div>
                    <div class="modal-content-font">
                        <span>日期：</span><p>2019-06-19</p>
                    </div>
                </div>
                <div class="modal-content-right">
                    <div class="modal-content-font">
                        <span>日期：</span><p>2019-06-19</p>
                    </div>
                    <div class="modal-content-font">
                        <span>日期：</span><p>2019-06-19</p>
                    </div>
                    <div class="modal-content-font">
                        <span>日期：</span><p>2019-06-19</p>
                    </div>
                </div>
            </div>
            <div class="modal-buttun">
                <div class="button">确认</div>
                <div class="button">取消</div>
            </div>
        </Modal>
    </div>
</template>
<style scoped lang="scss">
   .main-warp{
       padding:0px 138px 0px 27px;
   }
   .button{
            width: 109px;
            height: 35px;
            background: #F77557;
            border-radius: 2px;
            text-align: center;
            line-height: 35px;
            font-family: PingFangSC-Regular;
            font-size: 14px;
            color: #FFFFFF;
            margin-left: 17px;
            cursor: pointer;
    }
   .header{
       margin-top: 42px;
       display: flex;
       align-items: center;
       .header-right{
           margin-left: 147px;
       }
   }
   .right-top{
       display: flex;
       float:right;
       margin-top: 16px;
   }
    div{
      & /deep/ .ivu-modal-body{
            display: flex;
            flex-flow: column nowrap;
            align-items: center;
        }
    }
    .modal-title{
        display: flex;
        margin-top: 37px;    
    }
    .title-font{
        font-family: PingFangSC-Medium;
        font-size: 18px;
        color: #232323;
        margin-left: 18px;
    }
    .modal-tips{
        display: flex;
        margin-top: 27px;
        .tips-font{
            font-family: PingFangSC-Medium;
            font-size: 24px;
            color: rgba(0,0,0,0.85);
            margin-left: 12px;
        }
    }
    .modal-content{
        box-sizing:content-box;
        background: #FFFFFF;
        border: 2px solid #F77557;
        border-radius: 8px;
        width: 555px;
        height: 193px;
        margin-top: 5px;
        .modal-content-left{
            float: left;
            margin-left: 54px;
            margin-top: 30px
        }
        .modal-content-right{
            float: right;
            margin-right: 71px;
            margin-top: 30px
        }
        span{
            font-family: PingFangSC-Regular;
            font-size: 16px;
            color: #666666;
        }
        p{
            font-family: PingFangSC-Regular;
            font-size: 14px;
            color: #232323;
            margin-left: 14px;
            display:inline-block
        }
        .modal-content-font{
            margin-bottom: 29px;
        }
    }
    .modal-buttun{
        display: flex;
        width: 318px;
        justify-content: space-around;
        margin-top: 71px;
        margin-bottom: 101px;
    }
    .modal-small-font{
            font-family: PingFangSC-Regular;
            font-size: 16px;
            color: #6D7278;
            line-height: 32px;
            margin-top: 2px;
    }
    .power-warp{
        display: flex;
        font-family: PingFangSC-Regular;
        font-size: 14px;
        color: #A3A3A3;
        justify-content: center;
    }
    .power{
        margin-right: 10px;
    }
</style>
<script>
import {manager} from "../../api/api";
export default {
    data(){
        return{
            value:"",
            modal:false,
            hideFoot:true,
            tableColumn:[
                {
                    title:"角色名",
                    key:"name"
                },
                {
                    title:"权限菜单",
                    slot: 'power',
                    align:"center"
                },
                {
                    title:"操作",
                    key:"action",
                    render:(h,params)=>{
                        return h("div",[
                            h("span",{
                                style:{ 
                                    color:"#0091FF",
                                    fontFamily: "PingFangSC-Medium",
                                    fontSize: "14px",
                                    cursor: "pointer"
                                }
                            },"修改"),
                            h("span",{
                                style:{    
                                    color:"#0091FF",
                                    fontFamily: "PingFangSC-Medium",
                                    color: "#EA4849",
                                    marginLeft:"16px",
                                    cursor: 'pointer'
                                },
                                on:{click:()=>{this.modal=true;console.log(params)}}
                            },"删除")
                        ])
                    }
                }
            ],
            tableData:[
                {
                    name:"管理员",
                    power:["管理员","成员"],
                }
            ]
        }
    },
    methods:{
        newPeople(){
            manager({
                account:"张三",
                password:"123456"
            }).then(response=>{
                console.log(response)
            })
        }
    }
}
</script>
