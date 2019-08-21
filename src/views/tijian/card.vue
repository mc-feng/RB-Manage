<template>
    <vue-seamless-scroll :data="listData" :class-option="classOption" class="seamless-warp">
        <ul class="item">
            <li v-for="(item,index) in listData" :key="index">
                <span class="title" v-text="item.title"></span><span class="date" v-text="item.date"></span>
            </li>
        </ul>
    </vue-seamless-scroll>
</template>
<style lang="scss" scoped>
    .seamless-warp{
        height: 229px;
        overflow: hidden;
    }
</style>
<script>
    import vueSeamless from 'vue-seamless-scroll'//无缝滚动
    import axios from 'axios'//请求
    export default {
        data () {
            return {
                listData: []
                }
            },
            mounted(){
                axios.get('https://www.easy-mock.com/mock/5d0f1bc07e96485dab3767ce/example/getlist').then(res=>{
                    console.log(res.data.data.list)
                    var list = []
                    res.data.data.list.forEach(item => {
                        list.push(item)
                    });
                    console.log(this.listData)
                    this.listData =list
                })
            },
            computed: {
                classOption () {
                    return {
                           singleHeight: 51,
                            waitTime: 1000,
                            step: 1,
                            openTouch: false,
                            direction:1
                        }
                }
             },
             components: {
                    vueSeamlessScroll:vueSeamless
             }
       }
</script>