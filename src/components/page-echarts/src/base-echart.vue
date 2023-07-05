<template>
  <div class="base-echart">
    <div class="echart" ref="echartRef"></div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, onUnmounted, watch } from 'vue'
import type { EChartsOption } from 'echarts'
import useEcharts from '../hooks/useEcharts'
import * as echarts from 'echarts'
import ChinaJSON from '../data/china.json'

echarts.registerMap('china', ChinaJSON as any)

interface IProps {
  option: EChartsOption
}

const props = defineProps<IProps>()

const echartRef = ref<HTMLElement>()
let myChart: any = null

// 监听option变化, 重新执行
watch(
  () => props.option,
  (newvalue) => {
    setupEchart(newvalue)
  }
)

onMounted(() => {
  setupEchart(props.option) // 第一次进行setOption
})

function setupEchart(options: any) {
  if (!myChart) {
    // 1.初始化echarts实例
    myChart = useEcharts(echartRef.value)
  }
  // 2.获得配置
  const option = options

  // 3.挂载配置
  myChart.setOption(option)

  // 监听大小改变
  window.addEventListener('resize', func)
}
function func() {
  myChart.resizeEchart()
}
onUnmounted(() => {
  window.removeEventListener('resize', func)
})
</script>

<style lang="less" scoped>
.echart {
  height: 300px;
}
</style>
