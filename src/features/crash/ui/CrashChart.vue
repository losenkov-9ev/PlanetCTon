<template>
  <div class="chart-container">
    <Line :data="chartData" :options="options" />
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { Line } from 'vue-chartjs'
import type { ChartData, ChartOptions } from 'chart.js'

const props = defineProps<{ points: number[] }>()

const chartData = computed<ChartData<'line'>>(() => ({
  labels: props.points.map((_, i) => String(i)),
  datasets: [
    {
      label: '',
      data: props.points,
      fill: false,
      tension: 0.5,
      cubicInterpolationMode: 'monotone',
      borderColor: '#6CEAF1',
      borderWidth: 2,
      pointRadius: 0,
    },
  ],
}))

const options: ChartOptions<'line'> = {
  responsive: true,
  maintainAspectRatio: false,
  animation: false,

  plugins: {
    legend: {
      display: false,
    },
  },

  scales: {
    x: {
      display: false,
    },
    y: {
      grid: {
        color: 'rgba(255,255,255, 0.02)',
      },
      ticks: {
        display: false,
      },
    },
  },

  elements: {
    line: { borderWidth: 2 },
    point: { radius: 0 },
  },
}
</script>

<style lang="scss" scoped>
.chart-container {
  width: 100%;
  height: 200px;
}
</style>
