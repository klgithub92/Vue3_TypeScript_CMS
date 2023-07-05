import * as echarts from 'echarts'
import { onUnmounted } from 'vue'

export default function useEcharts(el: any) {
  const echartInstance = echarts.init(el, 'light', { renderer: 'canvas' })

  onUnmounted(() => {
    echartInstance.dispose() // 销毁实例
  })

  // 为了方便 该 hooks 的使用
  function setOption(option: any) {
    echartInstance.setOption(option)
  }

  function resizeEchart() {
    echartInstance.resize()
  }

  return {
    echartInstance,
    setOption,
    resizeEchart
  }
}
