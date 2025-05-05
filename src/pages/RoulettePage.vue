<script setup lang="ts">
import { ref, nextTick } from 'vue'
import { Swiper, SwiperSlide } from 'swiper/vue'
import type { Swiper as SwiperClass } from 'swiper'
import 'swiper/css'
import UiButton from '@/shared/ui/UiButton.vue'
import SpinPriceCard from '@/entities/SpinPriceCard.vue'
import DailyDrawBanner from '@/features/DailyDrawBanner.vue'

interface Prize {
  id: number
  image: string
  title: string
}

const baseItems = ref<Prize[]>([
  { id: 1, image: 'https://nft.fragment.com/gift/deskcalendar-112312.webp', title: 'PEPE' },
  { id: 2, image: 'https://nft.fragment.com/gift/deskcalendar-112313.webp', title: 'HAPPY' },
  { id: 3, image: 'https://nft.fragment.com/gift/lolpop-260968.webp', title: 'COIN' },
  { id: 4, image: 'https://nft.fragment.com/gift/lolpop-26968.webp', title: 'ROCKET' },
  { id: 5, image: 'https://nft.fragment.com/gift/bdaycandle-107118.webp', title: 'DIAMOND' },
])

const CYCLE = baseItems.value.length

const slides = ref<(Prize & { _uid: string })[]>([])
const INITIAL_LOOPS = 40
const CENTRAL_OFFSET_CYCLES = 10
let initialized = false

function pushLoops(loopCount: number) {
  const start = slides.value.length / CYCLE
  for (let i = start; i < start + loopCount; i++) {
    slides.value.push(
      ...baseItems.value.map((p) => ({
        ...p,
        _uid: `${i}-${p.id}-${Date.now()}`,
      })),
    )
  }
}

pushLoops(INITIAL_LOOPS)

const swiperRef = ref<SwiperClass | null>(null)
function initSwiper(s: SwiperClass) {
  swiperRef.value = s
  nextTick(() => {
    if (!initialized) {
      const index = CENTRAL_OFFSET_CYCLES * CYCLE
      s.slideTo(index, 0)
      initialized = true
    }
  })
}

const isSpinning = ref(false)

async function spin() {
  if (isSpinning.value || !swiperRef.value) return
  isSpinning.value = true

  try {
    const { prize_id }: { prize_id: number } = await (
      await fetch('https://twinbyai.ru/spin')
    ).json()

    const winIndexInCycle = baseItems.value.findIndex((p) => p.id === prize_id)
    if (winIndexInCycle === -1) throw new Error(`Unknown prize_id ${prize_id}`)

    let currentActive = swiperRef.value.activeIndex || 0
    const leftGap = currentActive
    const rightGap = slides.value.length - currentActive

    const SAFE_MARGIN = CYCLE * 5

    if (leftGap < SAFE_MARGIN || rightGap < SAFE_MARGIN) {
      const normalized = CENTRAL_OFFSET_CYCLES * CYCLE + (currentActive % CYCLE)
      swiperRef.value.slideTo(normalized, 0)
      currentActive = normalized
    }

    const PASSES = 8

    const needLength = currentActive + PASSES * CYCLE + CYCLE + 2
    while (slides.value.length <= needLength) pushLoops(10)

    const deltaWithinCycle = (winIndexInCycle - (currentActive % CYCLE) + CYCLE) % CYCLE
    const targetIndex = currentActive + PASSES * CYCLE + deltaWithinCycle

    const randomNext = baseItems.value[Math.floor(Math.random() * baseItems.value.length)]
    slides.value[targetIndex + 1] = {
      ...randomNext,
      _uid: `rnd-${Date.now()}-${randomNext.id}`,
    }

    await nextTick()
    swiperRef.value.slideTo(targetIndex, 4500)

    const stop = () => {
      isSpinning.value = false
      swiperRef.value?.off('transitionEnd', stop)
    }
    swiperRef.value.on('transitionEnd', stop)
  } catch (e) {
    console.error('[roulette] spin error', e)
    isSpinning.value = false
  }
}
</script>

<template>
  <div class="page roulette-page">
    <div class="roulette-content">
      <h2 class="title title-1">Рулетка</h2>
      <DailyDrawBanner />
    </div>
    <div class="roulette-wrapper">
      <div class="roulette-marker" />

      <Swiper
        @swiper="initSwiper"
        class="roulette-swiper"
        :slides-per-view="3"
        :space-between="10"
        :centered-slides="true"
        :allow-touch-move="false"
      >
        <SwiperSlide v-for="s in slides" :key="s._uid" class="slide">
          <div class="card">
            <img :src="s.image" :alt="s.title" class="card-img" />
            <span class="card-title">{{ s.title }}</span>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>

    <div class="roulette-controls">
      <SpinPriceCard :price="10" />
      <UiButton class="spin-btn" :disabled="isSpinning" @click="spin">
        {{ isSpinning ? 'Крутим…' : 'Крутить' }}
      </UiButton>
    </div>
  </div>
</template>

<style scoped>
.roulette-content {
  padding: 0 16px;
}
.roulette-page {
  display: flex;
  justify-content: space-between;
  padding-right: 0;
  padding-left: 0;
}

.roulette-wrapper {
  position: relative;
  width: 100%;
  max-width: 560px;
  margin: 0 auto;
  padding: 20px 0 20px;
  background: #0b0d23;
  border-radius: 0px;
}

.roulette-marker {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 50%;
  width: 4px;
  background: #fff;
  transform: translateX(-50%);
  z-index: 10;
}

.roulette-swiper {
  overflow: hidden;
  padding: 0 32px;
}

.title {
  margin-bottom: 20px;
}

.slide {
  width: 140px !important;
  display: flex;
  justify-content: center;
}

.card {
  width: 100%;
  background: #1e203d;
  border-radius: 10px;
  padding: 6px;
  padding-bottom: 3px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.4);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.card-img {
  width: 128px;
  height: 128px;
  object-fit: contain;
  border-radius: 10px;
}

.card-title {
  margin-top: 4px;
  font-size: 16px;
  font-weight: 600;
  color: #fff;
}

.roulette-controls {
  padding: 16px;
  padding-bottom: 0;
}
</style>
