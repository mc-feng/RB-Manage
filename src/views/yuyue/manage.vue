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
    </div>
</template>
<script>
export default {
    data(){
        return{
            value1:"",
            value2:""
        }
    },
    methods:{
       handleChange(data){
           this.value1 = data
       },
       handleChange2(data){
           this.value2 = data
       }
    }
}
</script>
<style scoped lang="scss">
  .main-warp{
      padding: 27px 0 0 41px;
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
  }
</style>


