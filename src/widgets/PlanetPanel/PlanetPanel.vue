<script setup lang="ts">
import { ref } from 'vue'

import UiButton from '@/shared/ui/UiButton.vue'
import UiModal from '@/shared/ui/UiModal.vue'
import AttackPlanetModal from '@/features/modals/AttackPlanetModal.vue'
import CongratsDialog from '@/features/dialogs/CongratsDialog.vue'

import PlanetImage from '@/shared/assets/planets/planet-1/level-0.png'
import UfoImage from '@/shared/assets/bg/ufo.webp'
import AttackScene from '@/widgets/PlanetPanel/AttackScene.vue'

const showAttackModal = ref(false)
const showCongrats = ref(false)

const currentLevel = ref<number>(0)

function onOpenAttack() {
  showAttackModal.value = true
}

function onAttackConfirmed() {
  showAttackModal.value = false
  currentLevel.value++
  // setTimeout(() => {
  //   showCongrats.value = true
  // }, 3600)
}

const fixedPoints = [
  { x: 0.7, y: 0.8 },
  { x: 0.85, y: 0.42, rotation: 120 },
  { x: 0.22, y: 0.7, size: 0.8 },
  { x: 0.25, y: 0.3 },
  { x: 0.6, y: 0.18 },
  { x: 0.45, y: 0.5 },
]
</script>
<template>
  <section class="planet-panel">
    <AttackScene
      :current-level="currentLevel"
      :fixed-points="fixedPoints"
      :planet-src="PlanetImage"
      :ufo-src="UfoImage"
    />
    <div class="level-card">
      <div class="level-info">
        <img
          src="../../shared/assets/planets/planet-1.png"
          alt="Мини-планета"
          class="level-thumb"
        />
        <div class="level-texts">
          <div class="level-title">Уровень {{ currentLevel }}</div>
          <div class="level-progress">Осталось: {{ currentLevel }}/7</div>
        </div>
      </div>

      <div class="level-reward">
        +100
        <img src="../../shared/assets/currency/ton.webp" alt="TON" class="reward-icon" />
      </div>
    </div>

    <UiButton @click="onOpenAttack">АТАКОВАТЬ!</UiButton>
    <UiModal v-model="showAttackModal" title="Атаковать планету">
      <AttackPlanetModal @attack="onAttackConfirmed" />
    </UiModal>

    <CongratsDialog v-model="showCongrats" />
  </section>
</template>

<style scoped lang="scss">
.planet-panel {
  display: flex;
  height: 100%;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  gap: 16px;
  margin-top: 10px;
  overflow: hidden;
}

.planet-image {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

/* Карточка уровня */
.level-card {
  background-image: url('@/shared/assets/bg/level-card-bg.png');
  background-repeat: no-repeat;
  background-position: center center;
  background-size: cover;
  max-width: 100%;
  width: 100%;
  padding: 12px 16px;
  border-radius: 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-left: 60px;
  position: relative;
  border: 1px solid #32315f;
  margin-top: 0px;
}

.level-info {
  display: flex;
  align-items: center;
  gap: 12px;
}

.level-thumb {
  width: 50px;
  height: 50px;
  position: absolute;
  left: 10px;
  top: 50%;
  transform: translateY(-50%);
  object-fit: cover;
  border-radius: 50%;
}

.level-texts {
  display: flex;
  flex-direction: column;
}

.level-title {
  color: #ffffff;
  font-weight: 400;
  font-size: 16px;
  margin-bottom: 3px;
}

.level-progress {
  color: rgba(255, 255, 255, 0.7);
  font-size: 12px;
  font-weight: 500;
}

/* Награда */
.level-reward {
  display: flex;
  align-items: center;
  gap: 5px;
  color: #00d1ff;
  font-size: 16px;
  font-weight: 700;
}

/* Иконка валюты */
.reward-icon {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  overflow: hidden;
}
</style>
