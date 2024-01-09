<template>
    <div class="count">
        <h2>當前求和為:{{ sum }},放大10倍後:{{ bigSum }}</h2>
        <h3>歡迎來到:{{ school }},坐落於:{{ address }},大寫:{{ upperSchoolName }}</h3>
        <select v-model.number="n">
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
        </select>
        <button @click="add">加</button>
        <button @click="minus">減</button>
    </div>
</template>

<script setup lang="ts">
import { ref, toRefs } from 'vue';
// 引入useCounterStore
import { useCounterStore } from '@/stores/counter'
import { storeToRefs } from 'pinia'

// 使用useCounterStore，得到一個專門保存counter相關數據的store
const counterStore = useCounterStore();
// 必須用toRefs不然沒有響應式,但代價太大,他會把store裡面的所有東西都用ref包裹,包含方法..等等
// const { sum, school, address } = toRefs(counterStore)

// storeToRefs只會關注sotre中的數據,不會對方法進行ref包裹
const { sum, school, address, bigSum, upperSchoolName } = storeToRefs(counterStore)
// console.log("!!",storeToRefs(counterStore))

// 數據
let n = ref(1);//用戶選擇數字
// 方法
function add() {
    // 第一種修改方式
    // counterStore.sum += n.value;
    // counterStore.school = 'atguigu';
    // counterStore.address = 'baoji';

    // 第二種修改方式 patch(碎片)批量修改
    // counterStore.$patch({
    //     sum: 888,
    //     school: 'atguigu',
    //     address: 'baoji'
    // });

    // 第三種修改方式 actions
    counterStore.increment(n.value);
}
function minus() {
    if (counterStore.sum > 0) {

        counterStore.sum -= n.value;
    }

}



</script>

<style scoped >
.count {
    background-color: skyblue;
    box-shadow: 0 0 10px;
    border-radius: 10px;
    padding: 20px;
}

select,
button {
    margin: 0 5px;
    height: 25px;
}
</style>