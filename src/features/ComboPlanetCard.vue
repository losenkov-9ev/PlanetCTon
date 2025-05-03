<script setup lang="ts">
import UiButton from '@/shared/ui/UiButton.vue'
import { useRouter } from 'vue-router'
import { AppRoutes } from '@/app/router/router.ts'

const router = useRouter()
const handleButtonClick = () => {
  router.push(AppRoutes.PLANETS)
}
</script>

<template>
  <div class="combo-planet-card">
    <div class="combo-text">Атакуй планеты и зарабатывай TON</div>
    <div class="combo-accent">
      <img src="@/shared/assets/currency/ton.webp" />
      Начни всего с <span>1 TON</span>
    </div>

    <UiButton class="combo-planet-button" @click="handleButtonClick" size="sm" color="blue">
      НАЧАТЬ СЕЙЧАС
    </UiButton>
  </div>
</template>

<style scoped lang="scss">
@use '@/app/styles/mixins' as mixins;
.combo-planet-card {
  width: 100%;
  padding: 10px;
  padding-top: 6px;
  background-image: url('@/shared/assets/bg/banner-bg.jpg');
  @include mixins.bg-cover;
  flex: none;
  border-radius: 12px;
  border: 1px solid #32315f;
}

.combo-text {
  font-size: 16px;
  font-weight: 600;
  color: var(--font);
  margin-bottom: 6px;
  margin-right: -10px;
  margin-left: -10px;
  padding: 0 10px;
  padding-bottom: 4px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.11);
}

.combo-accent {
  display: flex;
  align-items: center;
  gap: 5px;
  margin-bottom: 14px;

  img {
    width: 31px;
    height: 31px;
  }

  span {
    color: #27aff9;
    font-weight: 500;
  }
}

.combo-planet-button {
  color: var(--font);
  width: auto;
}
</style>
