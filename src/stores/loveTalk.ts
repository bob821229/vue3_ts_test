import { ref, reactive } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'
import { nanoid } from 'nanoid'//隨機產生id 需要透過npm安裝 'npm i nanoid'

// export const useTalkStore = defineStore('loveTalk', {
//     actions: {
//         async getATalk() {
//             try {
//                 // // 發請求
//                 // let result = await axios.get('https://api.uomg.com/api/rand.qinghua?format=json')
//                 // // 把請求回來的字串,包裝成一個對象
//                 // let obj = { id: nanoid(), title: result.data.content }
//                 // //放到數組中
//                 // // talkList.push({ id: `asd${talkList.length + 1}`, content: result.data.content }); //添加在後方
//                 // talkList.unshift(obj); //添加在前方

//                 // ====進階寫法====

//                 // 發請求,下面這行的寫法:是連續解構賦值+重命名
//                 let { data: { content: title } } = await axios.get('https://api.uomg.com/api/rand.qinghua?format=json')
//                 // 把請求回來的字串,包裝成一個對象
//                 let obj = { id: nanoid(), title }  //這裡是縮寫原本是 {id: nanoid(), title:title} 但同名所以可以省略
//                 //放到數組中
//                 // talkList.push({ id: `asd${talkList.length + 1}`, content: result.data.content }); //添加在後方
//                 this.talkList.unshift(obj); //添加在前方
//             } catch (error) {
//                 console.log('連線失敗', error);
//             }
//         }
//     },
//     state() {
//         return {
//             talkList: JSON.parse(localStorage.getItem('talkList') as string) || []
//         }
//     }

// })

export const useTalkStore = defineStore('loveTalk', () => {
    // talkList就是state
    const talkList = reactive(
        JSON.parse(localStorage.getItem('talkList') as string) || []
    )

    // getATalk函數相當於actions
    async function getATalk() {
        try {
            // // 發請求
            // let result = await axios.get('https://api.uomg.com/api/rand.qinghua?format=json')
            // // 把請求回來的字串,包裝成一個對象
            // let obj = { id: nanoid(), title: result.data.content }
            // //放到數組中
            // // talkList.push({ id: `asd${talkList.length + 1}`, content: result.data.content }); //添加在後方
            // talkList.unshift(obj); //添加在前方

            // ====進階寫法====

            // 發請求,下面這行的寫法:是連續解構賦值+重命名
            let { data: { content: title } } = await axios.get('https://api.uomg.com/api/rand.qinghua?format=json')
            // 把請求回來的字串,包裝成一個對象
            let obj = { id: nanoid(), title }  //這裡是縮寫原本是 {id: nanoid(), title:title} 但同名所以可以省略
            //放到數組中
            // talkList.push({ id: `asd${talkList.length + 1}`, content: result.data.content }); //添加在後方
            talkList.unshift(obj); //添加在前方
        } catch (error) {
            console.log('連線失敗', error);
        }
    }

    return { talkList, getATalk }
})
