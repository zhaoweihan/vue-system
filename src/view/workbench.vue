<template>
    <div>
        <header class="header">
            <div class="header-left">VUE-SYSTEM</div>
            <div class="header-right">
                <div class="headPicBox">
                    <span>{{username}}
                        <i class="el-icon-caret-bottom"></i>
                    </span>
                    <div class="imgbox">
                        <img :src="headpicUrl" alt="头像">
                    </div>
                </div>
                <ul class="rightAreaList">
                    <li>
                        <a href="javascript:;">
                            <i class="fa fa-cog fa-spin"></i>
                        </a>
                    </li>
                    <li @click="fullscreen()">
                        <a href="javascript:;">
                            <i class="fa" :class="{'fa-expand':!isFullscreen,'fa-compress':isFullscreen}"></i>
                        </a>
                    </li>
                    <li>
                        <a href="javascript:;">
                            <i class="fa fa-bell-o">
                                <el-badge :is-dot="true"></el-badge>
                            </i>
                        </a>
                    </li>
                </ul>
            </div>
        </header>
        <div class="container">
            <div class="navMenu">
                <el-menu theme="dark" :unique-opened="true" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose">
                    <el-menu-item-group title="常用功能">
                        <el-submenu index="1">
                            <template slot="title">
                                <i class="el-icon-message"></i>住户</template>
                            <el-menu-item index="1-1">表格</el-menu-item>
                        </el-submenu>
                        <el-menu-item index="2">
                            <i class="el-icon-menu"></i>日历</el-menu-item>
                        <el-menu-item index="3">
                            <i class="el-icon-menu"></i>消息</el-menu-item>
                    </el-menu-item-group>
                    <div class="hr"></div>
                    <el-menu-item-group title="日常工作">
                        <el-submenu index="3">
                            <template slot="title">
                                <i class="el-icon-star-on"></i>评估管理</template>
                            <el-menu-item index="3-1">选项1</el-menu-item>
                        </el-submenu>
                        <el-submenu index="4">
                            <template slot="title">
                                <i class="el-icon-edit"></i>客服管理</template>
                            <el-menu-item index="3-1">选项1</el-menu-item>
                        </el-submenu>
                        <el-submenu index="5">
                            <template slot="title">
                                <i class="el-icon-menu"></i>照护管理</template>
                            <el-menu-item index="3-1">选项1</el-menu-item>
                        </el-submenu>
                        <el-submenu index="6">
                            <template slot="title">
                                <i class="el-icon-message"></i>财务管理</template>
                            <el-menu-item index="3-1">选项1</el-menu-item>
                        </el-submenu>
                        <el-submenu index="7">
                            <template slot="title">
                                <i class="el-icon-setting"></i>系统管理</template>
                            <el-menu-item index="3-1">选项1</el-menu-item>
                            <el-menu-item index="3-1">选项1</el-menu-item>
                        </el-submenu>
                        <el-submenu index="8">
                            <template slot="title">
                                <i class="el-icon-time"></i>平台管理</template>
                            <el-menu-item index="3-1">选项1</el-menu-item>
                            <el-menu-item index="3-1">选项1</el-menu-item>
                        </el-submenu>
                    </el-menu-item-group>
                    <div class="hr"></div>
                </el-menu>
            </div>
            <div class="content">
                <ul>
                    <li v-for="num in 10">{{num}}</li>
                </ul>
                <!--<router-view></router-view>-->
            </div>
        </div>
    </div>
</template>
<script>
import headpic from '../assets/tz.jpg'
export default {
    data() {
        return {
            username: '黑色摩天轮',
            headpicUrl: headpic,
            isFullscreen: false
        }
    },
    methods: {
        fullscreen() {
            if (!this.isFullscreen) {
                this.isFullscreen = true;
                const docElm = document.documentElement;
                if (docElm.requestFullscreen) { //W3C  
                    docElm.requestFullscreen();
                } else if (docElm.mozRequestFullScreen) {//FireFox  
                    docElm.mozRequestFullScreen();
                } else if (docElm.webkitRequestFullScreen) {//Chrome等  
                    docElm.webkitRequestFullScreen();
                } else if (elem.msRequestFullscreen) { //IE11
                    elem.msRequestFullscreen();
                }
            } else {
                this.isFullscreen = false;
                if (document.exitFullscreen) {
                    document.exitFullscreen();
                } else if (document.mozCancelFullScreen) {
                    document.mozCancelFullScreen();
                } else if (document.webkitCancelFullScreen) {
                    document.webkitCancelFullScreen();
                } else if (document.msExitFullscreen) {
                    document.msExitFullscreen();
                }
            }
        },
        handleOpen(key, keyPath) {
            // console.log(key, keyPath);
        },
        handleClose(key, keyPath) {
            // console.log(key, keyPath);
        }

    }
}
</script>
<style scoped lang="scss">
@import '../sass/common';
// 顶部区域header
$header-height: 50px;
$header-width:200px;
@include scrollBar(#475669, $Black);
.header {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: $header-height;
    .header-left {
        float: left;
        height: 100%;
        color: #fff;
        text-align: center;
        line-height: $header-height;
        background: $Danger;
        width: $header-width;
    }
    .header-right {
        width: calc(100% - #{$header-width});
        margin-left: $header-width;
        height: 100%;
        box-shadow: 0 2px 2px rgba(0, 0, 0, 0.05), 0 1px 0 rgba(0, 0, 0, 0.05); // 头像框
        .headPicBox {
            float: right;
            height: 100%;
            padding: 0 15px;
            cursor: pointer;
            &:hover {
                background: $DarkWhite;
            }
            font-size: $fontColor;
            span {
                display: inline-block;
                height: 100%;
                line-height: $header-height;
                i {
                    font-size: 12px;
                    margin: 0 5px 0 0;
                }
            }
            .imgbox {
                display: inline-block;
                width: 40px;
                height: 40px;
                border-radius: 50%;
                overflow: hidden;
                vertical-align: middle;
            }
        } // 三个功能按钮
        .rightAreaList {
            float: right;
            height: 100%;
            li {
                width: 50px;
                height: 100%;
                display: inline-block;
                &:hover {
                    background: $DarkWhite;
                }
                a {
                    display: block;
                    width: 100%;
                    height: 100%;
                    text-align: center;
                    font-size: 14px;
                    line-height: $header-height;
                    i {
                        font-size: 16px;
                        color: $Black;
                    }
                }
            }
        }
    }
}

// 导航菜单和内容区域
.container {
    .navMenu {
        position: fixed;
        top: $header-height;
        left: 0;
        width: $header-width;
        height: calc(100% - #{$header-height});
        background: $LightBlack;
        overflow-x: hidden;
        overflow-y: auto;

        .hr {
            width: 100%;
            height: 1px;
            background: $Black;
        }
    }
    .content {
        position: fixed;
        top: $header-height;
        left: $header-width;
        width: calc(100% - #{$header-width});
        height: calc(100% - #{$header-height});
        overflow-x: hidden;
        overflow-y: auto;
    }
}
</style>


