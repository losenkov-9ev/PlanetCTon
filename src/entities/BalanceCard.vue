<script setup lang="ts">
interface BalanceCardProps {
  currency: string
  amount: string
  bg: string
}

defineProps<BalanceCardProps>()
</script>

<template>
  <div class="balance-card" :style="{ backgroundImage: `url('${bg}')` }">
    <div class="balance-info">
      <div class="icon">
        <slot name="icon"></slot>
      </div>
      <span class="currency">{{ currency }}</span>
    </div>
    <span class="amount">{{ amount }}</span>
  </div>
</template>

<style scoped lang="scss">
.balance-card {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
  border-radius: 8px;
  border: 1px solid #32315f;
  font-weight: 500;

  background-repeat: no-repeat;
  background-position: center center;
  background-size: cover;
  color: #fff;

  .icon {
    width: 22px;
    height: 22px;
  }
  .balance-info {
    display: flex;
    align-items: center;
    gap: 5px;
  }
  .amount {
    font-size: 15px;
  }
}
</style>
