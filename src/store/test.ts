import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

// 使用组合式api
const useMainStore = defineStore('main', () => {
  // state
  const counter = ref(0)
  // getters
  const doubleCounter = computed(() => {
    return counter.value * 2
  })
  // action
  function changeCounterAction(newCounter: number) {
    counter.value = newCounter
  }
  return { counter, doubleCounter, changeCounterAction }
})

// 使用options api
// const useMainStore = defineStore('main', {
//   state: () => ({
//     counter: 0
//   }),
//   // 类似计算属性
//   getters: {
//     doubleCounter(state) {
//       return state.counter * 2
//     }
//   },
//   // 同步和异步
//   actions: {
//     changeCounterAction(newValue: number) {
//       this.counter = newValue
//     }
//   }
// })

export default useMainStore
