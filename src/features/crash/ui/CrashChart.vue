<script lang="ts" setup>
import { ref, onMounted, watch, nextTick } from 'vue'
import LineIcon from '../assets/line.svg'
import type { VueInstance } from '@vueuse/core'

const props = defineProps<{ status: boolean }>()

// ссылка на DOM-обёртку
const wrapper = ref<HTMLElement | null>(null)
const lineComp = ref<VueInstance | null>(null)

const finalLinePos = ref({ top: 0, left: 0 })
const ufoPos = ref({ top: -999, left: -999 })

// Флаг для запуска «покачивания» НЛО
const ufoBob = ref(false)

// Массив звёзд
interface Star {
  id: number
  top: number
  left: number
  size: number
  opacity: number
  duration: number
  delay: number
}
const stars = ref<Star[]>([])

function getRelativePosition(el: HTMLElement, parent: HTMLElement) {
  const e = el.getBoundingClientRect()
  const p = parent.getBoundingClientRect()
  const style = getComputedStyle(parent)
  const padL = parseFloat(style.paddingLeft)
  const padT = parseFloat(style.paddingTop)
  const bL = parseFloat(style.borderLeftWidth)
  const bT = parseFloat(style.borderTopWidth)
  return {
    top: e.top - p.top - padT - bT,
    left: e.right - p.left - padL - bL,
  }
}

async function precomputeLine() {
  await nextTick()
  if (!wrapper.value || !lineComp.value) return

  const lineEl = lineComp.value.$el as HTMLElement
  if (!lineEl) return

  // временно без анимации, чтобы вычислить финальную позицию
  lineEl.style.transition = 'none'
  lineEl.style.opacity = '0'
  lineEl.classList.add('show')
  await nextTick()
  finalLinePos.value = getRelativePosition(lineEl, wrapper.value)

  // возвращаем как было
  lineEl.classList.remove('show')
  lineEl.style.opacity = ''
  nextTick(() => {
    lineEl.style.transition = 'all 1s'
  })
}

onMounted(precomputeLine)

watch(
  () => props.status,
  async (show) => {
    // сбрасываем поле
    stars.value = []
    ufoBob.value = false

    if (show && wrapper.value && lineComp.value) {
      const lineEl = lineComp.value.$el as HTMLElement

      // стартовая позиция НЛО
      const wr = wrapper.value.getBoundingClientRect()
      ufoPos.value = {
        top: wr.bottom - wr.top - 50,
        left: 0,
      }

      // растём линия
      lineEl.classList.add('show')
      await nextTick()
      // перемещаем НЛО в конец линии
      ufoPos.value = finalLinePos.value

      // спустя 3 секунды запускаем и звёзды, и «покачивание» НЛО
      setTimeout(() => {
        if (!wrapper.value) return

        // генерируем звёзды
        const w = wrapper.value.clientWidth
        const h = wrapper.value.clientHeight
        const count = 30
        stars.value = Array.from({ length: count }, (_, i) => ({
          id: i,
          left: Math.random() * w * 2,
          top: Math.random() * h,
          size: 2 + Math.random() * 6, // 2–8px
          opacity: 0.3 + Math.random() * 0.7, // 0.3–1.0
          duration: 4 + Math.random() * 6, // 4–10s
          delay: Math.random() * 3, // 0–3s задержки
        }))

        // запускаем «покачивание» НЛО
        ufoBob.value = true
      }, 1000)
    } else {
      // сброс при закрытии
      lineComp.value?.$el.classList.remove('show')
      ufoPos.value = { top: -999, left: -999 }
      ufoBob.value = false
    }
  },
  { immediate: true },
)
</script>

<template>
  <img
    class="ufo"
    :class="{ show: props.status, bob: ufoBob }"
    src="@/shared/assets/icons/crash-ufo.png"
    alt="ufo"
    :style="{ top: `${ufoPos.top}px`, left: `${ufoPos.left - 50}px` }"
  />
  <div class="chart-wrapper" ref="wrapper">
    <LineIcon ref="lineComp" class="line" />

    <!-- контейнер для звёзд -->
    <div class="stars">
      <svg
        v-for="star in stars"
        :key="star.id"
        class="star"
        :style="{
          top: star.top + 'px',
          left: star.left + 'px',
          width: star.size + 'px',
          height: star.size + 'px',
          opacity: star.opacity,
          animationDuration: star.duration + 's',
          animationDelay: star.delay + 's',
        }"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <polygon points="12,2 15,9 22,9 17,14 18.5,21 12,17 5.5,21 7,14 2,9 9,9" fill="white" />
      </svg>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.chart-wrapper {
  height: 200px;
  position: relative;
  overflow: hidden;

  .line {
    opacity: 1;
    transition: all 1s;
    position: absolute;
    bottom: 0;
    left: 0;
    width: 0%;
    height: 0;

    &.show {
      width: 80%;
      height: auto;
    }
  }
}

.ufo {
  position: absolute;
  opacity: 0;
  transition: all 2s ease-out;
  z-index: 10;
  width: 120px;

  &.show {
    opacity: 1;
  }

  /* «Покачивание» вверх-вниз */
  &.bob {
    animation: ufo-bob 4s ease-in-out infinite;
  }
}

/* Анимация звёзд */
.stars {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;

  .star {
    position: absolute;
    animation-name: fly-left;
    animation-timing-function: linear;
    animation-iteration-count: infinite;
  }
}

@keyframes fly-left {
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(-120vw);
  }
}

@keyframes ufo-bob {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
}
</style>
