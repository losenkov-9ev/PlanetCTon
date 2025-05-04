<script setup lang="ts">
import StatisticsCard from '@/entities/StatisticsCard.vue'
import UsersIcon from '@/shared/assets/icons/users.svg'
import LightningIcon from '@/shared/assets/icons/lightning.svg'
import PlanetIcon from '@/shared/assets/icons/planet.svg'
import PlayIcon from '@/shared/assets/icons/play.svg'
</script>

<template>
  <div class="statistics">
    <div class="title title-1">Статистика</div>
    <div class="statistics-inner">
      <StatisticsCard
        value="245 210"
        color="#0088e5"
        count="1 613"
        text="Пользователи, которые уже зарабатывают с PlanetCTon"
      >
        <UsersIcon />
      </StatisticsCard>
      <StatisticsCard
        count="46.24"
        value="1583.20"
        color="#17d686"
        text="Общая доходность всех планет"
      >
        <LightningIcon />
      </StatisticsCard>
      <StatisticsCard value="326" color="#FBA704" count="7" text="Всего куплено планет">
        <PlanetIcon />
      </StatisticsCard>
      <StatisticsCard value="2 903" count="14" color="#763FF1" text="Пройдено уровней">
        <PlayIcon />
      </StatisticsCard>
    </div>
  </div>
</template>

<style scoped lang="scss">
.statistics {
  margin-top: 20px;
}

.title {
  margin-bottom: 10px;
}

.statistics-inner {
  display: grid;
  gap: 10px;
  grid-template-columns: repeat(2, 1fr);
}
</style>
