<template>
  <div ref="container" class="planet-attack-scene">
    <!-- Планета -->
    <img ref="planetEl" :src="planetSrc" alt="Planet" class="planet-img" />
    <!-- Canvas для взрывов -->
    <canvas ref="canvas" class="explosion-canvas"></canvas>
    <!-- НЛО -->
    <img ref="ufoEl" :src="ufoSrc" alt="UFO" class="ufo" />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, watch, defineProps } from 'vue'
import explosionSrc from '@/shared/assets/planets/expose.png'

// Props: текущий уровень и фиксированные точки с опциями
const props = defineProps<{
  currentLevel: number
  fixedPoints: Array<{ x: number; y: number; rotation?: number; scale?: number }>
  planetSrc: string
  ufoSrc: string
}>()

const { planetSrc, ufoSrc } = props

// Refs на контейнер, canvas и НЛО
const container = ref<HTMLDivElement | null>(null)
const canvas = ref<HTMLCanvasElement | null>(null)
const ufoEl = ref<HTMLImageElement | null>(null)
let ctx: CanvasRenderingContext2D | null = null

// Картинка-взрыв
const explosionImg = new Image()
explosionImg.src = explosionSrc

// Анимация взрывов: активные и постоянные
interface ActiveExpl {
  x: number
  y: number
  rotation: number
  scale: number
  start: number
}
const activeExplosions = ref<ActiveExpl[]>([])
const persistentExplosions = ref<Array<{ x: number; y: number; rotation: number; scale: number }>>(
  [],
)

const EXP_DUR = 800
const EXP_SIZE = 100

// Добавляем анимацию взрыва и сохраняем навсегда
function triggerExplosionAt(px: number, py: number, rot = 0, scl = 1) {
  const now = performance.now()
  activeExplosions.value.push({ x: px, y: py, rotation: rot, scale: scl, start: now })
  persistentExplosions.value.push({ x: px, y: py, rotation: rot, scale: scl })
}

// Рендер-цикл для canvas
let rafId: number
function loop() {
  if (!ctx || !container.value) return
  const { width, height } = container.value.getBoundingClientRect()
  ctx.clearRect(0, 0, width, height)

  // Постоянные взрывы
  ctx.globalAlpha = 1
  for (const e of persistentExplosions.value) {
    ctx.save()
    ctx.translate(e.x, e.y)
    ctx.rotate(((e.rotation ?? 0) * Math.PI) / 180)
    ctx.scale(e.scale ?? 1, e.scale ?? 1)
    ctx.drawImage(explosionImg, -EXP_SIZE / 2, -EXP_SIZE / 2, EXP_SIZE, EXP_SIZE)
    ctx.restore()
  }

  // Активные взрывы с анимацией
  const now = performance.now()
  activeExplosions.value = activeExplosions.value.filter((exp) => {
    const t = (now - exp.start) / EXP_DUR
    if (t >= 1) return false
    const p = 1 - Math.pow(1 - t, 2)
    const size = p * EXP_SIZE * exp.scale
    ctx.save()
    ctx.translate(exp.x, exp.y)
    ctx.rotate(((exp.rotation ?? 0) * Math.PI) / 180)
    ctx.globalAlpha = 1 - t
    ctx.drawImage(explosionImg, -size / 2, -size / 2, size, size)
    ctx.restore()
    return true
  })

  rafId = requestAnimationFrame(loop)
}

onMounted(() => {
  if (canvas.value && container.value) {
    const { width, height } = container.value.getBoundingClientRect()
    canvas.value.width = width
    canvas.value.height = height
    ctx = canvas.value.getContext('2d')
    explosionImg.onload = () => loop()
  }
})

onBeforeUnmount(() => cancelAnimationFrame(rafId))

// Анимация НЛО (Web Animations API)
async function animateUfoTo(px: number, py: number) {
  if (!ufoEl.value || !container.value) return
  const rect = container.value.getBoundingClientRect()
  const startY = rect.height / 2 - ufoEl.value.clientHeight / 2

  // Начальное положение за левым краем
  ufoEl.value.style.transform = `translate(${-ufoEl.value.clientWidth}px, ${startY}px)`

  // Полёт к точке
  await ufoEl.value.animate(
    [
      { transform: `translate(${-ufoEl.value.clientWidth}px, ${startY}px)` },
      {
        transform: `translate(${px - ufoEl.value.clientWidth / 2}px, ${py - ufoEl.value.clientHeight / 2}px)`,
      },
    ],
    { duration: 800, easing: 'ease-in-out', fill: 'forwards' },
  ).finished

  // Триггерим canvas-взрыв с ротацией и масштабом из fixedPoints
  const idx = props.currentLevel - 1
  const fp = props.fixedPoints[idx]
  const rot = fp.rotation ?? 0
  const scl = fp.scale ?? 1
  triggerExplosionAt(px, py, rot, scl)

  // Ждём завершения анимации взрыва
  await new Promise((r) => setTimeout(r, EXP_DUR))

  // Отлет обратно вправо
  await ufoEl.value.animate(
    [
      {
        transform: `translate(${px - ufoEl.value.clientWidth / 2}px, ${py - ufoEl.value.clientHeight / 2}px)`,
      },
      { transform: `translate(${rect.width + ufoEl.value.clientWidth}px, ${startY}px)` },
    ],
    { duration: 800, easing: 'ease-in', fill: 'forwards' },
  ).finished
}

// При изменении уровня запускаем анимацию НЛО
watch(
  () => props.currentLevel,
  (lvl) => {
    const idx = lvl - 1
    if (idx < 0 || idx >= props.fixedPoints.length || !container.value) return
    const { width, height } = container.value.getBoundingClientRect()
    const p = props.fixedPoints[idx]
    const px = p.x * width
    const py = p.y * height
    animateUfoTo(px, py)
  },
)
</script>

<style scoped lang="scss">
.planet-attack-scene {
  position: relative;
  width: 310px;
  height: 310px;
}
.planet-img {
  display: block;
  width: 100%;
}
.explosion-canvas {
  position: absolute;
  inset: 0;
  pointer-events: none;
}
.ufo {
  position: absolute;
  top: 0;
  left: 0;
  width: 280px;
  height: auto;
  will-change: transform;
}
</style>
