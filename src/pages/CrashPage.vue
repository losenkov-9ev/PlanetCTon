<script lang="ts" setup>
import { ref, onMounted, onUnmounted, computed } from 'vue'
import { type CrashRound, CrashService } from '@/features/crash/api/crashService.ts'
import CrashChart from '@/features/crash/ui/CrashChart.vue'
import BetControls from '@/features/crash/ui/BetControls.vue'
import RoundTimer from '@/features/crash/ui/RoundTimer.vue'

const crashService = new CrashService()

// состояние графика
const chartPoints = ref<number[]>([])
const currentMultiplier = ref(1.0)
const betAmount = ref(0.2)
const hasBet = ref(false)

// состояние таймера
const showTimer = ref(false)
const timerKey = ref(0)

function updateRound(round: CrashRound) {
  // сбрасываем таймер, если стартуем новый раунд
  if (round.current <= 1.01) {
    showTimer.value = false
    chartPoints.value = [round.current]
  } else {
    chartPoints.value = [...chartPoints.value, round.current]
  }
  currentMultiplier.value = round.current
}

function placeBet() {
  hasBet.value = true
  // логика бета — пока мок
}

const exponent = Math.log(1.04) / Math.log(1.01)
const displayPoints = computed(() =>
  chartPoints.value.map((p) => parseFloat(Math.pow(p, exponent).toFixed(2))),
)

onMounted(() => {
  crashService.onUpdate(updateRound)

  // подписываемся на краш — показываем таймер
  crashService.onCrash(() => {
    showTimer.value = true
    timerKey.value++
  })

  crashService.start()
})

onUnmounted(() => {
  crashService.offUpdate(updateRound)
  crashService.stop()
})
</script>

<template>
  <div class="page crash-page">
    <div class="title title-1">Crash</div>

    <div class="crash-wrapper">
      <CrashChart :points="displayPoints" />
      <RoundTimer v-if="showTimer" :startFrom="5" />
      <BetControls v-model:amount="betAmount" @bet="placeBet" />
      <div class="current-multiplier">x{{ currentMultiplier.toFixed(2) }}</div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.crash-page {
  .current-multiplier {
    text-align: center;
    font-size: 24px;
    margin-top: 12px;
  }

  .crash-wrapper {
    background: rgba(30, 34, 55, 0.5);
    backdrop-filter: blur(8px);
    margin-top: 24px;
    padding: 16px;
    border-radius: 8px;
  }
}
</style>
