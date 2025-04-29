<script setup lang="ts">
import UiButton from '@/shared/ui/UiButton.vue'
</script>

<template>
  <div class="combo-planet-card">
    <div class="combo-text">Комбо планет на кнопку</div>

    <UiButton> Получи награду </UiButton>
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
