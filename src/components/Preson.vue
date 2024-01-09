<script lang="ts" setup>
import { ref, reactive, toRefs, computed, watch, watchEffect } from 'vue'

// 數據
let car = reactive({ brand: '奔馳', price: 100 })
let games = ref([
    { id: 'aysdytfsatr01', name: 'LOL' },
    { id: 'aysdytfsatr02', name: 'CF' },
    { id: 'aysdytfsatr03', name: 'PUBG' },
    { id: 'aysdytfsatr04', name: 'Apex' },
    { id: 'aysdytfsatr05', name: 'R6' },
])
let sum = ref(0)

let person = reactive({
    name: '勞勃',
    age: 58
})



let { name, age } = toRefs(person)
let firstName = ref('zhang')
let lastName = ref('san')
// 方法
function changePrice() {
    car.price += 10
}
function changeBrand() {
    car.brand = 'BMW'
}
function changeCar() {
    // car = { brand: 'Audi', price: 200 } //頁面不更新
    // car=reactive({ brand: 'Audi', price: 200 }) //頁面不更新
    Object.assign(car, { brand: 'Audi', price: 200 })//這寫法可以更新
}
function changeFirstGame() {
    games.value[0].name = 'DNF'
}
function changeSum() {
    sum.value += 1
}
function changeName() {
    name.value += '~'
}
function changeAge() {
    age.value += 1
}
//這麼定義的fullName是一個計算屬性，且是只讀的
// let fullName = computed(() => {
//         return firstName.value.slice(0, 1).toUpperCase() + firstName.value.slice(1) + '-' + lastName.value
// })
//這麼定義的fullName是一個計算屬性，可讀可寫
let fullName = computed({
    get() {
        return firstName.value.slice(0, 1).toUpperCase() + firstName.value.slice(1) + '-' + lastName.value
    },
    set(val) {
        // console.log(val)
        const [str1, str2] = val.split('-')
        firstName.value = str1
        lastName.value = str2
    }
})
function changeFullName() {
    fullName.value = 'li-si'
}
// 監視
const stopWatch = watch(sum, (newValue, oldValue) => {
    console.log('sum被修改了', newValue, oldValue)
    if (newValue >= 10) {
        stopWatch()
    }
})
function changePerson() {
    person1.value = { name: '瓊恩雪諾', age: 29 }

}


// 情況一
let person1 = ref({
    name: '喬佛里',
    age: 16
})
function changeName1() {
    person1.value.name += '~'
}
function changeAge1() {
    person1.value.age += 1
}
// 監視,情況一:監視[ref]定義的[對象類型]數據,監視的是對象的地址值,若想監視對象內部屬性的變化,需要手動開啟[deep]深度監視
watch(person1, (newValue, oldValue) => {
    console.log('person1被修改了', newValue, oldValue)
}, { deep: true })


//情況三:
// 數據
let person2 = reactive({
    name: '藍禮',
    age: 35
})
// 方法
function changeName2() {
    person2.name += '~'
}
function changeAge2() {
    person2.age += 1
}
function changePerson2() {
    Object.assign(person2, { name: '百花騎士', age: 25 })

}
// 監視,情況三:監視[reactive]定義的[對象類型]數據,且默認是開啟深度監視的
// 監視reactive的對象,深度監聽關不掉{deep:false}沒用
watch(person2, (newValue, oldValue) => {
    console.log('person2被修改了')
})
// 情況四:

// 數據
let person3 = reactive({
    name: '史塔克',
    age: 40,
    cars: {
        c1: '奔馳',
        c2: '保時捷'
    }
})
// 方法
function changeName3() {
    person3.name += '~'
}
function changeAge3() {
    person3.age += 1
}
function changeC1() {
    person3.cars.c1 = '奧迪'
}
function changeC2() {
    person3.cars.c2 = '寶馬'
}
function changeCar3() {
    person3.cars = { c1: '藍寶堅尼', c2: '保時捷911' }
}
// 監聽對象只能是ref,reactive,getter函數,computed,或以上組成的數組
// 監視,情況四:監視響應式對象中的某個屬性,且該屬性是基本類型的,要寫成函數式
// watch(() => person3.name, (newValue, oldValue) => {
//     console.log('person3.name被修改了', newValue, oldValue)
// })
// 監視,情況五:監視上述的多個數據
watch([() => person3.name, person3.cars], (newValue, oldValue) => {
    console.log('person3.cars被修改了', newValue, oldValue)
}, { deep: true })

// watchEffect:
// 數據
let temp = ref(0)
let height = ref(0)
// 方法
function changeTemp() {
    if (temp.value < 100) {
        temp.value += 10
    } else {
        alert('水溫不能超過100度')
    }
}
function changeHeight() {
    height.value += 10
}
// 監視--watch實現
// watch([temp, height], (value) => {
//     // console.log('temp或height被修改了', value)
//     let [newTemp, newHeight] = value
//     // 邏輯
//     if (newTemp >= 60 || newHeight >= 80) {
//         // 發請求
//         console.log('給服務器發請求')
//     }
// })

// 監視--watchEffect實現
watchEffect(() => {
    if (temp.value >= 60 || height.value >= 80) {
        console.log('給服務器發請求')
    }
})
// 創建一個title2,用於存儲 ref標記的內容
let title2 = ref()
let a = ref(0)
let b = ref(1)
let c = ref(2)
function showLog() {
    console.log(title2.value)
}

</script>

<template>
    <div class="preson">
        <h1>中國</h1>
        <h2 ref="title2">北京</h2>
        <h3>尚硅谷</h3>
        <button @click="showLog">點我輸出h2這個元素</button>
        <hr>
        <h2>需求:當水溫達到60度,或水位達到80cm,給服務器發請求</h2>
        <h2>當前水溫:{{ temp }}度</h2>
        <h2>當前水位:{{ height }}cm</h2>
        <button @click="changeTemp">水溫+10</button>
        <button @click="changeHeight">水位+10</button>
        <hr>
        <h2>姓名:{{ person3.name }}</h2>
        <h2>年齡:{{ person3.age }}</h2>
        <h2>汽車:{{ person3.cars.c1 }},{{ person3.cars.c2 }}</h2>
        <button @click="changeName3">修正名字</button>
        <button @click="changeAge3">修改年齡</button>
        <button @click="changeC1">修改第一台車</button>
        <button @click="changeC2">修改第二台車</button>
        <button @click="changeCar3">修改整個車</button>
        <hr>
        <h2>姓名:{{ person2.name }}</h2>
        <h2>年齡:{{ person2.age }}</h2>
        <button @click="changeName2">修正名字</button>
        <button @click="changeAge2">修改年齡</button>
        <button @click="changePerson2">修改整個人</button>
        <hr>
        <h2>姓名:{{ person1.name }}</h2>
        <h2>年齡:{{ person1.age }}</h2>
        <button @click="changeName1">修正名字</button>
        <button @click="changeAge1">修改年齡</button>
        <button @click="changePerson">修改整個人</button>
        <hr>
        姓: <input type="text" v-model="firstName"> <br>
        名: <input type="text" v-model="lastName"> <br>
        全名: <span>{{ fullName }}</span>
        <button @click="changeFullName">改全名</button>
        <hr>
        <h2>汽車信息: 一輛{{ car.brand }}車,價值{{ car.price }}萬</h2>
        <button @click="changePrice">修改汽車價格</button>
        <button @click="changeBrand">修改汽車品牌</button>
        <button @click="changeCar">修改汽車</button>
        <br>
        <h2>遊戲列表:</h2>
        <ul>
            <li v-for="g in games" :key="g.id">{{ g.name }}</li>
        </ul>
        <button @click="changeFirstGame">修改第一個遊戲名子</button>
        <hr>
        <h2>當前求和為:{{ sum }}</h2>
        <button @click="changeSum">sum+1</button>
        <hr>
        <h2>姓名:{{ name }}</h2>
        <h2>年齡:{{ age }}</h2>
        <button @click="changeName">修改名稱</button>
        <button @click="changeAge">修改年齡</button>
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