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
    <div class="combo-text">Комбо планет на кнопку</div>

    <UiButton @click="handleButtonClick"> Получи награду </UiButton>
  </div>
</template>

<style scoped lang="scss">
@use '@/app/styles/mixins' as mixins;
.combo-planet-card {
  width: 100%;
  padding: 24px 16px;
  background-image: url('@/shared/assets/bg/banner-bg.jpg');
  @include mixins.bg-cover;
  flex: none;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  border: 1px solid #32315f;
}

.combo-text {
  font-size: 20px;
  font-weight: 600;
  color: var(--font);
  margin-bottom: 16px;
}
</style>
