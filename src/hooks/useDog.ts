import { reactive, onMounted } from 'vue';
import axios from 'axios';

// 默認暴露
// 如果要分別暴露，可以使用 export 但函式要有名稱
export default function () {
    // 數據
    let dogList = reactive([
        'https://images.dog.ceo/breeds/pembroke/n02113023_4373.jpg'
    ])
    // 方法

    async function getDog() {
        try {
            let result = await axios.get('https://dog.ceo/api/breeds/image/random');
            console.log(result.data);
            dogList.push(result.data.message)
        } catch (err) {
            alert(err)
        }
    }

    // 鉤子
    onMounted(() => {
        getDog()
    })
    // 向外部提供東西
    return { dogList, getDog }
}
