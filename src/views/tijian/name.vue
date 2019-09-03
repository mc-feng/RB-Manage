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
             </div>
             <div class="data-warp">
                <div class="button" @click="sreach">查询</div>   
                <div class="button">重置</div>  
             </div>
        </div>
        <Table :data="tableData1" :columns="tableColumns1" style="margin-top:35px;" ref="table"></Table>
        <div style="margin: 10px;overflow: hidden">
            <div style="float: right;">
                <Page :total="sendData.total" @on-change="changePage"></Page>
            </div>
        </div>
    </div>
</template>
<script>
import {getOrder} from "../../api/api";
export default {
    data(){
        return{
            sendData:{
                startDate:"",
                endDate:"",
                currentPage:1,
                pageSize:10,
                total:0
            },//发送查询数据
            value1:"",
            value2:"",
            modal:false,
            hideFoot:true,
            tableData1:[
                {
                  number:"1",
                  bookNumber:"201123123123123",
                  yNumber:"sds1234564132",
                  name:"王笑笑",
                  idCard:"342622199410221611",
                  phone:"13985334922",
                  bookMon:"400.00",
                  project:"一体机",
                  creartTime:"2019-05-12"
                },
                {
                  number:"2",
                  bookNumber:"201123123123123",
                  yNumber:"sds1234564132",
                  name:"王笑笑",
                  idCard:"342622199410221611",
                  phone:"13985334922",
                  bookMon:"400.00",
                  project:"一体机",
                  creartTime:"2019-05-12"
                },
                {
                  number:"3",
                  bookNumber:"201123123123123",
                  yNumber:"sds1234564132",
                  name:"王笑笑",
                  idCard:"342622199410221611",
                  phone:"13985334922",
                  bookMon:"400.00",
                  project:"一体机",
                  creartTime:"2019-05-12"
                },
                {
                  number:"4",
                  bookNumber:"201123123123123",
                  yNumber:"sds1234564132",
                  name:"王笑笑",
                  idCard:"342622199410221611",
                  phone:"13985334922",
                  bookMon:"400.00",
                  project:"一体机",
                  creartTime:"2019-05-12"
                }
            ] ,
            tableColumns1: [
                    {
                        title: '序号',
                        key: 'number'
                    },
                    {
                        title: '订单编号',
                        key: 'bookNumber'
                    },
                    {
                        title: '预约单号',
                        key: 'yNumber'
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
                        title: '联系方式',
                        key: 'phone'
                    },
                    {
                        title: '订单金额',
                        key: 'bookMon'
                    },
                    {
                        title: '项目名称',
                        key: 'project'
                    },
                    {
                        title: '创建时间',
                        key: 'creartTime'
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
        changePage(e){
            //需要总条数和当前的页数
            this.sendData.currentPage = e
            this.getData()
            console.log(e)
        }, //改变页数
        getData(){
          getOrder({
            startDate:this.sendData.startDate,
            endDate:this.sendData.endDate,
            currentPage:this.sendData.currentPage,
            pageSize:10
          }).then((res)=>{
              console.log(res)
          })
        },//获取数据
        sreach(){
            this.sendData.currentPage = 1
            this.getData()
        },//查询
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
</style>


