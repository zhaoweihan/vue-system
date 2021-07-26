import { RESOURCE_TYPE } from '@eva/eva.js'
export const EVA_RESOURCE = [ {
  name: 'image1',
  type: RESOURCE_TYPE.IMAGE,
  src: {
    image: {
      type: 'png',
      url:
          'https://gw.alicdn.com/tfs/TB1DNzoOvb2gK0jSZK9XXaEgFXa-658-1152.webp'
    }
  },
  preload: true
},
{
  name: 'image2',
  type: RESOURCE_TYPE.IMAGE,
  src: {
    image: {
      type: 'png',
      url:
          'https://gw.alicdn.com/tfs/TB15Upxqk9l0K4jSZFKXXXFjpXa-750-1624.jpg'
    }
  },
  preload: true
}
// {
//   name: 'train',
//   type: RESOURCE_TYPE.IMAGE,
//   src: {
//     image: {
//       type: 'json',
//       url: 'https://p.gsxcdn.com/916183215_f3ygljnv.json'
//     }
//   }
// }
]

export const CHOOSE_IMAGE_RESOURCE = [
  {
    name: 'backgroundImage',
    type: RESOURCE_TYPE.IMAGE,
    src: {
      image: {
        type: 'png',
        url: 'https://i.gsxcdn.com/1247544260_h1eilph5.png'
      }
    },
    preload: true
  },
  {
    name: 'stoneGate',
    type: RESOURCE_TYPE.IMAGE,
    src: {
      image: {
        type: 'png',
        url: 'https://i.gsxcdn.com/1231439667_3l67ddm5.png'
      }
    },
    preload: true
  },
  {
    name: 'bgm',
    type: RESOURCE_TYPE.AUDIO,
    src: {
      audio: {
        type: 'audio',
        url: 'https://p.gsxcdn.com/1286039018_0ae4p8yt.mp3'
      }
    },
    preload: true
  } ]
