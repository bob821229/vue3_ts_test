<script setup lang="ts">
import { type PersonInter, type Persons, } from '@/types'
// import { defineProps, withDefaults } from 'vue'

// let person: PersonInter = {
//     id: '121w3e545q',
//     name: '张三',
//     age: 18,
// }

// let personList: Persons = [
//     {
//         id: '121w3e540',
//         name: '张三',
//         age: 60,
//     },
//     {
//         id: '121w3e541',
//         name: '李四',
//         age: 18,
//     },
//     {
//         id: '121w3e542',
//         name: '王五',
//         age: 25,
//     },
// ]
// 只接收list
// defineProps(['list'])

// 接收的同時,將props保存起來
// let props = defineProps(['list'])

// 接收list+限制類型
// defineProps<{ list: Persons, a: string }>()

// 接收list+限制類型+限制必要性+指定默認值

// definexxxx稱為宏函數,在vue3中可以不必引入 ex:defineProps,withDefaults

withDefaults(defineProps<{ list?: Persons, a: string }>(), {
    list: () => [{ id: '121w3e543', name: '老六', age: 35 }]
})



// defineProps(['a'])

</script>

<template>
    <div class="preson">
        <h2>{{ a }}</h2>
        <ul>
            <li v-for="item in list" :key="item.id">{{ item.name }}--{{ item.age }}</li>
        </ul>

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