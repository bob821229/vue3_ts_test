import { ref, computed, onMounted } from 'vue';

export default function () {
    // 數據
    let sum = ref(0)
    let bigSum = computed(() => {
        return sum.value * 10
    })
    // 方法
    function add() {
        sum.value += 1
    }

    // 鉤子
    onMounted(() => {
        add()
    })
    // 給外部提供東西
    return { sum, add, bigSum }
}



