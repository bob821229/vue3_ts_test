import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useCounterStore = defineStore('counter', {
  // actions裡面放置的是一個一個的動作方法，用於響應組件中的"動作"
  actions: {
    increment(value: number) {
      console.log('increment被調用了', value)
      if (this.sum < 10) {
        // 修改數據(this是當前的store)
        this.sum += value
      }
    }
  },
  // 真正存儲數據的地方
  state() {
    return {
      sum: 6,
      school: 'atguigu',
      address: '北京'
    }
  },
  //計算屬性
  getters: {
    bigSum: state => state.sum * 10, //箭頭語法只有一行可以省略return
    // upperSchoolName(state) {
    //   return state.school.toUpperCase()
    // },
    upperSchoolName(): string {
      return this.school.toUpperCase()
    }
  }

})
