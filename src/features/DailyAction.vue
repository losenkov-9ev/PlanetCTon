<script setup lang="ts">
import { computed } from 'vue'

interface DailyActionProps {
  title: string
  buttonText: string
  variant: 'yellow' | 'blue'
}

const props = defineProps<DailyActionProps>()

const variantClass = computed(() => {
  return `variant-${props.variant}`
})
</script>

<template>
  <div class="daily-action-card" :class="variantClass">
    <div class="card-head">
      <div class="card-icon">
        <img
          :src="
            variant === 'yellow'
              ? '/src/shared/assets/icons/daily-1.png'
              : '/src/shared/assets/currency/ton.webp'
          "
          alt=""
        />
      </div>
      <div class="card-head-inner">
        <div class="tip">Ежедневная</div>
        <div class="card-title">{{ title }}</div>
      </div>
    </div>
    <button class="card-button" :class="variant">
      {{ buttonText }}
    </button>
    <div class="card-reward" :class="variant">
      <slot name="reward"> </slot>
    </div>
  </div>
</template>

<style lang="scss">
.daily-action-card {
  width: 100%;
  padding: 16px;
  border-radius: 20px;
  margin-bottom: 12px;
  transition: background 0.3s;
  border: 1px solid #32315f;

  background-repeat: no-repeat;
  background-position: center center;
  background-size: cover;
}

.variant-yellow {
  background-image: url('@/shared/assets/bg/benefit-1-bg.png');
}

.variant-blue {
  background-image: url('@/shared/assets/bg/benefit-2-bg.png');
}

.card-content {
  display: flex;
  flex-direction: column;
  color: #ffffff;
  text-align: left;
}

.card-head {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 10px;
  .card-icon {
    flex: none;
    width: 31px;
    height: 31px;
  }
  .tip {
    font-weight: 500;
    color: rgba(255, 255, 255, 0.7);
  }
}

.card-title {
  font-size: 15px;
  font-weight: 500;
}

.card-reward {
  font-size: 12px;
  color: var(--font);
  margin: 0 auto;
  text-align: center;

  &.yellow span {
    color: #eda400;
  }
  &.blue span {
    color: #27aff9;
  }
}

.card-button {
  padding: 7px;
  max-width: 100%;
  width: 100%;
  background: #ffffff;
  border: none;
  border-radius: 4px;
  font-weight: 500;
  font-size: 13px;
  margin-bottom: 10px;
  color: #000000;
  cursor: pointer;
  transition: transform 0.3s ease;

  &.yellow {
    background: #eda400;
  }
  &.blue {
    background: #27aff9;
  }
}
</style>
