<template>
    <div class="main-warp">
        <div class="data">  
            <Date-picker type="date" 
              placeholder="选择日期" 
              style="width:190px;" 
              :value="value1"
              @on-change="handleChange"></Date-picker>
            <span>至</span>
            <Date-picker type="date" 
              placeholder="选择日期" 
              style="width:190px;" 
              :value="value2"
              @on-change="handleChange2"></Date-picker>
              <div class="button">检索</div>
        </div>
        <div class="top-row">
           <div class="button marLeft">新增预约</div>
           <div class="button" @click="exportData()">导出数据</div>
        </div>
        <Table :data="tableData1" :columns="tableColumns1" style="margin-top:113px;" ref="table"></Table>
        <div style="margin: 10px;overflow: hidden">
            <div style="float: right;">
                <Page :total="100" :current="1" @on-change="changePage" show-sizer></Page>
            </div>
        </div>
        <Modal
            v-model="modal"
            :footer-hide="hideFoot"
            width="928"
            >
            <div class="modal-title">
                <Icon type="ios-desktop-outline" color="#F77557" size="27"/>
                <div class="title-font">会议预约管理</div>
            </div>
            <div class="modal-tips">
                <Icon type="ios-information-circle-outline" color="#FF9900" size="32" style="margin-top:4px;"/>
                <div class="tips-font">您正在取消预约，请确认</div>
            </div>
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
<script>
export default {
    data(){
        return{
            value1:"",
            value2:"",
            modal:false,
            hideFoot:true,
            tableData1:[
                    {
                        date:"2019-06-19",
                        time:"9:00～9:30",
                        huiyi:"大会议室",
                        people:"王二",
                        meetMain:"营销会议",
                        state:"预约中",
                        user:"王小丽",
                        operateTime:"2019-06-12  15:25:20",
                        operate:"取消预约"
                    },
                    {
                        date:"2019-06-19",
                        time:"9:00～9:30",
                        huiyi:"大会议室",
                        people:"王二",
                        meetMain:"营销会议",
                        state:"已取消",
                        user:"王小丽",
                        operateTime:"2019-06-12  15:25:20",
                        operate:"取消预约"
                    },
                    {
                        date:"2019-06-19",
                        time:"9:00～9:30",
                        huiyi:"大会议室",
                        people:"王二",
                        meetMain:"营销会议",
                        state:"已取消",
                        user:"王小丽",
                        operateTime:"2019-06-12  15:25:20",
                        operate:"取消预约"
                    },
                    {
                        date:"2019-06-19",
                        time:"9:00～9:30",
                        huiyi:"大会议室",
                        people:"王二",
                        meetMain:"营销会议",
                        state:"已取消",
                        user:"王小丽",
                        operateTime:"2019-06-12  15:25:20",
                        operate:"取消预约"
                    },
                    {
                        date:"2019-06-19",
                        time:"9:00～9:30",
                        huiyi:"大会议室",
                        people:"王二",
                        meetMain:"营销会议",
                        state:"预约中",
                        user:"王小丽",
                        operateTime:"2019-06-12  15:25:20",
                        operate:"取消预约"
                    },
                    {
                        date:"2019-06-19",
                        time:"9:00～9:30",
                        huiyi:"大会议室",
                        people:"王二",
                        meetMain:"营销会议",
                        state:"预约中",
                        user:"王小丽",
                        operateTime:"2019-06-12  15:25:20",
                        operate:"取消预约"
                    },
                    {
                        date:"2019-06-19",
                        time:"9:00～9:30",
                        huiyi:"大会议室",
                        people:"王二",
                        meetMain:"营销会议",
                        state:"预约中",
                        user:"王小丽",
                        operateTime:"2019-06-12  15:25:20",
                        operate:"取消预约"
                    },
                ] ,
            tableColumns1: [
                    {
                        title: '日期',
                        key: 'date'
                    },
                    {
                        title: '时间段',
                        key: 'time'
                    },
                    {
                        title: '会议室',
                        key: 'huiyi'
                    },
                    {
                        title: '使用人',
                        key: 'people'
                    },
                    {
                        title:"会议主题",
                        key:"meetMain"
                    },
                    {
                        title: '状态',
                        key: 'state',
                        render: (h, params) => {
                            const row = params.row;
                            const color = row.state === '已取消' ? '#6D7278' : row.state === '预约中' ? '#F77557' : 'red';
                            const text = row.state === '已取消' ? '已取消' : row.state === '预约中' ? '预约中' : '错误';

                            return h('div', {
                                style:{color:color}
                            }, text);
                        }
                    },
                    {
                        title:"用户来源",
                        key:"user"
                    },
                    {
                        title:"操作时间",
                        key:"operateTime"
                    },
                    {
                        title:"操作",
                        key:"operate",
                        render: (h, params) => {
                                const row = params.row;
                                const check = row.state === '预约中'?true:false;
                                if(check){    
                                    return h('div', {
                                        style:{
                                            color:"#0091FF",
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
           this.value1 = data
       },
       handleChange2(data){
           this.value2 = data
       },
        exportData (type) {
            this.$refs.table.exportCsv({
                filename: 'The original data'
            });
        },   //导出数据
        changePage(e){
            //需要总条数和当前的页数
            console.log(e)
        }  //改变页数
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
    }
    .data{
        span{
            margin: 0 17px;
            font-size: 18px;
            color: #000000;
            font-family: PingFangSC-Medium;
        }
        display:flex;
        align-items: center;
    }
    .top-row{
        float: right;
        display:flex;
        margin-top: 47px;
        .marLeft{
            margin-left: 50px;
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
    div{
      & /deep/ .ivu-modal-body{
            display: flex;
            flex-flow: column nowrap;
            align-items: center;
        }
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
        margin-top: 35px;
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
</style>


