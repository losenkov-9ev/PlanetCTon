import { createRouter, createWebHistory } from 'vue-router'
import { AppRoutes } from '@/app/router/router.ts'

import HomePage from '@/pages/HomePage.vue'
import LeadersPage from '@/pages/LeadersPage.vue'
import FriendsPage from '@/pages/FriendsPage.vue'
import TasksPage from '@/pages/TasksPage.vue'
import BalancePage from '@/pages/BalancePage.vue'

const routes = [
  { path: AppRoutes.HOME, component: HomePage },
  { path: AppRoutes.LEADERS, component: LeadersPage },
  { path: AppRoutes.FRIENDS, component: FriendsPage },
  { path: AppRoutes.TASKS, component: TasksPage },
  { path: AppRoutes.BALANCE, component: BalancePage },
]

export const router = createRouter({
  history: createWebHistory(),
  routes,
})
