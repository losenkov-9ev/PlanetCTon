<script setup lang="ts">
import TasksBanner from '@/features/TasksBanner.vue'
import { dailyTasks, otherTasks } from '@/shared/mock/tasks.ts'
import TaskCard from '@/entities/TaskCard/TaskCard.vue'
</script>

<template>
  <div class="tasks-page page">
    <TasksBanner />
    <div class="tasks-list scrolled-list">
      <h2 class="title-1">Ежедневные задания</h2>
      <TaskCard v-for="task in dailyTasks" :key="task.id" :task="task" />
      <h2 class="title-1">Список заданий</h2>
      <TaskCard v-for="task in otherTasks" :key="task.id" :task="task" />
    </div>
  </div>
</template>

<style scoped>
.tasks-list .title-1 {
  margin-bottom: 10px;
}
</style>
