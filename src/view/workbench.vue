<template>
    <div>
        <header class="header" :class="{'close':menuCompressionStatus}">
            <div class="header-left">VUE-SYSTEM</div>
            <div class="header-right">
                <!--左侧功能区域-->
                <div class="leftAreaList rightAreaList">
                    <li @click="compression()">
                        <a href="javascript:;">
                            <i class="fa fa-dedent"></i>
                        </a>
                    </li>
                    <li>
                        <a href="javascript:;">
                            <i class="fa fa-user-o"></i>
                        </a>
                    </li>
                </div>
                <!--头像和名字-->
                <div class="headPicBox">
                    <span @click="openMask()">{{username}}
                        <i class="el-icon-caret-bottom"></i>
                    </span>
                    <div class="imgbox" @click="openMask()">
                        <img :src="headpicUrl" alt="头像">
                    </div>
                    <userinfmask :openStatus="infoMaskOpenStatus"></userinfmask>
                </div>
                <!--右侧功能区-->
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
        <div class="container" :class="{'close':menuCompressionStatus}">
            <div class="navMenu">
                <el-menu theme="dark" :unique-opened="true" :router="true" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose">
                    <el-menu-item-group title="常用功能">
                        <el-submenu index="1">
                            <template slot="title">
                                <i class="el-icon-message"></i>住户</template>
                            <el-menu-item index="1-1">表格</el-menu-item>
                        </el-submenu>
                        <el-menu-item index="2">
                            <i class="el-icon-date"></i>日历</el-menu-item>
                        <el-menu-item index="3">
                            <i class="el-icon-menu"></i>消息</el-menu-item>
                    </el-menu-item-group>
                    <div class="hr"></div>
                    <el-menu-item-group title="日常工作">
                        <el-submenu index="3">
                            <template slot="title">
                                <i class="el-icon-star-on"></i>评估管理</template>
                            <el-menu-item index="/dailywork/checkinManagement" >入住评估</el-menu-item>
                        </el-submenu>
                        <el-submenu index="4">
                            <template slot="title">
                                <i class="el-icon-edit"></i>客服管理</template>
                            <el-menu-item index="4-1">选项1</el-menu-item>
                        </el-submenu>
                        <el-submenu index="5">
                            <template slot="title">
                                <i class="el-icon-menu"></i>照护管理</template>
                            <el-menu-item index="5-1">选项1</el-menu-item>
                        </el-submenu>
                        <el-submenu index="6">
                            <template slot="title">
                                <i class="el-icon-message"></i>财务管理</template>
                            <el-menu-item index="6-1">选项1</el-menu-item>
                        </el-submenu>
                        <el-submenu index="7">
                            <template slot="title">
                                <i class="el-icon-setting"></i>系统管理</template>
                            <el-menu-item index="7-1">选项1</el-menu-item>
                            <el-menu-item index="7-2">选项1</el-menu-item>
                        </el-submenu>
                        <el-submenu index="8">
                            <template slot="title">
                                <i class="el-icon-time"></i>平台管理</template>
                            <el-menu-item index="8-1">选项1</el-menu-item>
                            <el-menu-item index="8-2">选项1</el-menu-item>
                        </el-submenu>
                    </el-menu-item-group>
                    <div class="hr"></div>
                </el-menu>
            </div>
            <div class="content">
                <div class="breadcrumb">
                    <el-breadcrumb separator="/">
                        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                        <el-breadcrumb-item>活动管理</el-breadcrumb-item>
                        <el-breadcrumb-item>活动列表</el-breadcrumb-item>
                        <el-breadcrumb-item>活动详情</el-breadcrumb-item>
                    </el-breadcrumb>
                </div>
                <router-view></router-view>
            </div>
        </div>
    </div>
</template>
<script>
import headpic from '@/assets/tz.jpg'
import userinfmask from '@/components/userinfoMask'
export default {
    data() {
        return {
            username: '黑色摩天轮',
            headpicUrl: headpic,//用户头像
            isFullscreen: false,//全屏状态
            infoMaskOpenStatus: false,//用户信息弹层状态
            menuCompressionStatus: false//菜单收缩状态
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
        openMask() {
            this.infoMaskOpenStatus ? this.infoMaskOpenStatus = false : this.infoMaskOpenStatus = true;
        },
        compression() {
            this.menuCompressionStatus ? this.menuCompressionStatus = false : this.menuCompressionStatus = true;
        },
        handleOpen(key, keyPath) {
            // console.log(key, keyPath);
        },
        handleClose(key, keyPath) {
            // console.log(key, keyPath);
        }
    },
    components: { userinfmask }
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
    z-index: 5;
    @include transform(translate(0));
    &.close {
        .header-left {
            width: 0;
            @include transform(translate(-$header-width));
        }
        .header-right {
            width: 100%;
            margin-left: 0;
        }
    }
    .header-left {
        float: left;
        height: 100%;
        color: #fff;
        text-align: center;
        line-height: $header-height;
        background: $Danger;
        width: $header-width;
        @include transition(all 0.3s);
    }
    .header-right {
        width: calc(100% - #{$header-width});
        margin-left: $header-width;
        height: 100%;
        box-shadow: 0 2px 2px rgba(0, 0, 0, 0.05), 0 1px 0 rgba(0, 0, 0, 0.05); // 头像框
        @include transition(all 0.3s);
        .headPicBox {
            position: relative;
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
        .leftAreaList.rightAreaList {
            float: left;
            margin-left: 10px;
        }
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
} // 导航菜单和内容区域
.container {
    &.close {
        .navMenu {
            width: 0;
            @include transform(translate(-$header-width));
        }
        .content {
            width: 100%;
            left: 0;
        }
    }
    .navMenu {
        position: fixed;
        top: $header-height;
        left: 0;
        width: $header-width;
        height: calc(100% - #{$header-height});
        background: $LightBlack;
        overflow-x: hidden;
        overflow-y: auto;
        @include transition(all 0.3s);
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
        @include transition(all 0.3s);
        width: calc(100% - #{$header-width});
        height: calc(100% - #{$header-height});
        overflow-x: hidden;
        overflow-y: auto;
        z-index: 2;
        .breadcrumb{
            width: 100%;
            padding: 20px;
            background: #F6F8F8;
            border-bottom:1px solid #DEE5E7; 
        }
    }
}
</style>


