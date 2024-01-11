<script setup lang="ts">
// import Preson from '../components/Preson.vue';
import { ref, reactive } from 'vue'
import Preson1 from '../components/Preson1.vue';
import Life from '../components/Life.vue';
import Life1 from '../components/Life1.vue';
import Count from '@/components/Count.vue';
import LoveTalk from '@/components/LoveTalk.vue';
import StatusTable from '@/components/StatusTable.vue';
import { type PersonInter, type Persons, } from '@/types'

let personList = reactive<Persons>([
  {
    id: '121w3e540',
    name: '张三',
    age: 60,
  },
  {
    id: '121w3e541',
    name: '李四',
    age: 18,
  },
  {
    id: '121w3e542',
    name: '王五',
    age: 25,
  },
])

let x = 9
let isShow = ref(true)
</script>

<template>
  <main>
    <StatusTable />
    <!-- <h2>我是home組件</h2> -->
    <!-- <Count /> -->
    <!-- <LoveTalk /> -->
    <!-- <Preson /> -->
    <!-- 務必搞懂 -->
    <!-- <h2 a="1+1" :b="1 + 1" c="x" :d="x" ref="qwe">測試</h2> -->
    <!-- <Preson1 a="哈哈" /> -->
    <!-- <Life v-if="isShow" /> -->
    <!-- <Life1 /> -->
  </main>
</template>
<style scoped></style>
