<template>
    <div class="main-warp">
        <div class="main">      
           <div class="yuye-title">会议室列表</div>
           <Table :columns="columns1" :data="data1" style="margin-top:20px;" width="1028">
               <template slot-scope="{row}" slot="action">
                   <div class="action-warp">
                        <Switchs v-model="row.action" @on-change="change(row.action)">
                            <span slot="open">开</span>
                            <span slot="close">关</span>
                        </Switchs>
                        <div class="heng"></div>
                        <div class="heng-font" @click="show">部分关闭</div>
                   </div>
               </template>
           </Table>
           <div class="setting-title">部分关闭设置列表</div>
           <Table :columns="columns2" :data="data2" style="margin-top:20px;"></Table>
           <div style="margin: 10px;overflow: hidden"><!-- 分页 -->
                <div style="float: right;">
                    <Page :total="100" :current="1" @on-change="changePage" show-sizer></Page>
                </div>
           </div>
        </div>
        <Modal
            v-model="modal"
            :footer-hide="hideFoot"
            width="928"
            >
           <div class="modal-header">
               <Icon type="ios-lock-outline" style="color:#F77557;font-size:23px"/>
               <div class="modal-header-font">会议部分关闭设置</div>
           </div>
           <div class="from-warp">
                   <div class="from-item">
                       <div class="from-title">会议室：</div>
                       <Select style="width:251px">
                            <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                        </Select>
                   </div>
                   <div class="from-item">
                       <div class="from-title">选定日期：</div>
                       <RadioGroup v-model="date">
                            <Radio label="单日">
                                <span>单日</span>
                            </Radio>
                            <Radio label="多日">
                                <span>多日</span>
                            </Radio>
                        </RadioGroup>
                   </div>
                   <div class="from-item">
                       <div class="from-title">选择日期：</div>
                       <Date-picker :type="date=='单日'?'date':'daterange'" 
                        placeholder="选择日期" 
                        style="width:190px;" 
                        :value="value"
                        @on-change="handleChange"></Date-picker>
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
<style scoped lang="scss">
  .main-warp{
      display: flex;
      justify-content: center;
  }
  .main{
    width: 1203px;
  }
  .yuye-title{
      font-family: PingFangSC-Medium;
      font-size: 24px;
      color: #000000;
      margin-top: 29px;
  }
  .setting-title{
      font-family: PingFangSC-Medium;
      font-size: 24px;
      color: #000000;
      margin:56px 0 20px;
  }
  .action-warp{
      display: flex;
      align-items: center;
  }
  .heng{
      width: 2px;
      height: 21px;
      background: #0091FF;
      margin: 0 12px 0 14px;
  }
  .heng-font{
      font-family: PingFangSC-Medium;
      font-size: 14px;
      color: #0091FF;
      cursor: pointer;
  }//操作样式
  div{
      & /deep/ .ivu-modal-body{
            display: flex;
            flex-flow: column nowrap;
            align-items: center;
        }
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
   }
   .modal-header{
      display: flex;
      align-items: center;
      margin-bottom: 21px;
     .modal-header-font{
        font-family: PingFangSC-Medium;
        font-size: 18px;
        color: #232323;
        margin-left: 21px;
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
       .from-title{
            font-family: PingFangSC-Regular;
            font-size: 16px;
            color: #666666;
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
<script>
import {Message} from 'iview'
export default {
    data(){
        return{
          hideFoot:true,
          switch1:false,
          modal:false,
          cityList: [
                    {
                        value: 'New York',
                        label: 'New York'
                    },
                    {
                        value: 'London',
                        label: 'London'
                    },
            ], 
          date:"单日",
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
          columns1:[
              {
                  title: '会议室名称',
                  key: 'name',
              },
              {
                  title:"所属地区",
                  key:"place"
              },
              {
                  title:"当前状态",
                  key:"state",
                  render:(h,params)=>{
                     const row = params.row;
                     var status = row.state;
                     if(status=="关闭"){
                         var color="#6D7278"
                         var text = "关闭"
                     }else if(status =="开"){
                         var color = "#F77557"
                         var text = "开"
                     }
                    return h("div",{
                            style:{
                                display: "flex",
                                alignItems: "center"
                            }
                        },
                        [
                        h("span",{
                            style:{
                                background: color,
                                width:"14px",
                                height:"14px",
                                borderRadius:"50%",
                                marginRight:"9px"
                            },
                        }),
                        h("span",{
                            style:{
                                fontFamily: "PingFangSC-Regular",
                                fontSize: "14px",
                                color:" #000000"
                            }
                        },text)]
                    )
                  }
              },
              {
                  title:"操作",
                  slot: 'action',
                //   render:(h,params)=>{
                //      const row = params.row;
                //      var action= row.action;
                //      return h("div",
                //        {
                //            style:{
                //                display: "flex",
                //                alignItems: "center"
                //            }
                //        },
                //        [
                //            h("")
                //        ]
                //      )
                //   }
              }
          ],
          data1:[
              {
                  name:"15F—会议室",
                  place:"上海",
                  state:"关闭",
                  action:true
              },
              {
                  name:"15F—会议室",
                  place:"上海",
                  state:"开",
                  action:false
              }
          ],
          columns2:[
              {
                  title:"创建日期",
                  key:"date"
              },
              {
                  title:"会议室名称",
                  key:"name"
              },
              {
                  title:"所属地区",
                  key:"place"
              },
              {
                  title:"关闭日期",
                  key:"closeDate"
              },
              {
                  title:"时间段",
                  key:"time"
              },
              {
                  title:"操作",
                  key:"action",
                  render:(h,params)=>{
                      const text = params.row.action
                      return h("div",{
                          style:{
                              fontSize:"14px",
                              color:"#0091FF",
                              cursor: "pointer" 
                          },
                          on:{click:()=>{console.log(2)}}
                      },text)
                  }
              }
          ],
          data2:[
              {
                  date:"2019-06-01",
                  name:"15F—会议室",
                  place:"上海",
                  closeDate:"2019-06-19",
                  time:"8:30～18:30",
                  action:"删除"
              },
              {
                  date:"2019-06-01",
                  name:"15F—会议室",
                  place:"上海",
                  closeDate:"2019-06-19",
                  time:"8:30～18:30",
                  action:"删除"
              },
              {
                  date:"2019-06-01",
                  name:"15F—会议室",
                  place:"上海",
                  closeDate:"2019-06-19",
                  time:"8:30～18:30",
                  action:"删除"
              },
              {
                  date:"2019-06-01",
                  name:"15F—会议室",
                  place:"上海",
                  closeDate:"2019-06-19",
                  time:"8:30～18:30",
                  action:"删除"
              }
          ]
        }
    },
    methods:{
        change(e){
            console.log(e)
        },
        show(){
            this.modal = true
        },
        changePage(){

        },//页数设置
        handleChange(data){
           console.log(data)
        },//日期改变
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
        }
    }
}
</script>

