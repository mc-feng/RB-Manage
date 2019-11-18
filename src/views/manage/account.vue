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
         <Table :data="tableData" :columns="tableColumn" style="margin-top:107px;" ref="table"></Table>
         <div style="margin: 10px;overflow: hidden">
            <div style="float: right;">
                <Page :total="filer.total" :current="filer.page" @on-change="changePage" :page-size="filer.size"/>
            </div>
        </div>
         <Modal
            v-model="modal1"
            :footer-hide="hideFoot"
            width="736"
            @on-visible-change="changeV"
            >
            <div class="modal-title">
                <Icon custom="iconfont i-icon-zhanghu" color="#F77557" size="30"/>
                <div class="title-font">{{modalValue.title}}</div>
            </div>
            <div class="modal-content">
                <div class="modal-content-item">
                    <span>姓名：</span>
                    <Input v-model="modalValue.name" placeholder="请输入姓名" style="width: 455px" />
                </div>
                <div class="modal-content-item">
                    <span>账号：</span>
                    <Input v-model="modalValue.account" placeholder="请输入账号" style="width: 455px" :disabled="modalValue.canCheck"/>
                </div>
                <div class="modal-content-item">
                    <span>密码：</span>
                    <Input  v-model="modalValue.password" placeholder="请输入密码" style="width: 455px" type="password" />
                </div>
                <div class="line"></div>
                <div class="modal-content-bottom">
                    <span>所在城市：</span>
                    <Tree :data="modalValue.city" @on-select-change="changeTree"></Tree>
                </div>
            </div>
            <div class="modal-buttun">
                <div class="button" @click="sendTable">确认</div>
                <div class="button" @click="cancle">取消</div>
            </div>
        </Modal>
         <Modal
            v-model="modal"
            :footer-hide="hideFoot"
            width="775"
            >
            <div class="modal-title">
                <Icon custom="iconfont i-icon-setting" color="#F77557" size="30"/>
                <div class="title-font">删除用户</div>
            </div>
            <div class="modal-tips">
                <Icon type="ios-information-circle-outline" color="#FF9900" size="32" style="margin-top:4px;"/>
                <div class="tips-font">是否确定删除当前用户？</div>
            </div>
            <div class="modal-buttun">
                <div class="button" @click="sureDelete">确认</div>
                <div class="button" @click="cancle2">取消</div>
            </div>
        </Modal>
    </div>
</template>
<style scoped lang="scss">
   .main-warp{
       padding:0px 138px 0px 138px;
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
import {getCity,addManager,findUser,deleteUser,reviseUser} from "../../api/api";
import {Message,Notice} from 'iview';
export default {
    data(){
        return{
            row:{
              managerId:""
            },
            value:"",
            modalValue:{
                managerId:"",
                title:"",
                name:"",
                account:"",
                password:"",
                cityId:"",
                canCheck:false,
                city: []
            },
            modal:false,
            modal1:false,
            hideFoot:true,
            tableColumn:[
                {
                    title:"序号",
                    key:"no"
                },
                {
                    title:"姓名",
                    key:"name"
                },
                {
                    title:"所在城市",
                    key:"cityName"
                },
                {
                    title:"账号",
                    key:"account"
                },
                {
                    title:"最后一次登录",
                    key:"loginTime"
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
                                on:{click:()=>{this.modal=true;console.log(params);this.row.managerId=params.row.managerId}}
                            },"删除")
                        ])
                    }
                }
            ],
            tableData:[],
            filer:{
                page:1,
                size:10,
                total:0
            }
        }
    },
    methods:{
        showModel(e){
            console.log(e)
            if(e){
                this.modalValue.title = "修改用户"
                this.modalValue.name = e.row.name
                this.modalValue.account = e.row.account
                this.modalValue.password = null
                this.modalValue.cityId = e.row.cityId
                this.modalValue.managerId = e.row.managerId
                this.modalValue.canCheck = true
            }else{
                this.modalValue.title = "新增用户"
                this.modalValue.name = ""
                this.modalValue.account = ""
                this.modalValue.password = ""
                // this.modalValue.cityId = ""
            }
            this.modal1 = true
        },
        changeV(s){
            if(!s){
                this.modalValue.managerId = ""
                this.modalValue.title = ""
                this.modalValue.name = ""
                this.modalValue.account = ""
                this.modalValue.password = ""
                // this.modalValue.cityId = ""
                this.modalValue.canCheck = false
                console.log("hi,我消失了")
            }
        },
        changeTree(e){
            console.log(e)
            if(e[0].id){
                this.modalValue.cityId = e[0].id
                console.log(e[0].id)
            }
        },//改变城市
        sendTable(){
            var that = this
            if(this.modalValue.managerId){
                console.log(this.modalValue)
                if(this.modalValue.name.length>15){
                   Notice.warning({title:"姓名不能超过15位"})
                }else if(!(/^[a-zA-Z0-9]{6,}$/.test(this.modalValue.password))){
                   Notice.warning({title:"密码长度不少于6位，字母或数字组成"})
                }else{
                    reviseUser({
                        managerId:this.modalValue.managerId,
                        cityId:this.modalValue.cityId,
                        name:this.modalValue.name,
                        password:this.modalValue.password
                    }).then((res)=>{
                        if(res.data.success){
                            that.modal1 = false;
                            that.upData()
                        }
                        console.log(res)
                    })
                }
            }else{
                if(this.modalValue.name==""){
                    Notice.warning({title:"请填写姓名"});
                }else if(this.modalValue.name.length>15){
                   Notice.warning({title:"姓名不能超过15位"})
                }else if(this.modalValue.account==''){
                    Notice.warning({title:"请填写账号"});
                }else if(this.modalValue.account.length>20){
                    Notice.warning({title:"账户不能超过20位"})
                }else if(this.modalValue.password==""){
                    Notice.warning({title:"请填写密码"});
                }else if(!(/^[a-zA-Z0-9]{6,}$/.test(this.modalValue.password))){
                   Notice.warning({title:"密码长度不少于6位，字母或数字组成"})
                }else if(this.modalValue.cityId ==""){
                    Notice.warning({title:"请选择城市"});
                }else{
                    addManager({
                        name:this.modalValue.name,
                        account:this.modalValue.account,
                        password:this.modalValue.password,
                        cityId:this.modalValue.cityId
                    }).then((res)=>{
                        if(res.data.success){
                            that.modal1 = false;
                            that.upData()
                        }else{
                             Notice.warning({title:res.data.message});
                        }
                        console.log(res)
                    })
                }//添加用户
            }
        },
        upData(){
           var that = this
          findUser(
              {  
              currentPage:this.filer.page,
              pageSize:this.filer.size
              }
          ).then((res)=>{
              var data = res.data.data
              that.tableData =  data.list
              that.filer.page = data.pageNum
              that.filer.size = data.pageSize
              that.filer.total = data.total
          })
        },//更新用户数据
        changePage(e){
            //需要总条数和当前的页数
            this.filer.page = e
            console.log(e)
            this.upData()
        },//切换页数
        sureDelete(){
            var that = this
            deleteUser({
                managerId:this.row.managerId
            }).then((res)=>{
                console.log(res)
                if(res.data.success){
                  that.modal = false;//此时managerId没有清空
                  that.upData()//更新数据
                }else{
                     Notice.warning({title:res.data.message});
                }
            })
        },
        cancle(){
            this.modal1 = false
        },
        cancle2(){
             this.modal = false
        }
    },
    mounted(){
      var that = this
      getCity({}).then((res)=>{
         console.log(res)
         var city = res.data.data
         var newCity = []
         city.map((item,index)=>{
             var samllCity = []
             item.children.map((items,indexs)=>{
                samllCity.push({title:items.placeName,id:items.id})
             })
             if(item.placeName=="上海市"||item.placeName=="重庆市"||item.placeName=="北京市"||item.placeName=="天津市"){
                 newCity.push({title:item.placeName,children:samllCity,id:item.id})
             }else{
                newCity.push({title:item.placeName,children:samllCity})
             }
         })
         that.modalValue.city = newCity
      })
      that.upData()
    }
}
</script>
