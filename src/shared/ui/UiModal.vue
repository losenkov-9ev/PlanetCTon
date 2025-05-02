<script setup lang="ts">
import { defineProps, defineEmits, computed, ref, watch, onMounted, onBeforeUnmount } from 'vue'
import CloseIcon from '@/shared/assets/icons/close.svg'

interface UiModalProps {
  modelValue: boolean
  title: string
}

const props = defineProps<UiModalProps>()
const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
}>()

const titleId = computed(() => `modal-title-${Math.random().toString(36).substr(2, 9)}`)

// Оффсет для сдвига при появлении клавиатуры
const keyboardOffset = ref(0)

// Обновляем оффсет: используем visualViewport.offsetTop или fallback
function updateOffset() {
  if (window.visualViewport) {
    // offsetTop растёт при поднятии контента браузером над клавиатурой
    keyboardOffset.value = window.visualViewport.offsetTop || 0
  } else {
    // fallback: разница между высотой layout viewport и window.innerHeight
    const diff = document.documentElement.clientHeight - window.innerHeight
    keyboardOffset.value = diff > 0 ? diff : 0
  }
}

// Навешиваем/снимаем слушатели только при открытой модалке
function attachListeners() {
  if (window.visualViewport) {
    window.visualViewport.addEventListener('resize', updateOffset)
    window.visualViewport.addEventListener('scroll', updateOffset)
  } else {
    window.addEventListener('resize', updateOffset)
  }
}
function detachListeners() {
  if (window.visualViewport) {
    window.visualViewport.removeEventListener('resize', updateOffset)
    window.visualViewport.removeEventListener('scroll', updateOffset)
  } else {
    window.removeEventListener('resize', updateOffset)
  }
}

// Следим за открытием/закрытием
watch(
  () => props.modelValue,
  (open) => {
    if (open) {
      updateOffset()
      attachListeners()
    } else {
      keyboardOffset.value = 0
      detachListeners()
    }
  },
)

// Закрытие
function close() {
  emit('update:modelValue', false)
}
// ESC для закрытия
function onKeydown(e: KeyboardEvent) {
  if (e.key === 'Escape' && props.modelValue) close()
}

onMounted(() => {
  window.addEventListener('keydown', onKeydown)
})
onBeforeUnmount(() => {
  window.removeEventListener('keydown', onKeydown)
  detachListeners()
})
</script>

<template>
  <Teleport to="body">
    <Transition name="overlay-fade">
      <div v-if="modelValue" class="modal-overlay" @click.self="close" />
    </Transition>

    <Transition name="slide-up">
      <div
        v-if="modelValue"
        class="modal-wrapper"
        :style="{ bottom: keyboardOffset + 'px' }"
        role="dialog"
        aria-modal="true"
        :aria-labelledby="titleId"
      >
        <div class="modal-window">
          <button @click="close" class="modal-close">
            <CloseIcon />
          </button>
          <header class="modal-header">
            <h2 class="title-1" :id="titleId">{{ title }}</h2>
          </header>
          <section class="modal-body">
            <slot />
          </section>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped lang="scss">
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1500;
  pointer-events: auto;
}

.modal-wrapper {
  position: fixed;
  inset: 0;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  overflow: auto;
  z-index: 2000;
  pointer-events: none;
  /* bottom будет переопределён динамически */
}

.modal-header {
  text-align: center;
  margin-bottom: 20px;
}

.modal-close {
  position: absolute;
  top: 8px;
  right: 8px;
  svg {
    transform: scale(0.8);
  }
}

.modal-window {
  position: relative;
  pointer-events: auto;
  background: #1e2237;
  border-top: 5px solid var(--accent);
  padding: 16px;
  padding-bottom: calc(30px + env(safe-area-inset-bottom));
  width: 100%;
  max-width: 500px;
  border-radius: 20px 20px 0 0;
  box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1);
  max-height: 95vh;
  overflow: auto;
}

/* Плавное появление/исчезновение фона */
.overlay-fade-enter-active,
.overlay-fade-leave-active {
  transition: opacity 0.4s ease;
}
.overlay-fade-enter-from,
.overlay-fade-leave-to {
  opacity: 0;
}
.overlay-fade-enter-to,
.overlay-fade-leave-from {
  opacity: 1;
}

/* Слайд при монтировании */
.slide-up-enter-active,
.slide-up-leave-active {
  transition: transform 0.4s ease;
}
.slide-up-enter-from,
.slide-up-leave-to {
  transform: translateY(100%);
}
.slide-up-enter-to,
.slide-up-leave-from {
  transform: translateY(0);
}
</style>
