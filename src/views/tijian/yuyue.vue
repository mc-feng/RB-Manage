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
                <div class="button" @click="sreach">查询</div>   
                <div class="button" @click="clreanData">重置</div>  
             </div>
        </div>
        <div class="option">
                <div class="button option-margin" @click="exportData">导出数据</div>
                <div class="button" @click="showModel2">新增预约</div>
        </div>
        <Table :data="tableData1" :columns="tableColumns1" style="margin-top:15px;" ref="table"></Table>
        <div style="margin: 10px;overflow: hidden">
            <div style="float: right;">
                <Page :total="sendData.total" :page-size="sendData.pageSize"  @on-change="onpagechange" :current="sendData.currentPage"></Page>
            </div>
        </div>
        <Modal
            v-model="modal"
            :footer-hide="hideFoot"
            width="775"
            >
            <div class="modal-title">
                <Icon custom="iconfont i-icon-quxiao" color="#F77557" size="27"/>
                <div class="title-font">取消预约</div>
            </div>
            <div class="modal-tips">
                <Icon custom="iconfont i-icon-jinggao" color="#FF9900" size="32" style="margin-top:4px;"/>
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
            :mask-closable="false"
            >
           <div class="modal-header">
               <Icon custom="iconfont i-icon-yuyue" style="color:#F77557;font-size:30px"/>
               <div class="modal-header-font">新增体检预约</div>
           </div>
           <Steps :current="curre">
                <Step title="步骤1" content="信息填写"></Step>
                <Step title="步骤2" content="选择支付方式"></Step>
                <Step title="步骤3" content="预约成功"></Step>
            </Steps>
           <div v-if="curre==0" class="model-map">
            <div class="from-warp">
                <!-- 本人信息 -->
                    <div class="from-header">预约人信息填写</div>
                    <div class="from-item">
                        <div class="from-item-content">
                            <div class="from-title">姓名&emsp;&emsp;：</div>
                            <Input  placeholder="请输入姓名" style="width: 251px" v-model="addYuyue.name"/>
                            </div>
                            <div class="from-item-content left">
                                <div class="from-title">手机号：</div>
                                <Input placeholder="请输入手机号" style="width: 251px" v-model="addYuyue.phone"/>
                            </div>
                    </div>
                    <div class="from-item">
                        <div class="from-item-content">
                            <div class="from-title">身份证号：</div>
                            <Input placeholder="请输入身份证号" style="width: 251px" v-model="addYuyue.cardId"/>
                        </div>
                        <div class="from-item-content left">
                            <div class="from-title">是否为持卡人本人：</div>
                            <RadioGroup v-model="date">
                                <Radio label="是">
                                    <span>是</span>
                                </Radio>
                                <Radio label="否">
                                    <span>否</span>
                                </Radio>
                            </RadioGroup>
                        </div>
                    </div>
                    <!-- 他人信息 -->
                    <div class="from-header" v-if="date=='否'">持卡人信息填写</div>
                    <div class="from-item" v-if="date=='否'">
                        <div class="from-item-content">
                            <div class="from-title">姓名&emsp;&emsp;：</div>
                            <Input  placeholder="请输入姓名" style="width: 251px" v-model="addYuyue.otherName"/>
                            </div>
                            <div class="from-item-content left">
                                <div class="from-title">手机号：</div>
                                <Input placeholder="请输入手机号" style="width: 251px" v-model="addYuyue.otherPhone"/>
                            </div>
                    </div>
                    <div class="from-item" v-if="date=='否'">
                        <div class="from-item-content">
                            <div class="from-title">身份证号：</div>
                            <Input placeholder="请输入身份证号" style="width: 251px" v-model="addYuyue.otherCardId"/>
                        </div>
                    </div>
                    <!-- 预约门店 -->
                    <div class="from-header">预约信息详情</div>
                    <div class="from-item">
                         <div class="from-item-content">
                                <div class="from-title">预约门店：</div>
                                <Select style="width:251px" @on-change="selectMenDian" v-model="addYuyue.menDianId" label-in-value>
                                        <Option v-for="item in menDianList" :value="item.serviceBranch" :key="item.serviceBranch">{{ item.serviceBranchName }}</Option>
                                </Select>
                        </div>
                        <div class="from-item-content left">
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
                <div class="buttun-warp centers">
                    <div class="button" @click="next">下一步</div>
                    <!-- <div class="button" @click="sendAdd">确定</div> -->
                </div>
           </div>
           <div v-if="curre==1">
               <div class="from-warp">
                    <div class="from-header">预约信息详情</div>
                    <div class="from-item">
                                <div class="from-item-content">
                                    <div class="from-title">支付方式选择：</div>
                                    <RadioGroup v-model="date2" vertical class="radios-top">
                                        <Radio label="卡包支付">
                                            <span>卡包支付</span>
                                        </Radio>
                                        <Radio label="卡密支付" class="radio-top">
                                            <span>卡密支付</span>
                                        </Radio>
                                    </RadioGroup>
                                </div>
                                <div class="from-item-content  left" v-if="date2=='卡包支付'">
                                    <div class="from-title">选择卡包：</div>
                                    <Select style="width:251px" @on-change="selectCard" v-model="addYuyue.cardNumber" label-in-value>
                                                <Option v-for="item in cardList" :value="item.cardNumber" :key="item.cardNumber">{{ item.productName }}</Option>
                                    </Select>
                                </div>
                                <div class="from-item-content left vectr" v-if="date2=='卡密支付'">
                                    <div>
                                        <div class="from-title">卡片编码：</div>
                                        <Input placeholder="请输入卡片编码" style="width: 251px" v-model="addYuyue.cardNumber"/>
                                    </div>
                                    <div class="vectr-top">   
                                        <div class="from-title">卡片密码：</div>
                                        <Input placeholder="请输入卡片密码" style="width: 251px" v-model="addYuyue.cardPassword"/>
                                    </div>
                                </div>
                    </div>
                    <div class="nextWarp">
                      <div class="button" @click="next">下一步</div>
                    </div>
               </div>
           </div>
           <div v-if="curre==2">
                <div class="succee-warp">
                    <Icon type="ios-checkmark-circle" class="succee-font"/>
                    <div class="succee-tip">操作成功</div>
                    <div class="succee-message">体检预约成功，请确认信息</div>
                </div>
               <div class="nextWarp notop">
                      <div class="button" @click="next">完成</div>
               </div>
           </div>
        </Modal>
    </div>
</template>
<script>
import {getYuyue,cancelReservation,reservationExport,orgList,getProjectList,getReservationTime,reservation,cardPackage} from "../../api/api";
import {Message} from 'iview'
export default {
    data(){
        return{
            date2:"卡包支付",
            date:"是",
            curre:0,//选择是第几部
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
                selectTime:"",
                otherName:"",
                otherPhone:"",
                otherCardId:""
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
            cardList:[],//获取卡包列表
            value:"",
            timeList:[
            ],
            hideFoot:true,
            tableData1:[],
            tableColumns1: [
                {
                    title: '序号',
                    key: 'no',
                    width:"60"
                },
                {
                    title: '预约单号',
                    key: 'reservationNumber',
                    tooltip:true
                },
                {
                    title: '姓名',
                    key: 'applyName',
                },
                {
                    title: '身份证号',
                    key: 'applyidNo',
                    tooltip:true
                },
                {
                    title:"联系方式",
                    key:"applyTel",
                    tooltip:true
                },
                {
                    title:"预约项目",
                    key:"serviceItemName",
                    tooltip:true
                },
                {
                    title:"支付方式",
                    key:"paymentName"
                },
                {
                    title:"预约时间",
                    key:"reservationTime",
                    tooltip:true,
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
                    key:"createTime",
                    tooltip:true
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
           this.addYuyue.selectTime = ""
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
                    that.tableData1 = []
                   that.sendData.total = 0
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
        // sendAdd(){
        //     var that = this
        //     var data = this.addYuyue
        //     if(!data.name){
        //          Message.warning("请填写姓名")
        //     }else if(data.name.length>=15){
        //          Message.warning("姓名不能超过15位")
        //     }else if(!data.phone){
        //         Message.warning("请填手机号码")
        //     }else if(!(/^1[3456789]\d{9}$/.test(data.phone.replace(/^\s+|\s+$/g, "")))){
        //         Message.warning("手机号码格式不正确")
        //     }else if(!data.cardId){
        //         Message.warning("请填身份证")
        //     }else if(!(/^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/.test(data.cardId.replace(/^\s+|\s+$/g, "")))){
        //         Message.warning("身份证格式不正确")
        //     }else if(!data.cardNumber){
        //         Message.warning("请填卡号")
        //     }else if(!data.cardPassword){
        //         Message.warning("请填卡密")
        //     }else if(!data.menDianId){
        //         Message.warning("请填门店")
        //     }else if(!data.projectId){
        //         Message.warning("请选择项目")
        //     }else if(!data.selectDate){
        //         Message.warning("请选择日期")
        //     }else if(!data.selectTime){
        //         Message.warning("请选择时间段")
        //     }else{
        //        reservation({
        //            applyName:data.name,
        //            applyTel:data.phone.replace(/^\s+|\s+$/g, ""),
        //            applyIDNo:data.cardId.replace(/^\s+|\s+$/g, ""),
        //            cardNumber:data.cardNumber,
        //            passWord:data.cardPassword,
        //            serviceBranch:data.menDianId,
        //            serviceItem:data.projectId,
        //            serviceItemName:data.projectName,
        //            serviceBranchName:data.menDianName,
        //            serviceDateTime:data.selectTime
        //        }).then((res)=>{
        //            if(res.data.success){
        //                that.modal2 = false
        //                that.getData()
        //            }else{
        //                Message.warning(res.data.message)
        //            }
        //          console.log(res)
        //        })
        //     }
        // },
        cancle1(){//弹框一关闭
            this.modal = false
        },
        // cancle2(){//弹框二关闭
        //     this.curre = 1
        // },
        changeV(){//弹框二消失
            // this.projectList = []
            this.timeList = []
            var that = this
            for(let key in this.addYuyue){
                  if(key == "menDianId"||key == "projectId"||key =="menDianName"||key =="projectName"){
                  }else{
                    this.addYuyue[key] = ""
                  }
                //  this.addYuyue[key] = ""
            } 
            this.curre = 0
            console.log(this.addYuyue)
            this.cardList = []
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
        selectCard(e){//选择卡包
            this.addYuyue.cardNumber = e.value
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
        },
        next(){
            // console.log(this.curre)
            //  if (this.curre == 2) {
            //     this.curre = 0;
            // } else {
            //     this.curre += 1;
            // }
            var that = this
            var data = this.addYuyue
            if(this.curre==0){
                if(this.date=="是"){
                    if(!data.name){
                        Message.warning("请填写姓名")
                    }else if(data.name.length>=15){
                        Message.warning("姓名不能超过15位")
                    }else if(!data.phone){
                        Message.warning("请填手机号码")
                    }else if(!(/^1[3456789]\d{9}$/.test(data.phone.replace(/^\s+|\s+$/g, "")))){
                        Message.warning("手机号码格式不正确")
                    }else if(!data.cardId){
                        Message.warning("请填身份证")
                    }else if(!(/^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/.test(data.cardId.replace(/^\s+|\s+$/g, "")))){
                        Message.warning("身份证格式不正确")
                    }else if(!data.menDianId){
                        Message.warning("请填门店")
                    }else if(!data.projectId){
                        Message.warning("请选择项目")
                    }else if(!data.selectDate){
                        Message.warning("请选择日期")
                    }else if(!data.selectTime){
                        Message.warning("请选择时间段")
                    }else{
                      console.log(data.menDianId)
                     data.otherName = data.name
                     data.otherPhone = data.phone
                     data.otherCardId = data.cardId
                     cardPackage({
                         name:data.name,
                         IDNo:data.cardId,
                         serviceBranch:data.menDianId,
                         serviceItem:data.projectId
                     }).then((res)=>{
                         console.log(res)
                         if(res.data.success){
                             that.cardList = res.data.data;
                             this.curre += 1;
                         }else{
                             Message.warning("查询失败")
                         }
                     })
                    }
                }else if(this.date=="否"){
                    if(!data.name){
                        Message.warning("请填写姓名")
                    }else if(data.name.length>=15){
                        Message.warning("姓名不能超过15位")
                    }else if(!data.phone){
                        Message.warning("请填手机号码")
                    }else if(!(/^1[3456789]\d{9}$/.test(data.phone.replace(/^\s+|\s+$/g, "")))){
                        Message.warning("手机号码格式不正确")
                    }else if(!data.cardId){
                        Message.warning("请填身份证")
                    }else if(!(/^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/.test(data.cardId.replace(/^\s+|\s+$/g, "")))){
                        Message.warning("身份证格式不正确")
                    }else if(!data.otherName){
                        Message.warning("请填写姓名")
                    }else if(data.otherName.length>=15){
                        Message.warning("姓名不能超过15位")
                    }else if(!data.otherPhone){
                        Message.warning("请填手机号码")
                    }else if(!(/^1[3456789]\d{9}$/.test(data.otherPhone.replace(/^\s+|\s+$/g, "")))){
                        Message.warning("手机号码格式不正确")
                    }else if(!data.otherCardId){
                        Message.warning("请填身份证")
                    }else if(!(/^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/.test(data.otherCardId.replace(/^\s+|\s+$/g, "")))){
                        Message.warning("身份证格式不正确")
                    }else if(!data.menDianId){
                        Message.warning("请填门店")
                    }else if(!data.projectId){
                        Message.warning("请选择项目")
                    }else if(!data.selectDate){
                        Message.warning("请选择日期")
                    }else if(!data.selectTime){
                        Message.warning("请选择时间段")
                    }else{
                        cardPackage({
                            name:data.otherName,
                            IDNo:data.otherCardId,
                            serviceBranch:data.menDianId,
                            serviceItem:data.projectId
                        }).then((res)=>{
                            console.log(res)
                            if(res.data.success){
                                that.cardList = res.data.data;
                                this.curre += 1;
                            }else{
                                Message.warning("查询失败")
                            }
                        })
                    }
                }
            }else if(this.curre == 1){
                if(this.date2=="卡包支付"){
                    var payment = "03"
                }else if(this.date2=="卡密支付"){
                    var payment = "02"
                }
                if(!data.cardNumber){
                    Message.warning("请填卡号")
                }else if(!data.cardPassword&&this.date2=="卡密支付"){
                    Message.warning("请填卡密")
                }else{
                    reservation({
                        applyName:data.name,
                        applyTel:data.phone.replace(/^\s+|\s+$/g, ""),
                        applyIDNo:data.cardId.replace(/^\s+|\s+$/g, ""),
                        resName:data.otherName,
                        resTel:data.otherPhone,
                        resIDNo:data.otherCardId,
                        cardNumber:data.cardNumber,
                        passWord:data.cardPassword,
                        serviceBranch:data.menDianId,
                        serviceItem:data.projectId,
                        serviceItemName:data.projectName,
                        serviceBranchName:data.menDianName,
                        serviceDateTime:data.selectTime,
                        payment
                    }).then((res)=>{
                        if(res.data.success){
                            // that.modal2 = false
                            // that.getData()
                                that.curre += 1;
                        }else{
                            Message.warning(res.data.message)
                        }
                        console.log(res)
                    })
                }
            }else if(this.curre == 2){
                this.curre = 0;
                that.modal2 = false
                that.getData()
            }
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
       margin-top: 26px;
   }
   .from-item{
       height: 40px;
       display: flex;
       align-items: center;
       margin-bottom: 20px;
       .from-title{
            font-family: PingFangSC-Regular;
            font-size: 16px;
            color: #666666;
        }
        .from-item-content{
            display: flex;
            align-items: center;
        }
        .left{
            margin-left: 87px
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
       margin: 62px 0 58px;
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
   .centers{
           justify-content: center
    }
    .nextWarp{
        width: 100%;
        justify-content: center;
        align-items: center;
        display: flex;
        margin:380px 0 68px 0;
    }
   .option{
       margin-top: 15px;
       display: flex;
       align-items: center;
   }
   .option-margin{
       margin-left: 0
   }
   .model-map{
       display: flex;
       flex-flow: column nowrap;
       align-items: center
   }
   //弹框上不样式
   .ivu-steps{
       margin-left: 260px;
   }
   .from-header{
       line-height: 38px;
       border-bottom: 1px solid #D8D8D8;
       font-size: 16px;
       color: #F77557;
       text-align: left;
       margin-bottom: 26px;
   }
   //单选框样式修改
   div{
      & /deep/ .ivu-radio-inner:after{
          background-color: #F77557;
          width: 14px;
          height: 14px;
          border-radius: 50%;
          left: 4px;
          top: 4px;
      }
      & /deep/.ivu-radio-checked .ivu-radio-inner{
          border-color: #F77557 ;
      }
      & /deep/.ivu-radio-inner{
          width: 24px;
          height: 24px;
      }
      & /deep/ .ivu-radio-wrapper{
        font-family: PingFangSC-Regular;
        font-size: 16px;
        color: #232323;
      }
      & /deep/ .ivu-steps-status-finish .ivu-steps-head-inner{
          border-color:#F77557
      }
      & /deep/ .ivu-steps-status-finish .ivu-steps-head-inner .ivu-steps-icon{
          color: #F77557
      }
      & /deep/ .ivu-steps-item.ivu-steps-status-finish .ivu-steps-tail>i:after{
          background: #F77557
      }
      & /deep/  .ivu-steps-status-process .ivu-steps-head-inner{
          background-color:#F77557;
          border-color:#F77557
      }
      & /deep/ .ivu-steps-item.ivu-steps-status-finish .ivu-steps-title{
          color: #F77557
      }
      & /deep/ .ivu-steps-item.ivu-steps-status-finish .ivu-steps-content{
          color: #F77557
      }
   }
   .vectr{
       flex-flow: column nowrap;
       margin-top: 230px
   }
   .vectr-top{
       margin-top:20px;
   }
   .radios-top{
        margin-top: 70px;
   }
   .radio-top{
       margin-top: 38px;
   }
   .notop{
       margin-top: 100px;
   }
   .succee-warp{
       margin-top: 100px;
       display: flex;
       flex-flow: column nowrap;
       justify-content: center;
       align-items: center;
   }
   .succee-font{
       font-size: 72px;
       color:  #52C41A;
       margin-bottom: 24px;
   }
   .succee-tip{
        font-family: PingFangSC-Medium;
        font-size: 24px;
        color: rgba(0,0,0,0.85);
        line-height: 32px;
        margin-bottom: 8px;
   }
   .succee-message{
        font-family: PingFangSC-Regular;
        font-size: 14px;
        color: rgba(0,0,0,0.43);
        line-height: 22px;
   }
</style>



