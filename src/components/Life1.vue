<script setup lang="ts">
import useSum from '../hooks/useSum';
import useDog from '../hooks/useDog';

const { sum, add, bigSum } = useSum();
const { dogList, getDog } = useDog();
</script>

<template>
    <div class="preson">
        <h2>
            當前求和為:{{ sum }},放大10倍後:{{ bigSum }}
        </h2>
        <button @click="add">點我sum+1</button>
        <hr>
        <img v-for="(dog, index) in dogList" :src="dog" alt="" :key="index">
    </div>
    <button @click="getDog">再來一隻小狗</button>
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

img {
    height: 100px;
    margin-right: 10px;
}
</style>