<template>
    <div class="table_content">
        <h2>Azure 狀態</h2>
        <div class="control_wrap">
            <div>
                每 {{ upDataTime }} 秒自動更新
            </div>
            <div>
                <el-select v-model="upDataTime" class="m-2" placeholder="請選擇自動更新時間" size="large" style="width: 240px">
                    <el-option v-for="item in upDataTimes" :key="item.value" :label="item.label" :value="item.value" />
                </el-select>
            </div>
            <el-button type="primary" :icon="Refresh" @click="update">刷新</el-button>
            <div style="display: flex;align-items: center;gap: 5px;"> 定時器開關:
                <el-switch v-model="value2" class="ml-2"
                    style="--el-switch-on-color: #13ce66; --el-switch-off-color: #ff4949" />
            </div>



            <div class="filter_wrap">
                <span>篩選:</span>
                <el-button-group class="ml-4">
                    <el-button type="success" :icon="CircleCheck" @click="filterData('良好')">良好</el-button>
                    <el-button type="warning" :icon="Warning" @click="filterData('警告')">警告</el-button>
                    <el-button type="danger" :icon="CircleClose" @click="filterData('危急')">危急</el-button>
                    <el-button type="primary" :icon="Refresh" @click="resetData">重製</el-button>
                </el-button-group>
            </div>

        </div>
        <div>
            <el-table :data="filteredServiceStatus" style="width: 100%;height:500px" border stripe>
                <el-table-column prop="serviceName" label="服務名稱"></el-table-column>
                <el-table-column prop="status" label="狀態" align="center">
                    <template #default="{ row }">
                        <el-tag :type="getStatusTagType(row.status)">
                            {{ row.status }}
                        </el-tag>
                    </template>
                </el-table-column>
                <el-table-column prop="details" label="詳細資訊" align="center"></el-table-column>
                <el-table-column prop="updatedAt" label="最後更新時間" align="center">
                    {{ LastUpdatedTime }}
                </el-table-column>
            </el-table>
        </div>
    </div>
</template>
  
<script setup lang="ts">
import { ref, reactive, createVNode, onMounted, onUnmounted, watch, computed } from 'vue';
import { SuccessFilled, WarningFilled, CircleCloseFilled, Refresh, CircleCheck, Warning, CircleClose } from '@element-plus/icons-vue';
import axios from 'axios';

// 表格區===============


const originalServiceStatus = ref([]);// 備份原始資料
const serviceStatus = reactive({ list: [] });

const getStatusTagType = (status: string) => {
    switch (status) {
        case '良好':
            return 'success';
        case '危急':
            return 'danger';
        case '警告':
            return 'warning';
        default:
            return 'error'; // 或者你可以根據需要指定一個預設值
    }
};



// 最後更新時間
const LastUpdatedTime = ref(new Date().toLocaleString());

// 打api
async function update() {
    const randomIndex = Math.floor(Math.random() * 5) + 1;
    const url = `/public/data/status${randomIndex}.json`;
    LastUpdatedTime.value = new Date().toLocaleString()
    try {

        const response = await axios.get(url);
        serviceStatus.list = response.data;
        originalServiceStatus.value = response.data;


    } catch (error) {

    }
}

onMounted(async () => {
    update();

})
// ==================================>


// 設定計時器===============================
const value2 = ref(true)//計時器開關
let upDateTimer;
// 刷新頻率
const upDataTime = ref(5)

// 刷新頻率選單
const upDataTimes = [
    {
        value: 1,
        label: "每 1 秒鐘"
    },
    {
        value: 5,
        label: "每 5 秒鐘"
    },
    {
        value: 15,
        label: "每 15 秒鐘"
    },
    {
        value: 25,
        label: "每 25 秒鐘"
    },
    {
        value: 35,
        label: "每 35 秒鐘"
    },
    {
        value: 45,
        label: "每 45 秒鐘"
    },
    {
        value: 45000,
        label: "每 45000 秒鐘"
    },
]


const setupTimer = () => {
    upDateTimer = setInterval(() => {
        update();
    }, upDataTime.value * 1000); // 將秒轉換為毫秒
};

const clearTimer = () => {
    clearInterval(upDateTimer);
};

// 掛載時啟動計時器
onMounted(() => {
    setupTimer();
});

// 在 upDataTime 改變時重新設定計時器
watch(upDataTime, () => {
    clearTimer();
    setupTimer();
});

// 在組件被卸載時清除計時器
onUnmounted(() => {
    clearTimer();
});
// ====================================>


// 篩選器 ==========================
const filterStatus = ref('')
// 添加 computed 屬性，使用篩選後的數據
const filteredServiceStatus = computed(() => {
    return serviceStatus.list;
});

function filterData(status) {
    let result = originalServiceStatus.value.filter(item => item.status === status);
    serviceStatus.list = result;
}

function resetData() {
    // 重置为原始数据
    serviceStatus.list = originalServiceStatus.value
}





</script>

  
<style scoped lang="scss">
.table_content {
    width: 90%;
    margin: 30px auto 0;
    background-color: rgb(99, 99, 104);
    box-shadow: 2px 2px 12px #909399;
    padding: 20px;
    border-radius: 10px;

}

h2 {
    text-align: center;
    margin-bottom: 50px;
    color: #f8f3f1;

}

.control_wrap {
    margin-bottom: 20px;
    color: #f8f3f1;
    font-weight: 700;
    display: flex;
    gap: 50px;
    align-items: center;
}

.filter_wrap {
    margin-left: auto;
    display: flex;
    align-items: center;
    gap: 10px;
}
</style>