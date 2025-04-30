<script setup lang="ts">
import { defineProps, defineEmits } from 'vue'

interface UiDialogProps {
  modelValue: boolean
}

interface UiDialogEmits {
  (e: 'update:modelValue', v: boolean): void
}

defineProps<UiDialogProps>()
const emit = defineEmits<UiDialogEmits>()

function close() {
  emit('update:modelValue', false)
}
</script>

<template>
  <Teleport to="body">
    <Transition name="overlay-fade">
      <div v-if="modelValue" class="dialog-overlay" @click.self="close" />
    </Transition>

    <Transition name="slide-up">
      <div v-if="modelValue" class="dialog-wrapper">
        <slot />
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped lang="scss">
.dialog-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1000;
}

.dialog-wrapper {
  position: fixed;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  z-index: 1001;
  pointer-events: none;
}

.dialog-wrapper > * {
  pointer-events: auto;
}

.overlay-fade-enter-active,
.overlay-fade-leave-active {
  transition: opacity 0.3s ease;
}
.overlay-fade-enter-from,
.overlay-fade-leave-to {
  opacity: 0;
}
.overlay-fade-enter-to,
.overlay-fade-leave-from {
  opacity: 1;
}

.slide-up-enter-active,
.slide-up-leave-active {
  transition:
    transform 0.3s ease,
    opacity 0.3s ease;
}
.slide-up-enter-from,
.slide-up-leave-to {
  transform: translateY(100px);
  opacity: 0;
}
.slide-up-enter-to,
.slide-up-leave-from {
  transform: translateY(0);
  opacity: 1;
}
</style>
