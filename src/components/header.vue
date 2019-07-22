<template>
    <div class="header">
      <div class="loge">
          <img src="../images/loge.png" alt="图标">
      </div>
      <div class="header-title">PICC健康上海预约后台管理系统</div>
    </div>
</template>
<style scoped>
 .header{
     width: 100%;
     height: 80px;
     background: #F77557;
     position: relative;
     display: flex;
     flex-flow: column nowrap;
     justify-content: center;
 }
 .loge{
     position: absolute;
     left: 0;
     height: 80px;
     width: 185px;
     background: #DA4C2A;
     display: flex;
     align-items: center;
     justify-content: center;
 }
 .loge img{
    width: 67px;
    height: 46px;
 }
 .header-title{
     margin-left: 208px;
     font-size: 18px;
     color: #FFFFFF;
 }
</style>
