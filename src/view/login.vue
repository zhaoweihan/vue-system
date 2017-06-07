<template>
    <!--背景-->
    <div class="bgcontent" :style="{'height':bodyHeight+'px'}" @resize="bgcontentResize">
        <h1>{{title}}</h1>
        <transition name="el-zoom-in-center">
            <loginComponent></loginComponent>
        </transition>
    </div>
</template>
<script>
import loginComponent from '@/components/loginComponent'
export default {
    data() {
        return {
            title:'vue-System'
        }
    },
    methods: {
        bgcontentResize() {
            this.bodyHeight = document.documentElement.clientHeight || document.body.clientHeight;
        }
    },
    computed: {
        bodyHeight() {
            return document.documentElement.clientHeight || document.body.clientHeight;
        }
    },
    components: { loginComponent }
}
</script>
<style scoped lang="scss">
.bgcontent {
    position: relative;
    width: 100%;
    height: 100%;
    background: url(../assets/loginbg2.jpg) no-repeat center center/ cover;
    h1{
        position: absolute;
        top:100px;
        width: 100%;
        font-size: 50px;
        color: #fff;
        text-align: center;
    }
}
</style>


