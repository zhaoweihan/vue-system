import { StatsSystem } from '@eva/plugin-stats'

export const statsSystem = new StatsSystem({
  show: true, // 这里设置是否显示 fps 面板
  style: {
    x: 80, // 这里的数值全部都是屏幕宽度的百分比 单位vw
    y: 2,
    width: 20,
    height: 12
  }
})
