<template>
    <div class="talk">
        <button @click="getLoveTalk">獲取一句土味情話</button>
        <ul>
            <li v-for="item in talkList" :key="item.id">{{ item.title }}</li>
        </ul>
    </div>
</template>

<script setup lang="ts">
import { useTalkStore } from '@/stores/loveTalk'
import { storeToRefs } from 'pinia';

const talkStore = useTalkStore()
// 解構後，template中可以直接使用talkList
const { talkList } = storeToRefs(talkStore)


// 方法
function getLoveTalk() {
    talkStore.getATalk()
}


</script>

<style scoped >
.talk {
    background-color: orange;
    box-shadow: 0 0 10px;
    border-radius: 10px;
    padding: 20px;
    margin-top: 20px;
}
</style>