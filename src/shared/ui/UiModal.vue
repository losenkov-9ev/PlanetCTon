<!-- UiModal.vue -->
<script setup lang="ts">
import { defineProps, defineEmits, computed, ref, onMounted, onBeforeUnmount } from 'vue'
import CloseIcon from '@/shared/assets/icons/close.svg'

/* ------------------------------------------------------------------ */
/* props / emits                                                      */
/* ------------------------------------------------------------------ */
interface UiModalProps {
  /** управление видимостью */
  modelValue: boolean
  /** заголовок окна */
  title: string
}

const props = defineProps<UiModalProps>()
const emit = defineEmits<{ (e: 'update:modelValue', value: boolean): void }>()

/* ------------------------------------------------------------------ */
/* a11y: id для aria‑labelledby                                       */
/* ------------------------------------------------------------------ */
const titleId = computed(() => `modal-title-${Math.random().toString(36).slice(2, 11)}`)

/* ------------------------------------------------------------------ */
/* закрытие + Esc‑обработка                                           */
/* ------------------------------------------------------------------ */
function close() {
  emit('update:modelValue', false)
}

function onKeydown(e: KeyboardEvent) {
  if (e.key === 'Escape' && props.modelValue) close()
}

/* ------------------------------------------------------------------ */
/* «прилипание» к клавиатуре                                          */
/* ------------------------------------------------------------------ */
const offsetBottom = ref(0) // резервируемое снизу пространство
let detach: () => void // для удаления слушателей

onMounted(() => {
  window.addEventListener('keydown', onKeydown)

  /* Safari >= 17 умеет env(keyboard‑inset‑height) → JS не нужен */
  if (CSS.supports('height: env(keyboard-inset-height)')) return

  /* fallback для Telegram WKWebView, старых iOS, Android Chrome */
  let baseHeight = window.innerHeight

  const handler = () => {
    const delta = baseHeight - window.innerHeight // «ушедшие» px
    if (delta > 100) {
      // клавиатура открыта
      offsetBottom.value = delta
    } else {
      // закрыта / поворот
      baseHeight = window.innerHeight
      offsetBottom.value = 0
    }
  }

  window.addEventListener('resize', handler)
  window.addEventListener('orientationchange', handler)

  detach = () => {
    window.removeEventListener('resize', handler)
    window.removeEventListener('orientationchange', handler)
  }
})

onBeforeUnmount(() => {
  window.removeEventListener('keydown', onKeydown)
  detach?.()
})
</script>

<template>
  <Teleport to="body">
    <!-- затемнение -->
    <Transition name="overlay-fade">
      <div v-if="modelValue" class="modal-overlay" @click.self="close" />
    </Transition>

    <!-- само окно -->
    <Transition name="slide-up">
      <div
        v-if="modelValue"
        class="modal-wrapper"
        role="dialog"
        aria-modal="true"
        :aria-labelledby="titleId"
        :style="{ '--offset-bottom': offsetBottom + 'px' }"
      >
        <div class="modal-window">
          <button class="modal-close" @click="close"><CloseIcon /></button>

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
/* ====================== overlay ====================== */
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1500;
}

/* ====================== wrapper ====================== */
.modal-wrapper {
  position: fixed;
  inset: 0;
  display: flex;
  align-items: flex-end; /* «прижимаем» к низу */
  justify-content: center;
  overflow: auto;
  z-index: 2000;

  /* смещаем вверх ровно на высоту клавиатуры */
  padding-bottom: calc(
    env(keyboard-inset-height, 0px) + /* iOS 17+ */ var(--offset-bottom, 0px) /* JS‑fallback */
  );
}

/* ====================== window ======================= */
.modal-window {
  position: relative;
  width: 100%;
  max-width: 500px;
  padding: 16px 16px 30px;

  background: #1e2237;
  border-top: 5px solid var(--accent);
  border-radius: 20px 20px 0 0;
  box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1);

  overflow: auto;
  pointer-events: auto;

  /* ограничиваем высоту только видимым viewport’ом */
  max-height: 95vh; /* fallback */

  @supports (height: 100dvh) {
    max-height: 95dvh; /* современный mobile Safari / Chrome 115+ */
  }
}

/* ==================== close button =================== */
.modal-close {
  position: absolute;
  top: 8px;
  right: 8px;

  svg {
    transform: scale(0.8);
  }
}

/* ====================== header ======================= */
.modal-header h2 {
  text-align: center;
  margin-bottom: 20px;
}

/* ==================== animations ===================== */
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
