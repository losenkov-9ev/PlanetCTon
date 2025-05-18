<script lang="ts" setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { type CrashRound, CrashService } from '@/features/crash/api/crashService.ts'
import CrashChart from '@/features/crash/ui/CrashChart.vue'
import BetControls from '@/features/crash/ui/BetControls.vue'

const crashService = new CrashService()

const currentMultiplier = ref(1.0)
const betAmount = ref(0.2)
const isGame = ref(false)

function updateRound(round: CrashRound) {
  currentMultiplier.value = round.current
}

function handleCrash() {
  console.log('Crash at', currentMultiplier.value)
  isGame.value = false
}

function placeBet() {
  crashService.startRound(3000)
  isGame.value = true
}

onMounted(() => {
  crashService.onUpdate(updateRound)
  crashService.onCrash(handleCrash)
})

onUnmounted(() => {
  crashService.stop()
})
</script>

<template>
  <div class="page crash-page">
    <div class="title title-1">Crash</div>
    <div class="crash-wrapper">
      <CrashChart :status="isGame" />
      <BetControls v-model:amount="betAmount" @bet="placeBet" />
      <div class="current-multiplier">x{{ currentMultiplier.toFixed(2) }}</div>
    </div>
  </div>
</template>

<style scoped lang="scss">
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
