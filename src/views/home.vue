<template>
    <div class="home">
       <img src="../images/background.png" alt="">
       <div class="home-main">
           <img src="../images/loge.png" alt="">
           <div class="home-font">
               <p>欢迎登陆</p>
               <p>PICC健康服务预约管理平台</p>
           </div>
       </div>
    </div>
</template>
<style scoped>
    .home{
        height: 100%;
        width: 100%;
        position: relative;
    }
   .home img{
       height: 100%;
       width: 100%;
        float:left /*消除图片一像素距离 */
   }
   .home-main{
       position: absolute;
       left: 0px;
       top: 0px;
       background:rgba(247,117,87,0.6);
       width: 100%;
       height: 100%;
       display: flex;
       flex-flow: column nowrap;
       align-items: center;
       justify-content: center;
   }
   .home-main img{
       width: 249px;
       height: 171px;
   }
   .home-font{
       font-size: 30px;
       color: #FFFFFF;
       margin-top: 27px;
       line-height: 42px;
       text-align: center;
   }
</style>
