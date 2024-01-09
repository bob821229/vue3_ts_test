<script setup lang="ts">
import { onMounted, onBeforeMount, ref, onBeforeUpdate, onUpdated, onBeforeUnmount, onUnmounted } from 'vue';
// 數據
let sum = ref(0)
// 方法
function add() {
    sum.value += 1
}
// 創建 vue2: beforeCreate created
console.log('創建');
// 掛載
onBeforeMount(() => {
    console.log('掛載前');
})
// 掛載完畢
onMounted(() => {
    console.log('掛載完畢');
})
//更新前
onBeforeUpdate(() => {
    console.log('更新前');
})
// 更新完畢
onUpdated(() => {
    console.log('更新完畢');
})
// 卸載前
onBeforeUnmount(() => {
    console.log('卸載前');
})
// 卸載完畢
onUnmounted(() => {
    console.log('卸載完畢');
})

</script>

<template>
    <div class="preson">
        <h2>
            當前求和為:{{ sum }}
        </h2>
        <button @click="add">點我sum+1</button>
    </div>
</template>

<style scoped>
.preson {
    background-color: skyblue;
    box-shadow: 0 0 10px;
    border-radius: 10px;
    padding: 20px;
}

button {
    margin: 0 5px;
}

li {
    font-size: 20px;
}
</style>