<template>
    <div class="gantt_wrap">
        <div id="chart-container"></div>
    </div>
</template>
  
<script setup lang="ts">
import Highcharts from 'highcharts';
import HighchartsGantt from 'highcharts/modules/gantt';
import { onMounted } from 'vue';

HighchartsGantt(Highcharts);

const chartData = {
    title: {
        text: '作物基本資訊'
    },
    xAxis: {
        type: 'datetime',
        min: Date.UTC(2022, 0, 1),
        max: Date.UTC(2022, 11, 31),
        labels: {
            formatter: function () {
                return Highcharts.dateFormat('%m月', this.value);
            }
        },
        dateTimeLabelFormats: {
            month: '%m月'
        }
    },
    yAxis: {
        type: 'category',
        grid: {
            columns: [

                {
                    title: {
                        text: '生育期'
                    },
                    categories: ['夏期果', '', '', '', '冬期果', '', '', '', '']
                }
            ]
        }
    },
    series: [
        {
            name: '夏期果',
            data: [
                {
                    start: Date.UTC(2022, 1, 1),
                    end: Date.UTC(2022, 3, 30),
                    name: '整枝修剪',
                    y: 0,
                    colorIndex: 0,
                    dataLabels: {
                        enabled: true,
                        formatter: function () {
                            return '整枝修剪';
                        },
                        color: '#fff',
                    },
                    color: 'gray'
                },
                {
                    start: Date.UTC(2022, 3, 30),
                    end: Date.UTC(2022, 11, 31),
                    name: '枝梢生長',
                    y: 0,
                    colorIndex: 0,
                    dataLabels: {
                        enabled: true,
                        formatter: function () {
                            return '枝梢生長';
                        },
                        color: '#fff'
                    },
                    color: 'green'
                },
                {
                    start: Date.UTC(2022, 1, 15),
                    end: Date.UTC(2022, 5, 31),
                    name: '開花',
                    y: 1,
                    colorIndex: 0,
                    dataLabels: {
                        enabled: true,
                        formatter: function () {
                            return '開花';
                        },
                        color: '#fff'
                    },
                    color: 'red'
                },
                {
                    start: Date.UTC(2022, 2, 15),
                    end: Date.UTC(2022, 6, 31),
                    name: '果實生育',
                    y: 2,
                    colorIndex: 0,
                    dataLabels: {
                        enabled: true,
                        formatter: function () {
                            return '果實生育';
                        },
                        color: '#fff'
                    },
                    color: 'skrblue'
                },
                {
                    start: Date.UTC(2022, 5, 20),
                    end: Date.UTC(2022, 9, 20),
                    name: '果實成熟',
                    y: 3,
                    colorIndex: 0,
                    dataLabels: {
                        enabled: true,
                        formatter: function () {
                            return '果實成熟';
                        },
                        color: '#fff'
                    },
                    color: 'orange'
                }
            ]
        },
        {
            name: '冬期果',
            data: [
                {
                    start: Date.UTC(2022, 5, 1),
                    end: Date.UTC(2022, 9, 15),
                    name: '整枝修剪',
                    y: 4,
                    colorIndex: 0,
                    dataLabels: {
                        enabled: true,
                        formatter: function () {
                            return '整枝修剪';
                        },
                        color: '#fff',
                    },
                    color: 'gray'
                },
                {
                    start: Date.UTC(2022, 6, 15),
                    end: Date.UTC(2022, 10, 15),
                    name: '開花',
                    y: 5,
                    colorIndex: 0,
                    dataLabels: {
                        enabled: true,
                        formatter: function () {
                            return '開花';
                        },
                        color: '#fff'
                    },
                    color: 'red'
                },
                {
                    start: Date.UTC(2022, 8, 15),
                    end: Date.UTC(2022, 11, 31),
                    name: '果實生育',
                    y: 6,
                    colorIndex: 0,
                    dataLabels: {
                        enabled: true,
                        formatter: function () {
                            return '果實生育';
                        },
                        color: '#fff'
                    },
                    color: 'skrblue'
                },
                {
                    start: Date.UTC(2022, 10, 15),
                    end: Date.UTC(2022, 11, 31),
                    name: '果實成熟',
                    y: 7,
                    colorIndex: 0,
                    dataLabels: {
                        enabled: true,
                        formatter: function () {
                            return '果實成熟';
                        },
                        color: '#fff'
                    },
                    color: 'orange'
                },
                {
                    start: Date.UTC(2022, 0, 1),
                    end: Date.UTC(2022, 2, 15),
                    name: '果實成熟',
                    y: 7,
                    colorIndex: 0,
                    dataLabels: {
                        enabled: true,
                        formatter: function () {
                            return '果實成熟';
                        },
                        color: '#fff'
                    },
                    color: 'orange'
                }
            ]
        }
    ]
};





onMounted(() => {
    Highcharts.ganttChart('chart-container', chartData);
});
</script>
  
<style scoped lang="scss">
.gantt_wrap {
    width: 80%;
    margin: auto;
    margin-top: 100px;
}
</style>
  