<template>
    <div>
        <header class="header" :class="{'close':menuCompressionStatus}">
            <div class="header-left">VUE-SYSTEM</div>
            <div class="header-right">
                <!--左侧功能区域-->
                <div class="leftAreaList rightAreaList">
                    <ul>
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
                    </ul>
                    <el-input v-model="search" placeholder="请输入搜索内容" type="serach" size="small" icon="search"></el-input>
                </div>
                <!--头像和名字-->
                <div class="headPicBox">
                    <span @click="openMask()">{{nickname}}
                        <i class="el-icon-caret-bottom"></i>
                    </span>
                    <div class="imgbox" @click="openMask()">
                        <img :src="headPic" alt="头像">
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
                            <el-menu-item index="/dailywork/checkinManagement">入住评估</el-menu-item>
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
                        <el-submenu index="9">
                            <template slot="title">
                                <i class="el-icon-time"></i>商城</template>
                            <el-menu-item index="/">购物车</el-menu-item>
                            <el-menu-item index="/goodsDetail">商品详情</el-menu-item>
                        </el-submenu>
                    </el-menu-item-group>
                    <div class="hr"></div>
                </el-menu>
            </div>
            <div class="content" @click.stop="hideMask()">
                <div class="breadcrumb" v-if="breadCrumbs.length">
                    <el-breadcrumb separator="/">
                        <el-breadcrumb-item :to="{ path: bc.url }" v-for="(bc,$index) in breadCrumbs" :key="$index">{{bc.name}}</el-breadcrumb-item>
                    </el-breadcrumb>
                </div>
                <router-view></router-view>
            </div>
        </div>
    </div>
</template>
<script>
import { servers } from '@/service/api'
import userinfmask from '@/components/userinfoMask'
import store from '@/store'
import defaultHead from '@/assets/defaultHead.svg'
export default {
  data () {
    return {
      isFullscreen: false, // 全屏状态
      infoMaskOpenStatus: false, // 用户信息弹层状态
      menuCompressionStatus: false, // 菜单收缩状态
      search: ''
    }
  },
  methods: {
    fullscreen () {
      if (!this.isFullscreen) {
        this.isFullscreen = true
        const docElm = document.documentElement
        if (docElm.requestFullscreen) { // W3C
          docElm.requestFullscreen()
        } else if (docElm.mozRequestFullScreen) { // FireFox
          docElm.mozRequestFullScreen()
        } else if (docElm.webkitRequestFullScreen) { // Chrome等
          docElm.webkitRequestFullScreen()
        } else if (window.elem.msRequestFullscreen) { // IE11
          window.elem.msRequestFullscreen()
        }
      } else {
        this.isFullscreen = false
        if (document.exitFullscreen) {
          document.exitFullscreen()
        } else if (document.mozCancelFullScreen) {
          document.mozCancelFullScreen()
        } else if (document.webkitCancelFullScreen) {
          document.webkitCancelFullScreen()
        } else if (document.msExitFullscreen) {
          document.msExitFullscreen()
        }
      }
    },
    /**
         * 获取登录用户信息
         */
    getUserInfo () {
      servers.post('/getUserInfo', { id: localStorage.getItem('id') }, (result) => {
        if (!result.nickname) {
          result.nickname = localStorage.getItem('mobile')
        }
        if (!result.headPic) {
          result.headPic = defaultHead
        }
        store.commit('setNickName', result.nickname)
        store.commit('setHeadPic', result.headPic)
        store.commit('setRealName', result.realname)
        store.commit('setGender', result.gender)
      })
    },
    // 切换遮罩层
    openMask () {
      this.infoMaskOpenStatus ? this.infoMaskOpenStatus = false : this.infoMaskOpenStatus = true
    },
    // 关闭遮罩层
    hideMask () {
      this.infoMaskOpenStatus = false
    },
    // 隐藏左侧导航菜单
    compression () {
      this.menuCompressionStatus ? this.menuCompressionStatus = false : this.menuCompressionStatus = true
    },
    handleOpen (key, keyPath) {
      // console.log(key, keyPath);
    },
    handleClose (key, keyPath) {
      // console.log(key, keyPath);
    }
  },
  computed: {
    breadCrumbs () {
      // store.commit('increment', {
      //     amount: 10
      // })
      return store.state.breadCrumbs
    },
    nickname () {
      return store.state.nickname
    },
    headPic () {
      return store.state.headPic || defaultHead
    }
  },
  created () {
    const self = this
    if (!localStorage.getItem('mobile')) {
      this.$message.error('会话过期，登录失效，请重新登录！')
      this.$message({
        message: '会话过期，登录失效，请重新登录！',
        type: 'error',
        duration: 1000,
        onClose () {
          self.$router.push('/login')
        }
      })
    } else {
      // 监听 全屏事件
      document.addEventListener('fullscreenchange', function () {
        self.isFullscreen = document.fullscreen
      }, false)
      document.addEventListener('webkitfullscreenchange', function () {
        self.isFullscreen = document.webkitIsFullScreen
      }, false)
      document.addEventListener('mozfullscreenchange', function () {
        self.isFullscreen = document.mozFullScreen
      }, false)
      document.addEventListener('msfullscreenchange', function () {
        self.isFullscreen = document.msFullscreenElement
      }, false)
      this.getUserInfo()
    }
  },
  components: { userinfmask }
}
</script>
<style scoped lang="scss">
@import '../sass/common';
@import '../sass/workbench';
</style>
