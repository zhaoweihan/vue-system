<template>
   <div class="eva-box">
        <canvas id="chooseImageCanvas" class="choose-image-canvas"></canvas>
    </div>
</template>

<script>
import { transformVal } from '@/utils'
import { Game, resource, GameObject } from '@eva/eva.js'
import { RendererSystem } from '@eva/plugin-renderer'
import { Img, ImgSystem } from '@eva/plugin-renderer-img'
// import { Sound, SoundSystem } from '@eva/plugin-sound'
import { CHOOSE_IMAGE_RESOURCE } from '@/config/resource.js'
export default {
  data () {
    return {
      game: null,
      bg: null
    }
  },
  mounted () {
    resource.addResource(CHOOSE_IMAGE_RESOURCE)
    resource.preload()
    this.initGame()
    this.setBackgroundImage()
    // this.initBgm()
  },
  methods: {
    initGame () {
      this.game = new Game({
        systems: [
          new RendererSystem({
            canvas: document.querySelector('#chooseImageCanvas'),
            width: document.body.clientWidth,
            height: document.body.clientHeight,
            resolution: window.devicePixelRatio / 2
          }),
          //   new SoundSystem(),
          new ImgSystem()
        ],
        autoStart: true,
        frameRate: 60
      })
    },
    setBackgroundImage () {
      const clientHeight = document.body.clientHeight
      const clientWidth = clientHeight / 750 * 1736
      const x = -(clientWidth - document.body.clientWidth) / 2
      const gameObject = new GameObject('backgroundImage', {
        size: { width: clientWidth, height: clientHeight },
        position: { x, y: 0 } // 位移
      })
      gameObject.addComponent(
        new Img({ resource: 'backgroundImage' })
      )

      this.bg = gameObject
      this.game.scene.addChild(gameObject) // 把游戏对象放入场景，这样画布上就可以显示这张图片了
      // 添加石头门
    //   this.setStoneGate()
    },
    setStoneGate () {
      const size = { width: transformVal(168), height: transformVal(194) }
      const anchor = { x: 0.5, y: 0 }
      const stoneGateGameObjLeft = new GameObject('stoneGate', {
        size,
        anchor,
        position: { x: -transformVal(168 + 41.5), y: transformVal(112) }
      })
      const stoneGateGameObjRight = new GameObject('stoneGate', {
        size,
        anchor,
        position: { x: transformVal(41.5), y: transformVal(112) }
      })
      stoneGateGameObjLeft.addComponent(new Img({ resource: 'stoneGate' }))
      stoneGateGameObjRight.addComponent(new Img({ resource: 'stoneGate' }))
      this.bg.addChild(stoneGateGameObjLeft)
      this.bg.addChild(stoneGateGameObjRight)
    }
    // initBgm () {
    //   const bgSoundObj = new GameObject('sound')
    //   const soundInstance = new Sound({ resource: 'bgm', loop: true, autoplay: true, volume: 0.5 })
    //   const bgSound = bgSoundObj.addComponent(soundInstance)
    //   bgSound.play()
    // }
  }
}
</script>

<style scoped lang="scss">
.eva-box {
    width: 100vw;
    height: 100vh;
}
.choose-image-canvas {
  width: 100%;
  height: auto;
}
</style>
