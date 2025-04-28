<script setup lang="ts">
import { ref } from 'vue'

import avatar1 from '@/shared/assets/avatars/avatar-1.jpg'
import avatar2 from '@/shared/assets/avatars/avatar-2.jpg'
import avatar3 from '@/shared/assets/avatars/avatar-3.jpg'
import avatar4 from '@/shared/assets/avatars/avatar-4.jpg'

import UserCard from '@/entities/UserCard.vue'
import TabsSwitcher, { type TabItem } from '@/features/TabsSwitcher.vue'
import TopUserCard from '@/entities/TopUserCard.vue'

const activeTab = ref<TabItem['id']>('tones')

const tabs = [
  { id: 'tones', label: 'Тоны' },
  { id: 'referrals', label: 'Рефералы' },
  { id: 'tokens', label: 'Токены' },
]

const myUser = { id: 1, name: 'Katy', score: '0.00005', place: 23 }

const top3Users = [
  {
    id: 1,
    name: 'Mega Boy',
    avatar: avatar1,
    score: '123.35M',
    place: 1,
  },
  {
    id: 2,
    name: 'Mega Girl',
    avatar: avatar2,
    score: '120.00M',
    place: 2,
  },
  {
    id: 3,
    name: 'Alien',
    avatar: avatar3,
    score: '118.00M',
    place: 3,
  },
]

const topUsers = [
  {
    id: 1,
    name: 'Natalie',
    avatar: avatar1,
    score: '0,00005',
    place: 4,
  },
  {
    id: 2,
    name: 'Natalie',
    avatar: avatar2,
    score: '0,00005',
    place: 5,
  },
  {
    id: 3,
    name: 'Natalie',
    avatar: avatar3,
    score: '0,00005',
    place: 21,
  },
  {
    id: 4,
    name: 'Natalie',
    avatar: avatar4,
    score: '0,00005',
    place: 124,
  },
  {
    id: 5,
    name: 'Natalie',
    avatar: avatar2,
    score: '0,00005',
    place: 123,
  },
  {
    id: 6,
    name: 'Natalie',
    avatar: avatar1,
    score: '0,00005',
    place: 6,
  },
  {
    id: 7,
    name: 'Natalie',
    avatar: avatar2,
    score: '0,00005',
    place: 7,
  },
  {
    id: 8,
    name: 'Natalie',
    avatar: avatar3,
    score: '0,00005',
    place: 218,
  },
]
</script>

<template>
  <div class="leaders-page page">
    <h2 class="leaders-title title-1">Мой рейтинг</h2>
    <UserCard :user="myUser" :is-me="true" />
    <TabsSwitcher :tabs="tabs" v-model="activeTab" />
    <div class="top-users">
      <TopUserCard v-for="user in top3Users" :key="user.id" :user="user" />
    </div>
    <h2 class="leaders-title title-1">Топ пользователей</h2>
    <div class="user-list">
      <UserCard v-for="user in topUsers" :key="user.id" :user="user" />
    </div>
  </div>
</template>

<style scoped>
.leaders-page {
  display: flex;
  flex-direction: column;
}
.leaders-title {
  margin-bottom: 12px;
}
.top-users {
  display: flex;
  align-items: end;
  padding-top: 70px;
  gap: 10px;
  margin-bottom: 12px;
}
.user-list {
  flex: 1;
  overflow: auto;
  padding-bottom: 56px;
}
</style>
