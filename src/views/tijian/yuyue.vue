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
                    <Input  placeholder="请输入姓名查找..." style="width:220px" v-model="sendData.name"/>
                </div>
             </div>
             <div class="data-warp">
                <div class="button" @click="sreach">检索</div>   
                <div class="button">重置</div>  
                <div class="button" @click="showModel2">新增预约</div>
                <div class="button" @click="exportData()">导出数据</div>
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
                <div class="button">确认</div>
                <div class="button">取消</div>
            </div>
        </Modal>
        <Modal
            v-model="modal2"
            :footer-hide="hideFoot"
            width="928"
            >
           <div class="modal-header">
               <Icon type="ios-checkbox-outline" style="color:#F77557;font-size:30px"/>
               <div class="modal-header-font">新增体检预约</div>
           </div>
           <div class="from-warp">
                   <div class="from-item">
                       <div class="from-item-content">
                           <div class="from-title">姓名&emsp;&emsp;：</div>
                           <Input  placeholder="请输入姓名" style="width: 251px" />
                        </div>
                        <div class="from-item-content">
                             <div class="from-title">手机号：</div>
                             <Input placeholder="请输入手机号" style="width: 251px" />
                        </div>
                   </div>
                   <div class="from-item">
                       <div class="from-item-content">
                           <div class="from-title">身份证号：</div>
                           <Input placeholder="请输入身份证号" style="width: 251px" />
                       </div>
                       <div class="from-item-content">
                            <div class="from-title">预约项目：</div>
                            <Select style="width:251px">
                                    <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                            </Select>
                        </div>
                   </div>
                   <div class="from-item">
                       <div class="from-item-content">
                          <div class="from-title">选择日期：</div>
                          <Date-picker 
                            placeholder="选择日期" 
                            style="width:190px;" 
                            value=""
                            ></Date-picker>
                       </div>
                   </div>
                   <div class="from-last">
                       <div class="from-title">选择时间段：</div>
                       <div class="from-tiem-warp">
                           <div  class="time-duan"  :class='item.check?"xuanze":item.status==1?"":"disable"'  v-for="(item,index) in timeList"  :key="index" @click="changTime(index)">
                               <Icon type="ios-egg" :style="[{'font-size':'10px'},{color:item.check?'#FFFFFF':item.status==1?'#F77557':'#B3B5B8'}]"/>
                               <div class="time-duan-font" :style="{color:item.check?'#FFFFFF':item.status==1?'#000000':'#B3B6B8'}">{{item.time}}</div>
                           </div>
                       </div>
                   </div>
            </div>
            <div class="buttun-warp">
                <div class="button">取消</div>
                <div class="button">确定</div>
            </div>
        </Modal>
    </div>
</template>
<script>
import {getYuyue} from "../../api/api";
import {Message} from 'iview'
export default {
    data(){
        return{
            sendData:{
                startDate:"",
                endDate:"",
                name:"",
                currentPage:1,
                pageSize:10,
                total:0
            },//发送查询数据
            modal:false,
            modal2:false,
            cityList: [
                    {
                        value: '一体机',
                        label: '一体机'
                    },
                    {
                        value: '心脏机器',
                        label: '心脏机器'
                    },
            ], 
          value:"",
          timeList:[
              {
                  time:"9:30 ~ 10:00",
                  status:1,
                  check:false,
              },
              {
                  time:"9:30 ~ 10:00",
                  status:1,
                  check:false,
              },
              {
                  time:"9:30 ~ 10:00",
                  status:2,
                  check:false,
              },
              {
                  time:"9:30 ~ 10:00",
                  status:2,
                  check:false,
              },
              {
                  time:"9:30 ~ 10:00",
                  status:1,
                  check:false,
              },
              {
                  time:"9:30 ~ 10:00",
                  status:2,
                  check:false,
              }],
            hideFoot:true,
            tableData1:[
                    {
                        number:"1",
                        bookNumber:"En1369547233",
                        name:"张三",
                        idCard:"342622199610251611",
                        phone:"13965334811",
                        project:"一体机",
                        pay:"卡密支付",
                        bookTime:"2019-12-1",
                        state:"已体检",
                        creatTime:"2019-6-6",
                        operate:"取消预约"
                    },
                    {
                        number:"2",
                        bookNumber:"En1369547233",
                        name:"张三",
                        idCard:"342622199610251611",
                        phone:"13965334811",
                        project:"一体机",
                        pay:"卡密支付",
                        bookTime:"2019-12-1",
                        state:"待体检",
                        creatTime:"2019-6-6",
                        operate:"已取消"
                    },
                    {
                        number:"3",
                        bookNumber:"En1369547233",
                        name:"张三",
                        idCard:"342622199610251611",
                        phone:"13965334811",
                        project:"一体机",
                        pay:"卡密支付",
                        bookTime:"2019-12-1",
                        state:"已关闭",
                        creatTime:"2019-6-6",
                        operate:"取消预约"
                    }
                ] ,
                tableColumns1: [
                    {
                        title: '序号',
                        key: 'number'
                    },
                    {
                        title: '预约单号',
                        key: 'bookNumber'
                    },
                    {
                        title: '姓名',
                        key: 'name'
                    },
                    {
                        title: '身份证号',
                        key: 'idCard',
                        width:"160"
                    },
                    {
                        title:"联系方式",
                        key:"phone"
                    },
                    {
                        title:"预约项目",
                        key:"project"
                    },
                    {
                        title:"支付方式",
                        key:"pay"
                    },
                    {
                        title:"预约时间",
                        key:"bookTime",
                        render:(h,params)=>{
                             return h('div', {
                                style:{color:"#0091FF"}
                            }, params.row.bookTime);
                        }
                    },
                    {
                        title:"状态",
                        key:"state",
                        render: (h, params) => {
                            const row = params.row;
                            const color = row.state === '已体检' ? '#000000' : row.state === '待体检' ? '#F77557' : row.state === '已关闭' ? '#bfbfbf' : 'red';
                            const text = row.state === '已体检' ? '已体检' : row.state === '待体检' ? '待体检' : row.state === '已关闭' ? '已关闭' : '错误'
                            return h('div', {
                                style:{color:color}
                            }, text);
                        }
                    },
                    {
                        title:"创建时间",
                        key:"creatTime"
                    },
                    {
                        title:"操作",
                        key:"operate",
                        render: (h, params) => {
                                const row = params.row;
                                const check = row.operate === '取消预约'?true:false;
                                if(check){    
                                    return h('div', {
                                        style:{
                                            color:"#EA4849",
                                            cursor:'pointer'
                                        },
                                        on:{click:()=>{this.modal=true;console.log(params)}}
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
        exportData (type) {
            this.$refs.table.exportCsv({
                filename: 'The original data'
            });
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
            getYuyue(this.sendData).then((res)=>{
             console.log(res)
            })
        },
        showModel2(){
            this.modal2 = true;
        },//展示弹框
        changTime(e){
             console.log(e);
             if(this.timeList[e].status==1){    
                this.timeList.map((item)=>{
                    item.check = false;
                })
                this.timeList[e].check = true
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
        }
    },
    mounted(){
        var nowDate = this.getNowDate();
        this.sendData.endDate = nowDate;
        this.sendData.startDate = nowDate;
        console.log(nowDate)
        this.getData()
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



