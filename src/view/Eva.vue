<template>
    <div class="eva-box">
        <canvas id="evaCanvas" class="eva-canvas"></canvas>
        <button class="change-btn" @click="changeResoure">{{gameStatus?'暂停':'开始'}}</button>
    </div>
</template>

<script>
import { Game, resource, GameObject } from '@eva/eva.js'
import { RendererSystem } from '@eva/plugin-renderer'
import { Img, ImgSystem } from '@eva/plugin-renderer-img'
import { EVA_RESOURCE } from '@/config/resource.js'
import { statsSystem } from '@/utils/statsSystem.js'
export default {
  data () {
    return {
      renderSystem: null,
      game: null,
      bg: null,
      gameStatus: true
    }
  },
  mounted () {
    this.addResource()
    this.setRenderSystem()
    this.setGame()
  },
  methods: {
    // 添加资源
    addResource () {
      resource.addResource(EVA_RESOURCE)
      resource.preload()
    },
    // // 创建渲染系统
    setRenderSystem () {
      this.renderSystem = new RendererSystem({
        canvas: document.querySelector('#evaCanvas'), // 可选，自动生成 canvas 挂在 game.canvas 上
        width: 750,
        height: 1624,
        transparent: false,
        resolution: window.devicePixelRatio / 2, // 可选, 如果是2倍图设计 可以除以2
        preventScroll: false, // 阻止页面滚动
        renderType: 0 // 0:自动判断，1: WebGL，2:Canvas
      })
    },
    // // 创建游戏对象
    setGame () {
      if (this.renderSystem) {
        this.game = new Game({
          frameRate: 60, // 可选，游戏帧率，默认60
          autoStart: true, // 可选，自动开始
          systems: [this.renderSystem]
        })
        // 显示帧率
        this.game.addSystem(statsSystem)
        this.setImgSystem()
      }
    },
    setImgSystem () {
      if (!this.game) return
      // 给游戏添加渲染图片的能力
      this.game.addSystem(new ImgSystem())

      const gameObject = new GameObject('gameObj1', {
        size: {
          width: 750,
          height: 1624
        }
      })
      this.bg = gameObject.addComponent(
        new Img({
          resource: 'image2'
        })
      )
      this.game.scene.addChild(gameObject) // 把游戏对象放入场景，这样画布上就可以显示这张图片了
    },
    changeResoure () {
      if (this.gameStatus) {
        this.gameStatus = false
        this.game.pause()
      } else {
        this.gameStatus = true
        this.game.start()
      }
    }
  }
}
</script>

<style scoped lang="scss">
.eva-box {
    width: 100vw;
    height: 100vh;
}
.change-btn {
    position: fixed;
    top: 20px;
    left: 20px;
    width: 100px;
    height: 40px;
    border: 0;
    z-index: 3;
}
.eva-canvas {
  width: 100%;
  height: auto;
}
</style>
