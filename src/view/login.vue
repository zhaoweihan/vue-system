<template>
    <!--背景-->
    <div class="bgcontent" :style="{'height':bodyHeight+'px'}" @resize="bgcontentResize">
        <h1>{{title}}</h1>
        <transition name="el-zoom-in-center">
            <loginComponent v-if="showStatus==1" v-on:changeStatus="changeStatus"></loginComponent>
        </transition>
        <transition name="el-zoom-in-center">
            <registerComponent v-if="showStatus==0" v-on:changeStatus="changeStatus"></registerComponent>
        </transition>
    
    </div>
</template>
<script>
import loginComponent from '@/components/loginComponent'
import registerComponent from '@/components/registerComponent'
export default {
    data() {
        return {
            title: 'vue-System',
            showStatus: 1
        }
    },
    methods: {
        bgcontentResize() {
            this.bodyHeight = document.documentElement.clientHeight || document.body.clientHeight;
        },
        changeStatus(data){
            console.log(data)
            this.showStatus=data;
        }
    },
    computed: {
        bodyHeight() {
            return document.documentElement.clientHeight || document.body.clientHeight;
        }
    },
    components: { loginComponent, registerComponent }
}
</script>
<style scoped lang="scss">
.bgcontent {
    position: relative;
    width: 100%;
    height: 100%;
    background: url(../assets/loginbg2.jpg) no-repeat center center/ cover;
    h1 {
        position: absolute;
        top: 100px;
        width: 100%;
        font-size: 50px;
        color: #fff;
        text-align: center;
    }
}
</style>


