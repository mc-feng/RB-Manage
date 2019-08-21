<template>
    <div class="main-warp">
         <!-- <div class="header">
              <Input v-model="value" placeholder="输入姓名/手机号直接查找" style="width: 319px" />
              <div class="button header-right">检索</div>
         </div> -->
         <div class="header"></div>
         <div class="right-top">
             <div class="button" @click="showModel(false)">新增人员</div>
             <!-- <div class="button" @click="newPeople">新增人员</div> -->
         </div>
         <Table :data="tableData" :columns="tableColumn" style="margin-top:107px;" ref="table" width=1567></Table>
         <Modal
            v-model="modal1"
            :footer-hide="hideFoot"
            width="736"
            @on-visible-change="changeV"
            >
            <div class="modal-title">
                <Icon type="ios-person-add-outline" color="#F77557" size="30"/>
                <div class="title-font">{{modalValue.title}}</div>
            </div>
            <div class="modal-content">
                <div class="modal-content-item">
                    <span>姓名：</span>
                    <Input :value="modalValue.name" placeholder="请输入姓名" style="width: 455px" />
                </div>
                <div class="modal-content-item">
                    <span>账号：</span>
                    <Input :value="modalValue.account" placeholder="请输入账号" style="width: 455px" :disabled="modalValue.canCheck"/>
                </div>
                <div class="modal-content-item">
                    <span>密码：</span>
                    <Input  :value="modalValue.password" placeholder="请输入密码" style="width: 455px" />
                </div>
                <div class="line"></div>
                <div class="modal-content-bottom">
                    <span>所在城市：</span>
                    <Tree :data="modalValue.city" show-checkbox></Tree>
                </div>
            </div>
            <div class="modal-buttun">
                <div class="button">确认</div>
                <div class="button">取消</div>
            </div>
        </Modal>
         <Modal
            v-model="modal"
            :footer-hide="hideFoot"
            width="775"
            >
            <div class="modal-title">
                <Icon type="ios-cog-outline" color="#F77557" size="30"/>
                <div class="title-font">删除用户</div>
            </div>
            <div class="modal-tips">
                <Icon type="ios-information-circle-outline" color="#FF9900" size="32" style="margin-top:4px;"/>
                <div class="tips-font">是否确定删除当前用户？</div>
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
            &:active{
              background: #FFB59E ;  
            }
    }
   .header{
       margin-top: 20px;
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
        margin-top: 93px;
        .tips-font{
            font-family: PingFangSC-Medium;
            font-size: 24px;
            color: rgba(0,0,0,0.85);
            margin-left: 12px;
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
    .modal-content{
        margin-top: 65px;
        width: 535px;
    }
    .modal-content-item{
       display: flex;
       align-items: center;
       margin-bottom: 21px;
       margin-left: 12px;
       span{
            font-family: PingFangSC-Regular;
            font-size: 16px;
            color: #666666;
       }
    }
    .line{
        border-top: 1px solid #D8D8D8;
    }
    .modal-content-bottom{
         display: flex;
         margin-top: 26px;
         span{
            font-family: PingFangSC-Regular;
            font-size: 16px;
            color: #666666;
         }
    }
</style>
<script>
import {manager} from "../../api/api";
export default {
    data(){
        return{
            value:"",
            modalValue:{
                title:"",
                name:"",
                account:"",
                password:"",
                canCheck:false,
                city: [
                    {
                    title: 'parent 1',
                    expand: true,
                    children: [
                            {
                                title: 'parent 1-1',
                                expand: true,
                                children: [
                                    {
                                        title: 'leaf 1-1-1'
                                    },
                                    {
                                        title: 'leaf 1-1-2'
                                    }
                                ]
                            },
                            {
                                title: 'parent 1-2',
                                expand: true,
                                children: [
                                    {
                                        title: 'leaf 1-2-1'
                                    },
                                    {
                                        title: 'leaf 1-2-1'
                                    }
                                ]
                            }
                        ]
                    }
                ]
            },
            modal:false,
            modal1:false,
            hideFoot:true,
            tableColumn:[
                {
                    title:"序号",
                    key:"number"
                },
                {
                    title:"姓名",
                    key:"name"
                },
                {
                    title:"所在城市",
                    key:"city"
                },
                {
                    title:"账号",
                    key:"account"
                },
                {
                    title:"最后一次登录",
                    key:"lastLoge"
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
                                },
                                 on:{click:()=>{this.showModel(params)}}
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
                    number:"1",
                    name:"张三",
                    city:"上海市",
                    account:"zxxss",
                    lastLoge:"2019-16-13",
                    password:"123456"
                },
                {   
                    number:"2",
                    name:"王五",
                    city:"杭州市",
                    account:"zxxss",
                    lastLoge:"2019-16-13",
                    password:"123456"
                },
                {   
                    number:"3",
                    name:"李四",
                    city:"广东市",
                    account:"zxxss",
                    lastLoge:"2019-16-13",
                    password:"123456"
                }
            ]
        }
    },
    methods:{
        showModel(e){
            console.log(e)
            if(e){
                this.modalValue.title = "修改用户"
                this.modalValue.name = e.row.name
                this.modalValue.account = e.row.account
                this.modalValue.password = e.row.password
                this.modalValue.canCheck = true
            }else{
                this.modalValue.title = "新增用户"
                this.modalValue.name = ""
                this.modalValue.account = ""
                this.modalValue.password = ""
            }
            this.modal1 = true
        },
        changeV(s){
            if(!s){
                this.modalValue.title = ""
                this.modalValue.name = ""
                this.modalValue.account = ""
                this.modalValue.password = ""
                this.modalValue.canCheck = false
                console.log("hi,我消失了")
            }
        }
        // newPeople(){
        //     manager({
        //         account:"张三",
        //         password:"123456"
        //     }).then(response=>{
        //         console.log(response)
        //     })
        // }
    }
}
</script>
