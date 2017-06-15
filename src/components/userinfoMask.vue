<template>
    <div class="useinfoMask" :class="{'open':openStatus}">
        <div class="info">
            <router-link to="/usercenter/userinfo">
                <p>姓名：{{realname}}</p>
                <p>性别：{{gender}}</p>
            </router-link>
        </div>
        <ul class="useinfoMask-list infolist">
            <li>
                <a href="javascript:;">设置
                    <el-badge :value="12" class="item"></el-badge>
                </a>
            </li>
            <li>
                <a href="javascript:;">帮助</a>
            </li>
            <li>
                <a href="javascript:;">关于
                    <el-badge value="new" class="item"></el-badge>
                </a>
            </li>
        </ul>
        <ul class="useinfoMask-list logout">
            <li @click="signOut()">
                <a href="javascript:;">退出</a>
            </li>
        </ul>
    </div>
</template>
<script>
import store from '@/store'
export default {
    data() {
        return {
            msg: '用户信息弹层',
        }
    },
    methods: {
        signOut() {
            this.$confirm('确定退出系统', '退出', {
                type: "warning"
            }).then(() => {
                localStorage.removeItem("mobile");
                this.$router.push('/login');
            }).catch(() => { });
        }
    },
    computed:{
        //TODO:
        realname(){
            return store.state.nickname;
        },
        gender(){
            return store.state.nickname;
        }

    },
    props: ['openStatus']
}
</script>
<style scoped lang="scss">
@import '../sass/common';
.useinfoMask {
    $lightGaryBlue: #EDF1F2;
    $maskwidth: 200px;
    position: absolute;
    right: -$maskwidth;
    top: 50px;
    width: $maskwidth;
    border: 1px solid #ccc;
    z-index: 10;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
    @include transition(all .3s);
    &.open {
        right: 0;
    }
    .info {
        background: $lightGaryBlue;
        padding: 10px;
        border-bottom: 1px solid #DEE5E7;
    }
    .useinfoMask-list {
        background: #fff;
        width: 100%;
        padding: 10px 0;
        &:first-of-type {
            border-bottom: 1px solid #ccc;
        }
        li {
            $li-height: 30px;
            height: $li-height;
            padding: 0 15px;
            line-height: $li-height;
            &:hover {
                background: $lightGaryBlue;
            }
            a {
                display: block;
                height: 100%;
                width: 100%;
                .el-badge {
                    float: right;
                    @include flex;
                    align-items: center;
                    height: 100%;
                    box-sizing: content-box;
                }
            }
        }
    }
}
</style>


