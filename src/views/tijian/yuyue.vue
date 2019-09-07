<template>
    <div class="main-warp">
        <div class="data">  
             <div class="data-warp">
                 <div class="data-font">
                    <div>预约日期：</div>
                    <Date-picker type="date" 
                    placeholder="选择日期" 
                    style="width:190px;" 
                    :value="sendData.startDate"
                    @on-change="handleChange"></Date-picker>
                    <span>至</span>
                    <Date-picker type="date" 
                    placeholder="选择日期" 
                    style="width:190px;" 
                    :value="sendData.endDate"
                    @on-change="handleChange2"></Date-picker>
                </div>
                <div class="data-font" style="margin-left:40px">
                    <span>姓名：</span>
                    <Input  placeholder="请输入姓名查找..." style="width:220px" v-model="sendData.applyName"/>
                </div>
             </div>
             <div class="data-warp">
                <div class="button" @click="sreach">检索</div>   
                <div class="button" @click="clreanData">重置</div>  
                <div class="button" @click="showModel2">新增预约</div>
                <div class="button" @click="exportData">导出数据</div>
             </div>
        </div>
        <Table :data="tableData1" :columns="tableColumns1" style="margin-top:35px;" ref="table"></Table>
        <div style="margin: 10px;overflow: hidden">
            <div style="float: right;">
                <Page :total="sendData.total" :page-size="sendData.pageSize"  @on-change="onpagechange"></Page>
            </div>
        </div>
        <Modal
            v-model="modal"
            :footer-hide="hideFoot"
            width="775"
            >
            <div class="modal-title">
                <Icon type="md-sad" color="#F77557" size="27"/>
                <div class="title-font">取消预约</div>
            </div>
            <div class="modal-tips">
                <Icon type="ios-information-circle-outline" color="#FF9900" size="32" style="margin-top:4px;"/>
                <div class="tips-font">您正在取消预约，请确认</div>
            </div>
            <div class="modal-buttun">
                <div class="button" @click="send">确认</div>
                <div class="button" @click="cancle1">取消</div>
            </div>
        </Modal>
        <Modal
            v-model="modal2"
            :footer-hide="hideFoot"
            width="928"
            @on-visible-change="changeV"
            >
           <div class="modal-header">
               <Icon type="ios-checkbox-outline" style="color:#F77557;font-size:30px"/>
               <div class="modal-header-font">新增体检预约</div>
           </div>
           <div class="from-warp">
                   <div class="from-item">
                       <div class="from-item-content">
                           <div class="from-title">姓名&emsp;&emsp;：</div>
                           <Input  placeholder="请输入姓名" style="width: 251px" v-model="addYuyue.name"/>
                        </div>
                        <div class="from-item-content">
                             <div class="from-title">手机号：</div>
                             <Input placeholder="请输入手机号" style="width: 251px" v-model="addYuyue.phone"/>
                        </div>
                   </div>
                   <div class="from-item">
                       <div class="from-item-content">
                           <div class="from-title">身份证号：</div>
                           <Input placeholder="请输入身份证号" style="width: 251px" v-model="addYuyue.cardId"/>
                       </div>
                   </div>
                   <div class="from-item">
                       <div class="from-item-content">
                           <div class="from-title">卡片编码：</div>
                           <Input placeholder="请输入卡片编码" style="width: 251px" v-model="addYuyue.cardNumber"/>
                       </div>
                       <div class="from-item-content">
                           <div class="from-title">卡片密码：</div>
                           <Input placeholder="请输入卡片密码" style="width: 251px" v-model="addYuyue.cardPassword"/>
                       </div>
                   </div>
                   <div class="from-item">
                       <div class="from-item-content">
                            <div class="from-title">预约门店：</div>
                            <Select style="width:386px" @on-change="selectMenDian" v-model="addYuyue.menDianId" label-in-value>
                                    <Option v-for="item in menDianList" :value="item.serviceBranch" :key="item.serviceBranch">{{ item.serviceBranchName }}</Option>
                            </Select>
                        </div>
                   </div>
                   <div class="from-item">
                       <div class="from-item-content">
                            <div class="from-title">预约项目：</div>
                            <Select style="width:251px" v-model="addYuyue.projectId" label-in-value @on-change="selectProject" >
                                    <Option v-for="item in projectList" :value="item.serviceItem" :key="item.serviceItem">{{ item.serviceItemName}}</Option>
                            </Select>
                        </div>
                   </div>
                   <div class="from-item">
                       <div class="from-item-content">
                          <div class="from-title">选择日期：</div>
                          <Date-picker 
                            placeholder="选择日期" 
                            style="width:190px;" 
                            :value="addYuyue.selectDate"
                            @on-change="handleChange3"
                            ></Date-picker>
                       </div>
                   </div>
                   <div class="from-last">
                       <div class="from-title">选择时间段：</div>
                       <div class="from-tiem-warp">
                           <div  class="time-duan"  :class='item.check?"xuanze":item.isUs==0?"":"disable"'  v-for="(item,index) in timeList"  :key="index" @click="changTime(index)">
                               <Icon type="ios-egg" :style="[{'font-size':'10px'},{color:item.check?'#FFFFFF':item.isUs==0?'#F77557':'#B3B5B8'}]"/>
                               <div class="time-duan-font" :style="{color:item.check?'#FFFFFF':item.isUs==0?'#000000':'#B3B6B8'}">{{item.serviceTime}}</div>
                           </div>
                       </div>
                   </div>
            </div>
            <div class="buttun-warp">
                <div class="button" @click="cancle2">取消</div>
                <div class="button" @click="sendAdd">确定</div>
            </div>
        </Modal>
    </div>
</template>
<script>
import {getYuyue,cancelReservation,reservationExport,orgList,getProjectList,getReservationTime,reservation} from "../../api/api";
import {Message} from 'iview'
export default {
    data(){
        return{
            nowreservationId:"",//取消预约时门店id
            addYuyue:{
                name:"",
                phone:"",
                cardId:"",
                cardNumber:"",
                cardPassword:"",
                menDianId:"",
                menDianName:"",
                projectId:"",
                projectName:"",
                selectDate:"",
                selectTime:""
            },
            sendData:{
                startDate:"",
                endDate:"",
                applyName:"",
                currentPage:1,
                pageSize:10,
                total:0
            },//发送查询数据
            modal:false,
            modal2:false,
            menDianList:[],//门店列表
            projectList:[],//项目列表
            value:"",
            timeList:[
            ],
            hideFoot:true,
            tableData1:[],
            tableColumns1: [
                {
                    title: '序号',
                    key: 'no'
                },
                {
                    title: '预约单号',
                    key: 'reservationNumber'
                },
                {
                    title: '姓名',
                    key: 'applyName'
                },
                {
                    title: '身份证号',
                    key: 'applyidNo',
                    width:"160"
                },
                {
                    title:"联系方式",
                    key:"applyTel"
                },
                {
                    title:"预约项目",
                    key:"serviceItemName"
                },
                {
                    title:"支付方式",
                    key:"paymentName"
                },
                {
                    title:"预约时间",
                    key:"reservationTime",
                    render:(h,params)=>{
                            return h('div', {
                            style:{color:"#0091FF"}
                        }, params.row.reservationTime);
                    }
                },
                {
                    title:"状态",
                    key:"manageReservationStatus",
                    render: (h, params) => {
                        const row = params.row;
                        const color = row.manageReservationStatus == '1' ? '#000000' : row.manageReservationStatus == '0' ? '#F77557' : row.manageReservationStatus == '2' ? '#bfbfbf' : 'red';
                        const text = row.manageReservationStatus == '1' ? '已体检' : row.manageReservationStatus == '0' ? '待体检' : row.manageReservationStatus == '2' ? '已关闭' : '错误'
                        return h('div', {
                            style:{color:color}
                        }, text);
                    }
                },
                {
                    title:"创建时间",
                    key:"createTime"
                },
                {
                    title:"操作",
                    key:"operate",
                    render: (h, params) => {
                            const row = params.row;
                            const check = row.manageReservationStatus == '0'?true:false;
                            if(check){    
                                return h('div', {
                                    style:{
                                        color:"#EA4849",
                                        cursor:'pointer'
                                    },
                                    on:{click:()=>{this.modal=true;console.log(params);this.nowreservationId=params.row.reservationNumber;console.log(this.nowreservationId)}}
                                }, "取消预约");
                            }
                    }
                }
            ]
        }
    },
    methods:{
       handleChange(data){
           this.sendData.startDate = data
       },
       handleChange2(data){
           this.sendData.endDate = data
       },
       handleChange3(data){//选择时间获取时间列表
           console.log(data)
           var that = this
           if(!this.addYuyue.menDianId){
             Message.warning("请先选择门店")
           }else if(!this.addYuyue.projectId){
              Message.warning("请先选择项目")
           }
           this.addYuyue.selectDate = data
           getReservationTime({
               parameterOne:this.addYuyue.projectId,
               parameterTwo:this.addYuyue.menDianId,
               parameterThree:data
           }).then((res)=>{
               that.timeList = res.data.data.serviceArrangeList
               that.timeList.map((item,index)=>{
                  item.check = false
               })
               console.log(that.timeList)
           })
       },
        exportData (type) {
            reservationExport({
               startDate:this.sendData.startDate,
               endDate:this.sendData.endDate,
               applyName:this.sendData.applyName
            }).then((res)=>{
                console.log(res)
            })
            // this.$refs.table.exportCsv({
            //     filename: 'The original data'
            // });
        },   //导出数据
        onpagechange(e){
            //需要总条数和当前的页数
            console.log(e)
            this.sendData.currentPage = e  
            this.getData()
        },  //改变页数
        sreach(){
           this.sendData.currentPage = 1
           this.getData()
        },
        // onPageSizeChange(e){
        //     this.filter.size = e
        //     console.log(e)
        //     if(this.filter.page===1){ 
        //      this.getData()
        //     }// 源码中不等于1会自动变成页数1会改变onchange
        // },//改变分页
        getData(){
            var that = this
            console.log(that.sendData)
            getYuyue(this.sendData).then((res)=>{
                if(res.data.data){ 
                 that.tableData1 = res.data.data.list
                 that.sendData.total = res.data.data.total
                }else{
                }
             console.log(res)
            })
        },
        showModel2(){
            this.modal2 = true;
        },//展示弹框
        changTime(e){
             console.log(e);
             var that = this
             if(this.timeList[e].isUs==0){    
                that.timeList.map((item)=>{
                    item.check = false;
                })
                that.timeList[e].check = true
                console.log(that.timeList[e].check);
                that.$set(that.timeList,e,that.timeList[e])//让数字更新
                this.addYuyue.selectTime = this.timeList[e].serviceDateTime
             }else{
                 Message.warning("此时间段已经关闭")
             }
        },//改变时间
        getNowDate(){
            // 获取当前日期
            var date = new Date();
            // 获取当前月份
            var nowMonth = date.getMonth() + 1;
            // 获取当前是几号
            var strDate = date.getDate();
            // 添加分隔符“-”
            var seperator = "-";
            // 对月份进行处理，1-9月在前面添加一个“0”
            if (nowMonth >= 1 && nowMonth <= 9) {
            nowMonth = "0" + nowMonth;
            }
            // 对月份进行处理，1-9号在前面添加一个“0”
            if (strDate >= 0 && strDate <= 9) {
            strDate = "0" + strDate;
            }
            // 最后拼接字符串，得到一个格式为(yyyy-MM-dd)的日期
            var nowDate = date.getFullYear() + seperator + nowMonth + seperator + strDate; 
            return nowDate
        },
        send(){//发送数据
            var that = this
            cancelReservation({
                reservationNumber:this.nowreservationId
            }).then((res)=>{
               console.log(res)
               that.modal = false;
               that.getData()
            })
        },
        sendAdd(){
            var that = this
            var data = this.addYuyue
            if(!data.name){
                 Message.warning("请填写姓名")
            }else if(!data.phone){
                Message.warning("请填手机号码")
            }else if(!data.cardId){
                Message.warning("请填身份证")
            }else if(!data.cardNumber){
                Message.warning("请填卡号")
            }else if(!data.cardPassword){
                Message.warning("请填卡密")
            }else if(!data.menDianId){
                Message.warning("请填门店")
            }else if(!data.projectId){
                Message.warning("请选择项目")
            }else if(!data.selectDate){
                Message.warning("请选择日期")
            }else if(!data.selectTime){
                Message.warning("请选择时间段")
            }else{
               reservation({
                   applyName:data.name,
                   applyTel:data.phone,
                   applyIDNo:data.cardId,
                   cardNumber:data.cardNumber,
                   passWord:data.cardPassword,
                   serviceBranch:data.menDianId,
                   serviceItem:data.projectId,
                   serviceItemName:data.projectName,
                   serviceBranchName:data.menDianName,
                   serviceDateTime:data.selectTime
               }).then((res)=>{
                   if(res.data.success){
                       that.modal2 = false
                       that.getData()
                   }else{
                       Message.warning(res.data.message)
                   }
                 console.log(res)
               })
            }
        },
        cancle1(){//弹框一关闭
            this.modal = false
        },
        cancle2(){//弹框二关闭
            this.modal2 = false
        },
        changeV(){//弹框二消失
            for(let key in this.addYuyue){
                this.addYuyue[key] = ""
            } 
            console.log(this.addYuyue)
        },
        getMenDian(){//获取门店信息
            var that = this
            orgList({}).then((res)=>{
                this.menDianList = res.data.data.serviceOrgList
                console.log(res)
            })
        },
        selectMenDian(e){//选择门店
            var that = this;
            this.addYuyue.menDianId = e.value
            this.addYuyue.menDianName = e.label
            getProjectList({
                serviceBranch:e.value
            }).then((res)=>{
                that.projectList = res.data.data
                console.log(res.data.data)
            })
          console.log(e)
        },
        selectProject(e){//选择项目
            this.addYuyue.projectId = e.value
            this.addYuyue.projectName = e.label
        },
        clreanData(){
            var nowDate = this.getNowDate();
            this.sendData.endDate = nowDate;
            this.sendData.startDate = nowDate;
            this.sendData.applyName = "";
            this.sendData.currentPage = 1;
            this.sendData.pageSize = 10;
            this.getData()
        }
    },
    mounted(){
        var nowDate = this.getNowDate();
        this.sendData.endDate = nowDate;
        this.sendData.startDate = nowDate;
        console.log(nowDate)
        this.getData()
        this.getMenDian()
    }
}
</script>
<style scoped lang="scss">
  .main-warp{
      padding: 27px 138px 0 41px;
      position: relative;
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
    .data{
        span{
            margin: 0 17px;
            font-size: 16px;
            color: #000000;
            font-family: PingFangSC-Medium;
        }
        .data-warp{
            display:flex;
            align-items: center;
        }
        .data-font{  
            display:flex;
            align-items: center;
            font-family: PingFangSC-Regular;
            div{
                font-size: 16px;
                color: #000000;
                font-family: PingFangSC-Medium; 
            }
        }
        display:flex;
        align-items: center;
        justify-content: space-between;
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
    div{
      & /deep/ .ivu-modal-body{
            display: flex;
            flex-flow: column nowrap;
            align-items: center;
        }
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
        width: 560px;
        justify-content: space-around;
        margin-top: 71px;
        margin-bottom: 101px;
    }
     //模态弹框2
   .modal-header{
      display: flex;
      align-items: center;
      margin-bottom: 21px;
     .modal-header-font{
        font-family: PingFangSC-Medium;
        font-size: 18px;
        color: #232323;
        margin-left: 17px;
     }
   }//模态框外部样式
   .from-warp{
       width: 830px;
   }
   .from-item{
       height: 40px;
       display: flex;
       align-items: center;
       margin-bottom: 30px;
       justify-content: space-between;
       .from-title{
            font-family: PingFangSC-Regular;
            font-size: 16px;
            color: #666666;
        }
        .from-item-content{
            display: flex;
            align-items: center;
        }
   }
   .from-last{
           font-family: PingFangSC-Regular;
           font-size: 16px;
           color: #666666;
      .from-tiem-warp{
            margin-top: 16px;
            margin-left: 82px;
            width: 575px;
            display: flex;
            flex-flow: row wrap;
            cursor: pointer;
       }
       .time-duan{
           width: 105px;
           height: 37px;
           border: 1px solid #F77557;
           border-radius: 8px;
           display: flex;
           align-items: center;
           justify-content: center;
           margin:0 38px 19px 0;
           font-family: PingFangSC-Regular;
           font-size: 11px;
           color: #000000;
       }
       .time-duan-font{
           margin-left: 7px;
       }
       .xuanze{
           background: #F77557;
           color: #fff;
       }
       .disable{
           border-color: #B3B5B8;
           color: #B3B6B8;
       }
   } //自定义表单样式
   .buttun-warp{
       width: 460px;
       margin: 72px 0 79px;
       display: flex;
       justify-content: space-between;
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
   }//弹框底部按钮样式
</style>



