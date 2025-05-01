<script setup lang="ts">
import BalanceCard from '@/entities/BalanceCard.vue'
import ComboPlanetCard from '@/features/ComboPlanetCard.vue'
</script>

<template>
  <section class="dashboard">
    <div class="balances">
      <BalanceCard amount="2.336" currency="$CITY" bg="yellow">
        <template #icon>
          <img src="@/shared/assets/currency/city.webp" alt="" />
        </template>
      </BalanceCard>
      <BalanceCard amount="2.336" currency="TON" bg="blue">
        <template #icon>
          <img src="@/shared/assets/currency/ton.webp" alt="" />
        </template>
      </BalanceCard>
    </div>

    <ComboPlanetCard />
  </section>
</template>

<style scoped lang="scss">
.dashboard {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

/* Сетка для балансов */
.balances {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 9px;
}

/* Сетка для daily actions */
.daily-actions {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 9px;
}

/* Стили для иконок валют */
.balance-icon {
  width: 24px;
  height: 24px;
  margin-right: 8px;
}
</style>
