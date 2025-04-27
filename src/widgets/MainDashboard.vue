<script setup lang="ts">
import BalanceCard from '@/entities/BalanceCard.vue'
import ComboPlanetCard from '@/features/ComboPlanetCard.vue'
import DailyAction from '@/features/DailyAction.vue'
</script>

<template>
  <section class="dashboard">
    <div class="balances">
      <BalanceCard amount="2.336" currency="$CITY" bg="/src/shared/assets/bg/city-bg.png">
        <template #icon>
          <img src="@/shared/assets/currency/city.webp" alt="" />
        </template>
      </BalanceCard>
      <BalanceCard amount="2.336" currency="TON" bg="/src/shared/assets/bg/ton-bg.png">
        <template #icon>
          <img src="@/shared/assets/currency/ton.webp" alt="" />
        </template>
      </BalanceCard>
    </div>

    <ComboPlanetCard />
    <div class="daily-actions">
      <DailyAction title="Транзакция" buttonText="Пополнить" variant="yellow">
        <template #reward> Награда <span>100.000 $NEON</span> </template>
      </DailyAction>

      <DailyAction title="Награда" buttonText="Получить" variant="blue">
        <template #reward> Осталось 00:00:00 </template>
      </DailyAction>
    </div>
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
