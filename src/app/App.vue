<script setup lang="ts">
import MainNavigation from '@/widgets/MainNavigation.vue'

import { onMounted, onBeforeUnmount } from 'vue'

function onGlobalTap(e: TouchEvent | MouseEvent) {
  const target = e.target as HTMLElement
  if (!target.closest('input, textarea, [contenteditable]')) {
    const active = document.activeElement as HTMLElement | null
    if (
      active &&
      (active.tagName === 'INPUT' || active.tagName === 'TEXTAREA' || active.isContentEditable)
    ) {
      active.blur()
    }
  }
}

onMounted(() => {
  document.addEventListener('click', onGlobalTap)
})

onBeforeUnmount(() => {
  document.removeEventListener('click', onGlobalTap)
})
</script>

<template>
  <div class="app-container">
    <RouterView />
    <MainNavigation />
  </div>
</template>

<style scoped lang="scss">
.app-container {
  max-width: 768px;
  width: 100%;
  margin: 0 auto;
  position: relative;
  display: flex;
  flex: 1;
  flex-direction: column;
  overflow: hidden;
}
</style>
