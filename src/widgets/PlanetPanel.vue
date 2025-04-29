<script setup lang="ts">
import UiButton from '@/shared/ui/UiButton.vue'
import UiModal from '@/shared/ui/UiModal.vue'

import { ref } from 'vue'
import AttackPlanetModal from '@/features/modals/AttackPlanetModal.vue'

const show = ref<boolean>(false)
</script>

<template>
  <section class="planet-panel">
    <div class="planet-wrapper">
      <!--      TODO        -->
    </div>

    <div class="level-card">
      <div class="level-info">
        <img src="../shared/assets/planets/planet-1.png" alt="Мини-планета" class="level-thumb" />
        <div class="level-texts">
          <div class="level-title">Уровень 1</div>
          <div class="level-progress">Осталось: 0/7</div>
        </div>
      </div>

      <div class="level-reward">
        +100
        <img src="@/shared/assets/currency/ton.webp" alt="TON" class="reward-icon" />
      </div>
    </div>

    <UiButton @click="show = true">АТАКОВАТЬ!</UiButton>
    <UiModal v-model="show" title="Атаковать планету">
      <AttackPlanetModal />
    </UiModal>
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
  margin-top: auto;
}

/* Планета */
.planet-wrapper {
  position: relative;
  width: 120%;
}

.planet-image {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.attack-progress {
  position: absolute;
  top: -20px;
  left: 50%;
  transform: translateX(-50%);
  width: 320px;
  height: 160px;
  border-top: 4px solid rgba(255, 255, 255, 0.2);
  border-left: 4px solid transparent;
  border-right: 4px solid transparent;
  border-bottom: none;
  border-radius: 160px 160px 0 0;
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
