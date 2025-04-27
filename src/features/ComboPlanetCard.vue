<script setup lang="ts"></script>

<template>
  <div class="combo-planet-card">
    <div class="combo-text">Комбо планет на кнопку</div>

    <button class="combo-button">Получи награду</button>
  </div>
</template>

<style scoped lang="scss">
.combo-planet-card {
  width: 100%;
  padding: 24px 16px;
  background-image: url('@/shared/assets/bg/banner-bg.jpg');
  background-repeat: no-repeat;
  background-position: center center;
  background-size: cover;
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

.combo-button {
  padding: 12px;
  background: var(--font);
  border: none;
  border-radius: 8px;
  font-weight: 500;
  font-size: 13px;
  color: #000000;
  cursor: pointer;
  transition: transform 0.3s ease;

  &:active {
    transform: translateY(0);
  }
}
</style>
