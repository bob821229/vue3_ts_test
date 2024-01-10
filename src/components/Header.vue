<template>
    <!-- 導覽列 -->
    <el-menu :default-active="activeIndex" class="el-menu-demo header " mode="horizontal" @select="handleSelect"
        router="true" text-color="#39a771" background-color="#f3f5f7">
        <el-sub-menu :index="nav.path" v-for="(nav, index) in navList" :key="index" class="menu">
            <template #title>
                {{ nav.name }}
            </template>
            <el-sub-menu :index="child.path" v-for="(child, chIndex) in nav.children" :key="chIndex">
                <template #title>{{ child.name }}</template>
                <el-menu-item :index="grs.path" v-for="(grs, grsIndex) in child.grandson" :key="grsIndex">{{ grs.name
                }}</el-menu-item>
            </el-sub-menu>
        </el-sub-menu>
    </el-menu>

    <!-- 表格 -->
    <el-table :data="tableData" :default-sort="{ prop: 'date', order: 'descending' }" style="width: 100%" height="500px"
        border="true" stripe="true" empty-text class="table">
        <el-table-column prop="Rank" label="累積雨量枯旱排名" sortable width="180" />
        <el-table-column prop="EndDateStr" label="年度" sortable width="180" />
        <el-table-column prop="value" label="累積雨量(mm)" sortable />
        <el-table-column prop="StopIrrigationYear" label="停灌年度" />
        <el-table-column prop="StopIrrigationArea" label="停灌區域" />
    </el-table>
</template>

<script setup lang="ts">

import { reactive, ref, computed } from 'vue'


// 導覽列========

// 數據
const navList = reactive([
    {
        name: '降雨情勢',
        path: '/降雨情勢',
        children: [
            {
                name: '即時雨量',
                path: '/即時雨量',
                grandson: [
                    { name: '日累積雨量', path: '/日累積雨量' },
                    { name: '降雨主體圖', path: '/降雨主體圖' }
                ]
            },
            {
                name: '歷史雨量',
                path: '/',
                grandson: [
                    { name: '有效雨量分析', path: '/有效雨量分析' }
                ]
            },
            {
                name: '預測雨量',
                path: '/預測雨量',
                grandson: [
                    { name: '未來兩周累積雨量估計', path: '/未來兩周累積雨量估計' }, { name: '季長期天氣展望', path: '/季長期天氣展望' }
                ]
            },
            {
                name: '乾旱檢測',
                path: '/乾旱檢測',
                grandson: [
                    { name: '累積雨量枯旱排名', path: '/累積雨量枯旱排名' },
                    { name: '超越機率累積雨量', path: '/超越機率累積雨量' },
                    { name: '區域乾旱檢測', path: '/區域乾旱檢測' }
                ]
            },
        ]
    },
    {
        name: '水源情勢',
        path: '/水源情勢',
        children: [
            {
                name: '水庫水情',
                path: '/水庫水情',
                grandson: [
                    { name: '即時水庫水情', path: '/即時水庫水情' },
                    { name: '蓄水量歷線圖', path: '/蓄水量歷線圖' },
                    { name: '每日豐枯水情', path: '/每日豐枯水情' },
                    { name: '蓄水量枯旱排名', path: '/蓄水量枯旱排名' },
                    { name: '入庫水量枯旱排名', path: '/入庫水量枯旱排名' }
                ]
            },
            {
                name: '埤塘水情',
                path: '/埤塘水情',
                grandson: [
                ]
            }
        ]
    },
    {
        name: '耕作情勢',
        path: '/耕作情勢',
        children: [
            {
                name: '耕作分布',
                path: '/耕作分布',
                grandson: [
                    { name: '作物分布情勢', path: '/作物分布情勢' },
                ]
            },
            {
                name: '灌溉計畫',
                path: '/灌溉計畫',
                grandson: [
                    { name: '各旬計畫用水量', path: '/各旬計畫用水量' },
                    { name: '水稻灌溉水量計畫', path: '/水稻灌溉水量計畫' }
                ]
            },
            {
                name: '灌溉實施',
                path: '/灌溉實施',
                grandson: [
                    { name: '灌溉進度', path: '/灌溉進度' },
                    { name: '田間需水量推估', path: '/田間需水量推估' }
                ]
            }
        ]
    },
    {
        name: '供灌決策',
        path: '/供灌決策',
        children: [
            {
                name: '供灌情境方案模擬_曾文',
                path: '/供灌情境方案模擬_曾文',
                grandson: false
            },
            {
                name: '供灌情境方案模擬_石門',
                path: '/供灌情境方案模擬_石門',
                grandson: false
            },
            {
                name: '供灌配水操作模擬',
                path: '/供灌配水操作模擬',
                grandson: false
            }
        ]
    },
    {
        name: '風險分析',
        path: '/風險分析',
        children: [
            {
                name: '供灌缺水風險評估',
                path: '/供灌缺水風險評估',
                grandson: [
                ]
            },
            {
                name: '推估入流量風險評估',
                path: '/推估入流量風險評估',
                grandson: [
                ]
            }
        ]
    }
])
const activeIndex = ref('1')
const activeIndex2 = ref('1')

// 方法
function handleSelect(key: string, keyPath: string[]) {
    // console.log(key, keyPath)
}


// 表格=====
interface TableInter {
    DataType: number
    BoundaryID: string
    Name: string
    BoundaryType: number
    StartDate: string
    StartDateStr: string
    StartMDDateStr: string
    EndDate: string
    EndDateStr: string
    EndMDDateStr: string
    value: number
    DayCount: number
    MissDayCount: number
    Rank: number
    StopIrrigationYear: string
    StopIrrigationArea: string
}
const tableData: TableInter[] = [
    {
        "DataType": 0,
        "BoundaryID": "10201",
        "Name": "石門水庫",
        "BoundaryType": 999,
        "StartDate": "/Date(126201600000)/",
        "StartDateStr": "1974-01-01",
        "StartMDDateStr": "01-01",
        "EndDate": "/Date(126979200000)/",
        "EndDateStr": "1974-01-10",
        "EndMDDateStr": "01-10",
        "value": 0,
        "DayCount": 10,
        "MissDayCount": 0,
        "Rank": 1,
        "StopIrrigationYear": "",
        "StopIrrigationArea": ""
    },
    {
        "DataType": 0,
        "BoundaryID": "10201",
        "Name": "石門水庫",
        "BoundaryType": 999,
        "StartDate": "/Date(1577808000000)/",
        "StartDateStr": "2020-01-01",
        "StartMDDateStr": "01-01",
        "EndDate": "/Date(1578585600000)/",
        "EndDateStr": "2020-01-10",
        "EndMDDateStr": "01-10",
        "value": 0.1,
        "DayCount": 10,
        "MissDayCount": 0,
        "Rank": 2,
        "StopIrrigationYear": "",
        "StopIrrigationArea": ""
    },
    {
        "DataType": 0,
        "BoundaryID": "10201",
        "Name": "石門水庫",
        "BoundaryType": 999,
        "StartDate": "/Date(1199116800000)/",
        "StartDateStr": "2008-01-01",
        "StartMDDateStr": "01-01",
        "EndDate": "/Date(1199894400000)/",
        "EndDateStr": "2008-01-10",
        "EndMDDateStr": "01-10",
        "value": 0.4,
        "DayCount": 10,
        "MissDayCount": 0,
        "Rank": 3,
        "StopIrrigationYear": "",
        "StopIrrigationArea": ""
    },
    {
        "DataType": 0,
        "BoundaryID": "10201",
        "Name": "石門水庫",
        "BoundaryType": 999,
        "StartDate": "/Date(1009814400000)/",
        "StartDateStr": "2002-01-01",
        "StartMDDateStr": "01-01",
        "EndDate": "/Date(1010592000000)/",
        "EndDateStr": "2002-01-10",
        "EndMDDateStr": "01-10",
        "value": 0.5,
        "DayCount": 10,
        "MissDayCount": 0,
        "Rank": 4,
        "StopIrrigationYear": "",
        "StopIrrigationArea": ""
    },
    {
        "DataType": 0,
        "BoundaryID": "10201",
        "Name": "石門水庫",
        "BoundaryType": 999,
        "StartDate": "/Date(-126259200000)/",
        "StartDateStr": "1966-01-01",
        "StartMDDateStr": "01-01",
        "EndDate": "/Date(-125481600000)/",
        "EndDateStr": "1966-01-10",
        "EndMDDateStr": "01-10",
        "value": 1.2,
        "DayCount": 10,
        "MissDayCount": 0,
        "Rank": 5,
        "StopIrrigationYear": "",
        "StopIrrigationArea": ""
    },
    {
        "DataType": 0,
        "BoundaryID": "10201",
        "Name": "石門水庫",
        "BoundaryType": 999,
        "StartDate": "/Date(1072886400000)/",
        "StartDateStr": "2004-01-01",
        "StartMDDateStr": "01-01",
        "EndDate": "/Date(1073664000000)/",
        "EndDateStr": "2004-01-10",
        "EndMDDateStr": "01-10",
        "value": 1.3,
        "DayCount": 10,
        "MissDayCount": 0,
        "Rank": 6,
        "StopIrrigationYear": "93年1期作",
        "StopIrrigationArea": " 石門+桃園全區"
    },
    {
        "DataType": 0,
        "BoundaryID": "10201",
        "Name": "石門水庫",
        "BoundaryType": 999,
        "StartDate": "/Date(820425600000)/",
        "StartDateStr": "1996-01-01",
        "StartMDDateStr": "01-01",
        "EndDate": "/Date(821203200000)/",
        "EndDateStr": "1996-01-10",
        "EndMDDateStr": "01-10",
        "value": 1.5,
        "DayCount": 10,
        "MissDayCount": 0,
        "Rank": 7,
        "StopIrrigationYear": "",
        "StopIrrigationArea": ""
    },
    {
        "DataType": 0,
        "BoundaryID": "10201",
        "Name": "石門水庫",
        "BoundaryType": 999,
        "StartDate": "/Date(1420041600000)/",
        "StartDateStr": "2015-01-01",
        "StartMDDateStr": "01-01",
        "EndDate": "/Date(1420819200000)/",
        "EndDateStr": "2015-01-10",
        "EndMDDateStr": "01-10",
        "value": 1.8,
        "DayCount": 10,
        "MissDayCount": 0,
        "Rank": 8,
        "StopIrrigationYear": "104年1期作",
        "StopIrrigationArea": " 大漢溪流域-桃園灌區"
    },
    {
        "DataType": 0,
        "BoundaryID": "10201",
        "Name": "石門水庫",
        "BoundaryType": 999,
        "StartDate": "/Date(1483200000000)/",
        "StartDateStr": "2017-01-01",
        "StartMDDateStr": "01-01",
        "EndDate": "/Date(1483977600000)/",
        "EndDateStr": "2017-01-10",
        "EndMDDateStr": "01-10",
        "value": 1.9,
        "DayCount": 10,
        "MissDayCount": 0,
        "Rank": 9,
        "StopIrrigationYear": "",
        "StopIrrigationArea": ""
    },
    {
        "DataType": 0,
        "BoundaryID": "10201",
        "Name": "石門水庫",
        "BoundaryType": 999,
        "StartDate": "/Date(883584000000)/",
        "StartDateStr": "1998-01-01",
        "StartMDDateStr": "01-01",
        "EndDate": "/Date(884361600000)/",
        "EndDateStr": "1998-01-10",
        "EndMDDateStr": "01-10",
        "value": 2.5,
        "DayCount": 10,
        "MissDayCount": 0,
        "Rank": 10,
        "StopIrrigationYear": "",
        "StopIrrigationArea": ""
    },
    {
        "DataType": 0,
        "BoundaryID": "10201",
        "Name": "石門水庫",
        "BoundaryType": 999,
        "StartDate": "/Date(725817600000)/",
        "StartDateStr": "1993-01-01",
        "StartMDDateStr": "01-01",
        "EndDate": "/Date(726595200000)/",
        "EndDateStr": "1993-01-10",
        "EndMDDateStr": "01-10",
        "value": 3.2,
        "DayCount": 10,
        "MissDayCount": 0,
        "Rank": 11,
        "StopIrrigationYear": "",
        "StopIrrigationArea": ""
    },
    {
        "DataType": 0,
        "BoundaryID": "10201",
        "Name": "石門水庫",
        "BoundaryType": 999,
        "StartDate": "/Date(347126400000)/",
        "StartDateStr": "1981-01-01",
        "StartMDDateStr": "01-01",
        "EndDate": "/Date(347904000000)/",
        "EndDateStr": "1981-01-10",
        "EndMDDateStr": "01-10",
        "value": 3.3,
        "DayCount": 10,
        "MissDayCount": 0,
        "Rank": 12,
        "StopIrrigationYear": "",
        "StopIrrigationArea": ""
    },
    {
        "DataType": 0,
        "BoundaryID": "10201",
        "Name": "石門水庫",
        "BoundaryType": 999,
        "StartDate": "/Date(946656000000)/",
        "StartDateStr": "2000-01-01",
        "StartMDDateStr": "01-01",
        "EndDate": "/Date(947433600000)/",
        "EndDateStr": "2000-01-10",
        "EndMDDateStr": "01-10",
        "value": 3.7,
        "DayCount": 10,
        "MissDayCount": 0,
        "Rank": 13,
        "StopIrrigationYear": "",
        "StopIrrigationArea": ""
    },
    {
        "DataType": 0,
        "BoundaryID": "10201",
        "Name": "石門水庫",
        "BoundaryType": 999,
        "StartDate": "/Date(1388505600000)/",
        "StartDateStr": "2014-01-01",
        "StartMDDateStr": "01-01",
        "EndDate": "/Date(1389283200000)/",
        "EndDateStr": "2014-01-10",
        "EndMDDateStr": "01-10",
        "value": 3.8,
        "DayCount": 10,
        "MissDayCount": 0,
        "Rank": 14,
        "StopIrrigationYear": "",
        "StopIrrigationArea": ""
    },
    {
        "DataType": 0,
        "BoundaryID": "10201",
        "Name": "石門水庫",
        "BoundaryType": 999,
        "StartDate": "/Date(1704038400000)/",
        "StartDateStr": "2024-01-01",
        "StartMDDateStr": "01-01",
        "EndDate": "/Date(1704729600000)/",
        "EndDateStr": "2024-01-09",
        "EndMDDateStr": "01-09",
        "value": 4.7,
        "DayCount": 9,
        "MissDayCount": 1,
        "Rank": 15,
        "StopIrrigationYear": "",
        "StopIrrigationArea": ""
    },
    {
        "DataType": 0,
        "BoundaryID": "10201",
        "Name": "石門水庫",
        "BoundaryType": 999,
        "StartDate": "/Date(378662400000)/",
        "StartDateStr": "1982-01-01",
        "StartMDDateStr": "01-01",
        "EndDate": "/Date(379440000000)/",
        "EndDateStr": "1982-01-10",
        "EndMDDateStr": "01-10",
        "value": 4.9,
        "DayCount": 10,
        "MissDayCount": 0,
        "Rank": 16,
        "StopIrrigationYear": "",
        "StopIrrigationArea": ""
    },
    {
        "DataType": 0,
        "BoundaryID": "10201",
        "Name": "石門水庫",
        "BoundaryType": 999,
        "StartDate": "/Date(915120000000)/",
        "StartDateStr": "1999-01-01",
        "StartMDDateStr": "01-01",
        "EndDate": "/Date(915897600000)/",
        "EndDateStr": "1999-01-10",
        "EndMDDateStr": "01-10",
        "value": 5.7,
        "DayCount": 10,
        "MissDayCount": 0,
        "Rank": 17,
        "StopIrrigationYear": "",
        "StopIrrigationArea": ""
    },
    {
        "DataType": 0,
        "BoundaryID": "10201",
        "Name": "石門水庫",
        "BoundaryType": 999,
        "StartDate": "/Date(157737600000)/",
        "StartDateStr": "1975-01-01",
        "StartMDDateStr": "01-01",
        "EndDate": "/Date(158515200000)/",
        "EndDateStr": "1975-01-10",
        "EndMDDateStr": "01-10",
        "value": 6.3,
        "DayCount": 10,
        "MissDayCount": 0,
        "Rank": 18,
        "StopIrrigationYear": "",
        "StopIrrigationArea": ""
    },
    {
        "DataType": 0,
        "BoundaryID": "10201",
        "Name": "石門水庫",
        "BoundaryType": 999,
        "StartDate": "/Date(599587200000)/",
        "StartDateStr": "1989-01-01",
        "StartMDDateStr": "01-01",
        "EndDate": "/Date(600364800000)/",
        "EndDateStr": "1989-01-10",
        "EndMDDateStr": "01-10",
        "value": 6.6,
        "DayCount": 10,
        "MissDayCount": 0,
        "Rank": 19,
        "StopIrrigationYear": "",
        "StopIrrigationArea": ""
    },
    {
        "DataType": 0,
        "BoundaryID": "10201",
        "Name": "石門水庫",
        "BoundaryType": 999,
        "StartDate": "/Date(757353600000)/",
        "StartDateStr": "1994-01-01",
        "StartMDDateStr": "01-01",
        "EndDate": "/Date(758131200000)/",
        "EndDateStr": "1994-01-10",
        "EndMDDateStr": "01-10",
        "value": 7,
        "DayCount": 10,
        "MissDayCount": 0,
        "Rank": 20,
        "StopIrrigationYear": "",
        "StopIrrigationArea": ""
    },
    {
        "DataType": 0,
        "BoundaryID": "10201",
        "Name": "石門水庫",
        "BoundaryType": 999,
        "StartDate": "/Date(283968000000)/",
        "StartDateStr": "1979-01-01",
        "StartMDDateStr": "01-01",
        "EndDate": "/Date(284745600000)/",
        "EndDateStr": "1979-01-10",
        "EndMDDateStr": "01-10",
        "value": 7,
        "DayCount": 10,
        "MissDayCount": 0,
        "Rank": 21,
        "StopIrrigationYear": "",
        "StopIrrigationArea": ""
    },
    {
        "DataType": 0,
        "BoundaryID": "10201",
        "Name": "石門水庫",
        "BoundaryType": 999,
        "StartDate": "/Date(978278400000)/",
        "StartDateStr": "2001-01-01",
        "StartMDDateStr": "01-01",
        "EndDate": "/Date(979056000000)/",
        "EndDateStr": "2001-01-10",
        "EndMDDateStr": "01-10",
        "value": 8,
        "DayCount": 10,
        "MissDayCount": 0,
        "Rank": 22,
        "StopIrrigationYear": "",
        "StopIrrigationArea": ""
    },
    {
        "DataType": 0,
        "BoundaryID": "10201",
        "Name": "石門水庫",
        "BoundaryType": 999,
        "StartDate": "/Date(-189417600000)/",
        "StartDateStr": "1964-01-01",
        "StartMDDateStr": "01-01",
        "EndDate": "/Date(-188640000000)/",
        "EndDateStr": "1964-01-10",
        "EndMDDateStr": "01-10",
        "value": 8.1,
        "DayCount": 10,
        "MissDayCount": 0,
        "Rank": 23,
        "StopIrrigationYear": "",
        "StopIrrigationArea": ""
    },
    {
        "DataType": 0,
        "BoundaryID": "10201",
        "Name": "石門水庫",
        "BoundaryType": 999,
        "StartDate": "/Date(-31564800000)/",
        "StartDateStr": "1969-01-01",
        "StartMDDateStr": "01-01",
        "EndDate": "/Date(-30787200000)/",
        "EndDateStr": "1969-01-10",
        "EndMDDateStr": "01-10",
        "value": 8.2,
        "DayCount": 10,
        "MissDayCount": 0,
        "Rank": 24,
        "StopIrrigationYear": "",
        "StopIrrigationArea": ""
    },
    {
        "DataType": 0,
        "BoundaryID": "10201",
        "Name": "石門水庫",
        "BoundaryType": 999,
        "StartDate": "/Date(31507200000)/",
        "StartDateStr": "1971-01-01",
        "StartMDDateStr": "01-01",
        "EndDate": "/Date(32284800000)/",
        "EndDateStr": "1971-01-10",
        "EndMDDateStr": "01-10",
        "value": 8.7,
        "DayCount": 10,
        "MissDayCount": 0,
        "Rank": 25,
        "StopIrrigationYear": "",
        "StopIrrigationArea": ""
    },
    {
        "DataType": 0,
        "BoundaryID": "10201",
        "Name": "石門水庫",
        "BoundaryType": 999,
        "StartDate": "/Date(-63187200000)/",
        "StartDateStr": "1968-01-01",
        "StartMDDateStr": "01-01",
        "EndDate": "/Date(-62409600000)/",
        "EndDateStr": "1968-01-10",
        "EndMDDateStr": "01-10",
        "value": 11,
        "DayCount": 10,
        "MissDayCount": 0,
        "Rank": 26,
        "StopIrrigationYear": "",
        "StopIrrigationArea": ""
    },
    {
        "DataType": 0,
        "BoundaryID": "10201",
        "Name": "石門水庫",
        "BoundaryType": 999,
        "StartDate": "/Date(-28800000)/",
        "StartDateStr": "1970-01-01",
        "StartMDDateStr": "01-01",
        "EndDate": "/Date(748800000)/",
        "EndDateStr": "1970-01-10",
        "EndMDDateStr": "01-10",
        "value": 11.1,
        "DayCount": 10,
        "MissDayCount": 0,
        "Rank": 27,
        "StopIrrigationYear": "",
        "StopIrrigationArea": ""
    },
    {
        "DataType": 0,
        "BoundaryID": "10201",
        "Name": "石門水庫",
        "BoundaryType": 999,
        "StartDate": "/Date(189273600000)/",
        "StartDateStr": "1976-01-01",
        "StartMDDateStr": "01-01",
        "EndDate": "/Date(190051200000)/",
        "EndDateStr": "1976-01-10",
        "EndMDDateStr": "01-10",
        "value": 11.1,
        "DayCount": 10,
        "MissDayCount": 0,
        "Rank": 28,
        "StopIrrigationYear": "",
        "StopIrrigationArea": ""
    },
    {
        "DataType": 0,
        "BoundaryID": "10201",
        "Name": "石門水庫",
        "BoundaryType": 999,
        "StartDate": "/Date(1136044800000)/",
        "StartDateStr": "2006-01-01",
        "StartMDDateStr": "01-01",
        "EndDate": "/Date(1136822400000)/",
        "EndDateStr": "2006-01-10",
        "EndMDDateStr": "01-10",
        "value": 11.5,
        "DayCount": 10,
        "MissDayCount": 0,
        "Rank": 29,
        "StopIrrigationYear": "95年1期作",
        "StopIrrigationArea": " 桃園全區"
    },
    {
        "DataType": 0,
        "BoundaryID": "10201",
        "Name": "石門水庫",
        "BoundaryType": 999,
        "StartDate": "/Date(1104508800000)/",
        "StartDateStr": "2005-01-01",
        "StartMDDateStr": "01-01",
        "EndDate": "/Date(1105286400000)/",
        "EndDateStr": "2005-01-10",
        "EndMDDateStr": "01-10",
        "value": 12.7,
        "DayCount": 10,
        "MissDayCount": 0,
        "Rank": 30,
        "StopIrrigationYear": "",
        "StopIrrigationArea": ""
    },
    {
        "DataType": 0,
        "BoundaryID": "10201",
        "Name": "石門水庫",
        "BoundaryType": 999,
        "StartDate": "/Date(1640966400000)/",
        "StartDateStr": "2022-01-01",
        "StartMDDateStr": "01-01",
        "EndDate": "/Date(1641744000000)/",
        "EndDateStr": "2022-01-10",
        "EndMDDateStr": "01-10",
        "value": 13.1,
        "DayCount": 10,
        "MissDayCount": 0,
        "Rank": 31,
        "StopIrrigationYear": "",
        "StopIrrigationArea": ""
    },
    {
        "DataType": 0,
        "BoundaryID": "10201",
        "Name": "石門水庫",
        "BoundaryType": 999,
        "StartDate": "/Date(1609430400000)/",
        "StartDateStr": "2021-01-01",
        "StartMDDateStr": "01-01",
        "EndDate": "/Date(1610208000000)/",
        "EndDateStr": "2021-01-10",
        "EndMDDateStr": "01-10",
        "value": 13.4,
        "DayCount": 10,
        "MissDayCount": 0,
        "Rank": 32,
        "StopIrrigationYear": "110年1期作",
        "StopIrrigationArea": " 桃園全區、石門全區"
    },
    {
        "DataType": 0,
        "BoundaryID": "10201",
        "Name": "石門水庫",
        "BoundaryType": 999,
        "StartDate": "/Date(1293811200000)/",
        "StartDateStr": "2011-01-01",
        "StartMDDateStr": "01-01",
        "EndDate": "/Date(1294588800000)/",
        "EndDateStr": "2011-01-10",
        "EndMDDateStr": "01-10",
        "value": 14.2,
        "DayCount": 10,
        "MissDayCount": 0,
        "Rank": 33,
        "StopIrrigationYear": "",
        "StopIrrigationArea": ""
    },
    {
        "DataType": 0,
        "BoundaryID": "10201",
        "Name": "石門水庫",
        "BoundaryType": 999,
        "StartDate": "/Date(1167580800000)/",
        "StartDateStr": "2007-01-01",
        "StartMDDateStr": "01-01",
        "EndDate": "/Date(1168358400000)/",
        "EndDateStr": "2007-01-10",
        "EndMDDateStr": "01-10",
        "value": 14.9,
        "DayCount": 10,
        "MissDayCount": 0,
        "Rank": 34,
        "StopIrrigationYear": "",
        "StopIrrigationArea": ""
    },
    {
        "DataType": 0,
        "BoundaryID": "10201",
        "Name": "石門水庫",
        "BoundaryType": 999,
        "StartDate": "/Date(1230739200000)/",
        "StartDateStr": "2009-01-01",
        "StartMDDateStr": "01-01",
        "EndDate": "/Date(1231516800000)/",
        "EndDateStr": "2009-01-10",
        "EndMDDateStr": "01-10",
        "value": 15,
        "DayCount": 10,
        "MissDayCount": 0,
        "Rank": 35,
        "StopIrrigationYear": "",
        "StopIrrigationArea": ""
    },
    {
        "DataType": 0,
        "BoundaryID": "10201",
        "Name": "石門水庫",
        "BoundaryType": 999,
        "StartDate": "/Date(441734400000)/",
        "StartDateStr": "1984-01-01",
        "StartMDDateStr": "01-01",
        "EndDate": "/Date(442512000000)/",
        "EndDateStr": "1984-01-10",
        "EndMDDateStr": "01-10",
        "value": 15.3,
        "DayCount": 10,
        "MissDayCount": 0,
        "Rank": 36,
        "StopIrrigationYear": "",
        "StopIrrigationArea": ""
    },
    {
        "DataType": 0,
        "BoundaryID": "10201",
        "Name": "石門水庫",
        "BoundaryType": 999,
        "StartDate": "/Date(788889600000)/",
        "StartDateStr": "1995-01-01",
        "StartMDDateStr": "01-01",
        "EndDate": "/Date(789667200000)/",
        "EndDateStr": "1995-01-10",
        "EndMDDateStr": "01-10",
        "value": 17.2,
        "DayCount": 10,
        "MissDayCount": 0,
        "Rank": 37,
        "StopIrrigationYear": "",
        "StopIrrigationArea": ""
    },
    {
        "DataType": 0,
        "BoundaryID": "10201",
        "Name": "石門水庫",
        "BoundaryType": 999,
        "StartDate": "/Date(473356800000)/",
        "StartDateStr": "1985-01-01",
        "StartMDDateStr": "01-01",
        "EndDate": "/Date(474134400000)/",
        "EndDateStr": "1985-01-10",
        "EndMDDateStr": "01-10",
        "value": 17.8,
        "DayCount": 10,
        "MissDayCount": 0,
        "Rank": 38,
        "StopIrrigationYear": "",
        "StopIrrigationArea": ""
    },
    {
        "DataType": 0,
        "BoundaryID": "10201",
        "Name": "石門水庫",
        "BoundaryType": 999,
        "StartDate": "/Date(567964800000)/",
        "StartDateStr": "1988-01-01",
        "StartMDDateStr": "01-01",
        "EndDate": "/Date(568742400000)/",
        "EndDateStr": "1988-01-10",
        "EndMDDateStr": "01-10",
        "value": 20,
        "DayCount": 10,
        "MissDayCount": 0,
        "Rank": 39,
        "StopIrrigationYear": "",
        "StopIrrigationArea": ""
    },
    {
        "DataType": 0,
        "BoundaryID": "10201",
        "Name": "石門水庫",
        "BoundaryType": 999,
        "StartDate": "/Date(694195200000)/",
        "StartDateStr": "1992-01-01",
        "StartMDDateStr": "01-01",
        "EndDate": "/Date(694972800000)/",
        "EndDateStr": "1992-01-10",
        "EndMDDateStr": "01-10",
        "value": 22.2,
        "DayCount": 10,
        "MissDayCount": 0,
        "Rank": 40,
        "StopIrrigationYear": "",
        "StopIrrigationArea": ""
    },
    {
        "DataType": 0,
        "BoundaryID": "10201",
        "Name": "石門水庫",
        "BoundaryType": 999,
        "StartDate": "/Date(-94723200000)/",
        "StartDateStr": "1967-01-01",
        "StartMDDateStr": "01-01",
        "EndDate": "/Date(-93945600000)/",
        "EndDateStr": "1967-01-10",
        "EndMDDateStr": "01-10",
        "value": 22.8,
        "DayCount": 10,
        "MissDayCount": 0,
        "Rank": 41,
        "StopIrrigationYear": "",
        "StopIrrigationArea": ""
    },
    {
        "DataType": 0,
        "BoundaryID": "10201",
        "Name": "石門水庫",
        "BoundaryType": 999,
        "StartDate": "/Date(315504000000)/",
        "StartDateStr": "1980-01-01",
        "StartMDDateStr": "01-01",
        "EndDate": "/Date(316281600000)/",
        "EndDateStr": "1980-01-10",
        "EndMDDateStr": "01-10",
        "value": 23.6,
        "DayCount": 10,
        "MissDayCount": 0,
        "Rank": 42,
        "StopIrrigationYear": "",
        "StopIrrigationArea": ""
    },
    {
        "DataType": 0,
        "BoundaryID": "10201",
        "Name": "石門水庫",
        "BoundaryType": 999,
        "StartDate": "/Date(1546272000000)/",
        "StartDateStr": "2019-01-01",
        "StartMDDateStr": "01-01",
        "EndDate": "/Date(1547049600000)/",
        "EndDateStr": "2019-01-10",
        "EndMDDateStr": "01-10",
        "value": 23.9,
        "DayCount": 10,
        "MissDayCount": 0,
        "Rank": 43,
        "StopIrrigationYear": "",
        "StopIrrigationArea": ""
    },
    {
        "DataType": 0,
        "BoundaryID": "10201",
        "Name": "石門水庫",
        "BoundaryType": 999,
        "StartDate": "/Date(1672502400000)/",
        "StartDateStr": "2023-01-01",
        "StartMDDateStr": "01-01",
        "EndDate": "/Date(1673280000000)/",
        "EndDateStr": "2023-01-10",
        "EndMDDateStr": "01-10",
        "value": 24.8,
        "DayCount": 10,
        "MissDayCount": 0,
        "Rank": 44,
        "StopIrrigationYear": "",
        "StopIrrigationArea": ""
    },
    {
        "DataType": 0,
        "BoundaryID": "10201",
        "Name": "石門水庫",
        "BoundaryType": 999,
        "StartDate": "/Date(536428800000)/",
        "StartDateStr": "1987-01-01",
        "StartMDDateStr": "01-01",
        "EndDate": "/Date(537206400000)/",
        "EndDateStr": "1987-01-10",
        "EndMDDateStr": "01-10",
        "value": 24.9,
        "DayCount": 10,
        "MissDayCount": 0,
        "Rank": 45,
        "StopIrrigationYear": "",
        "StopIrrigationArea": ""
    },
    {
        "DataType": 0,
        "BoundaryID": "10201",
        "Name": "石門水庫",
        "BoundaryType": 999,
        "StartDate": "/Date(1041350400000)/",
        "StartDateStr": "2003-01-01",
        "StartMDDateStr": "01-01",
        "EndDate": "/Date(1042128000000)/",
        "EndDateStr": "2003-01-10",
        "EndMDDateStr": "01-10",
        "value": 27.1,
        "DayCount": 10,
        "MissDayCount": 0,
        "Rank": 46,
        "StopIrrigationYear": "92年1期作",
        "StopIrrigationArea": " 桃園全區"
    },
    {
        "DataType": 0,
        "BoundaryID": "10201",
        "Name": "石門水庫",
        "BoundaryType": 999,
        "StartDate": "/Date(1356969600000)/",
        "StartDateStr": "2013-01-01",
        "StartMDDateStr": "01-01",
        "EndDate": "/Date(1357747200000)/",
        "EndDateStr": "2013-01-10",
        "EndMDDateStr": "01-10",
        "value": 28,
        "DayCount": 10,
        "MissDayCount": 0,
        "Rank": 47,
        "StopIrrigationYear": "",
        "StopIrrigationArea": ""
    },
    {
        "DataType": 0,
        "BoundaryID": "10201",
        "Name": "石門水庫",
        "BoundaryType": 999,
        "StartDate": "/Date(852048000000)/",
        "StartDateStr": "1997-01-01",
        "StartMDDateStr": "01-01",
        "EndDate": "/Date(852825600000)/",
        "EndDateStr": "1997-01-10",
        "EndMDDateStr": "01-10",
        "value": 32,
        "DayCount": 10,
        "MissDayCount": 0,
        "Rank": 48,
        "StopIrrigationYear": "",
        "StopIrrigationArea": ""
    },
    {
        "DataType": 0,
        "BoundaryID": "10201",
        "Name": "石門水庫",
        "BoundaryType": 999,
        "StartDate": "/Date(252432000000)/",
        "StartDateStr": "1978-01-01",
        "StartMDDateStr": "01-01",
        "EndDate": "/Date(253209600000)/",
        "EndDateStr": "1978-01-10",
        "EndMDDateStr": "01-10",
        "value": 35.8,
        "DayCount": 10,
        "MissDayCount": 0,
        "Rank": 49,
        "StopIrrigationYear": "",
        "StopIrrigationArea": ""
    },
    {
        "DataType": 0,
        "BoundaryID": "10201",
        "Name": "石門水庫",
        "BoundaryType": 999,
        "StartDate": "/Date(662659200000)/",
        "StartDateStr": "1991-01-01",
        "StartMDDateStr": "01-01",
        "EndDate": "/Date(663436800000)/",
        "EndDateStr": "1991-01-10",
        "EndMDDateStr": "01-10",
        "value": 36.1,
        "DayCount": 10,
        "MissDayCount": 0,
        "Rank": 50,
        "StopIrrigationYear": "",
        "StopIrrigationArea": ""
    },
    {
        "DataType": 0,
        "BoundaryID": "10201",
        "Name": "石門水庫",
        "BoundaryType": 999,
        "StartDate": "/Date(631123200000)/",
        "StartDateStr": "1990-01-01",
        "StartMDDateStr": "01-01",
        "EndDate": "/Date(631900800000)/",
        "EndDateStr": "1990-01-10",
        "EndMDDateStr": "01-10",
        "value": 41.1,
        "DayCount": 10,
        "MissDayCount": 0,
        "Rank": 51,
        "StopIrrigationYear": "",
        "StopIrrigationArea": ""
    },
    {
        "DataType": 0,
        "BoundaryID": "10201",
        "Name": "石門水庫",
        "BoundaryType": 999,
        "StartDate": "/Date(1325347200000)/",
        "StartDateStr": "2012-01-01",
        "StartMDDateStr": "01-01",
        "EndDate": "/Date(1326124800000)/",
        "EndDateStr": "2012-01-10",
        "EndMDDateStr": "01-10",
        "value": 49.8,
        "DayCount": 10,
        "MissDayCount": 0,
        "Rank": 52,
        "StopIrrigationYear": "",
        "StopIrrigationArea": ""
    },
    {
        "DataType": 0,
        "BoundaryID": "10201",
        "Name": "石門水庫",
        "BoundaryType": 999,
        "StartDate": "/Date(1262275200000)/",
        "StartDateStr": "2010-01-01",
        "StartMDDateStr": "01-01",
        "EndDate": "/Date(1263052800000)/",
        "EndDateStr": "2010-01-10",
        "EndMDDateStr": "01-10",
        "value": 54,
        "DayCount": 10,
        "MissDayCount": 0,
        "Rank": 53,
        "StopIrrigationYear": "",
        "StopIrrigationArea": ""
    },
    {
        "DataType": 0,
        "BoundaryID": "10201",
        "Name": "石門水庫",
        "BoundaryType": 999,
        "StartDate": "/Date(410198400000)/",
        "StartDateStr": "1983-01-01",
        "StartMDDateStr": "01-01",
        "EndDate": "/Date(410976000000)/",
        "EndDateStr": "1983-01-10",
        "EndMDDateStr": "01-10",
        "value": 55.2,
        "DayCount": 10,
        "MissDayCount": 0,
        "Rank": 54,
        "StopIrrigationYear": "",
        "StopIrrigationArea": ""
    },
    {
        "DataType": 0,
        "BoundaryID": "10201",
        "Name": "石門水庫",
        "BoundaryType": 999,
        "StartDate": "/Date(94665600000)/",
        "StartDateStr": "1973-01-01",
        "StartMDDateStr": "01-01",
        "EndDate": "/Date(95443200000)/",
        "EndDateStr": "1973-01-10",
        "EndMDDateStr": "01-10",
        "value": 57,
        "DayCount": 10,
        "MissDayCount": 0,
        "Rank": 55,
        "StopIrrigationYear": "",
        "StopIrrigationArea": ""
    },
    {
        "DataType": 0,
        "BoundaryID": "10201",
        "Name": "石門水庫",
        "BoundaryType": 999,
        "StartDate": "/Date(1451577600000)/",
        "StartDateStr": "2016-01-01",
        "StartMDDateStr": "01-01",
        "EndDate": "/Date(1452355200000)/",
        "EndDateStr": "2016-01-10",
        "EndMDDateStr": "01-10",
        "value": 61,
        "DayCount": 10,
        "MissDayCount": 0,
        "Rank": 56,
        "StopIrrigationYear": "",
        "StopIrrigationArea": ""
    },
    {
        "DataType": 0,
        "BoundaryID": "10201",
        "Name": "石門水庫",
        "BoundaryType": 999,
        "StartDate": "/Date(220896000000)/",
        "StartDateStr": "1977-01-01",
        "StartMDDateStr": "01-01",
        "EndDate": "/Date(221673600000)/",
        "EndDateStr": "1977-01-10",
        "EndMDDateStr": "01-10",
        "value": 65.1,
        "DayCount": 10,
        "MissDayCount": 0,
        "Rank": 57,
        "StopIrrigationYear": "",
        "StopIrrigationArea": ""
    },
    {
        "DataType": 0,
        "BoundaryID": "10201",
        "Name": "石門水庫",
        "BoundaryType": 999,
        "StartDate": "/Date(504892800000)/",
        "StartDateStr": "1986-01-01",
        "StartMDDateStr": "01-01",
        "EndDate": "/Date(505670400000)/",
        "EndDateStr": "1986-01-10",
        "EndMDDateStr": "01-10",
        "value": 68.7,
        "DayCount": 10,
        "MissDayCount": 0,
        "Rank": 58,
        "StopIrrigationYear": "",
        "StopIrrigationArea": ""
    },
    {
        "DataType": 0,
        "BoundaryID": "10201",
        "Name": "石門水庫",
        "BoundaryType": 999,
        "StartDate": "/Date(-157795200000)/",
        "StartDateStr": "1965-01-01",
        "StartMDDateStr": "01-01",
        "EndDate": "/Date(-157017600000)/",
        "EndDateStr": "1965-01-10",
        "EndMDDateStr": "01-10",
        "value": 69.2,
        "DayCount": 10,
        "MissDayCount": 0,
        "Rank": 59,
        "StopIrrigationYear": "",
        "StopIrrigationArea": ""
    },
    {
        "DataType": 0,
        "BoundaryID": "10201",
        "Name": "石門水庫",
        "BoundaryType": 999,
        "StartDate": "/Date(63043200000)/",
        "StartDateStr": "1972-01-01",
        "StartMDDateStr": "01-01",
        "EndDate": "/Date(63820800000)/",
        "EndDateStr": "1972-01-10",
        "EndMDDateStr": "01-10",
        "value": 119.2,
        "DayCount": 10,
        "MissDayCount": 0,
        "Rank": 60,
        "StopIrrigationYear": "",
        "StopIrrigationArea": ""
    },
    {
        "DataType": 0,
        "BoundaryID": "10201",
        "Name": "石門水庫",
        "BoundaryType": 999,
        "StartDate": "/Date(1514736000000)/",
        "StartDateStr": "2018-01-01",
        "StartMDDateStr": "01-01",
        "EndDate": "/Date(1515513600000)/",
        "EndDateStr": "2018-01-10",
        "EndMDDateStr": "01-10",
        "value": 163.6,
        "DayCount": 10,
        "MissDayCount": 0,
        "Rank": 61,
        "StopIrrigationYear": "",
        "StopIrrigationArea": ""
    }
]




// 转换日期格式的函数，只返回年份
function convertToMinguoYear(dateString) {
    const date = new Date(dateString);
    const minguoYear = date.getFullYear() - 1911; // 转换为民国年份
    return minguoYear;
}

// 遍历 tableData 数组，将每个对象中的 StartDateStr 转换为民国年份
const newData = tableData.map(item => ({
    ...item,
    "StartDateStr": convertToMinguoYear(item.StartDateStr)
}));

console.log(newData);
</script>

<style scoped >
.header {
    z-index: 1000;
    width: 100%;
    height: 95px;
    border-radius: 10px;
    box-shadow: inset 0 -1px 0 0 rgba(98, 105, 118, .16);
    margin-bottom: 50px;
    display: flex;
    padding: 0 10px;
    font-weight: bold;
}

.el-sub-menu__title {
    font-size: 30px;
}

.table {
    color: #000;
}
</style>