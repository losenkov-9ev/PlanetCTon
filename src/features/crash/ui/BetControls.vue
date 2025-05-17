<template>
  <div class="bet-controls">
    <div class="bet-controls-box">
      <div class="options">
        <label> <input type="checkbox" v-model="autoBet" /> Автоставка </label>
        <label> <input type="checkbox" v-model="autoCashout" /> Автовывод </label>
      </div>
      <div class="amount">
        <button @click="$emit('update:amount', (amount -= 0.1))">-</button>
        <UiInput
          class="bet-input"
          size="sm"
          placeholder="0.1"
          :value="amount.toFixed(2)"
          min="0.1"
          type="number"
          step="0.1"
        />
        <button @click="$emit('update:amount', (amount += 0.1))">+</button>
      </div>
    </div>

    <UiButton @click="$emit('bet')">Ставка</UiButton>
  </div>
</template>

<script lang="ts" setup>
import { ref, watch, defineEmits, defineProps } from 'vue'
import UiButton from '@/shared/ui/UiButton.vue'
import UiInput from '@/shared/ui/UiInput.vue'

type Props = {
  amount: number
}
const props = defineProps<Props>()
const emit = defineEmits(['update:amount', 'bet'])

const amount = ref(props.amount)
const autoBet = ref(false)
const autoCashout = ref(false)

watch(amount, (val) => emit('update:amount', parseFloat(val.toFixed(1))))
</script>

<style lang="scss" scoped>
.bet-controls {
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-top: 20px;
  padding-top: 20px;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  .bet-controls-box {
    display: flex;
    justify-content: space-between;
  }
  .amount {
    display: flex;
    align-items: center;
    gap: 8px;
    button {
      width: 32px;
      height: 32px;
      border-radius: 4px;
      background-color: var(--accent);
      font-size: 16px;
      display: flex;
      justify-content: center;
      align-items: center;
      font-weight: 700;
    }
    .bet-input {
      width: 60px;
      text-align: center;
    }
  }
  .options {
    display: flex;
    flex-direction: column;
    gap: 4px;
    justify-content: space-between;
  }
  .place-btn {
    width: 100%;
    padding: 12px;
    border: none;
    border-radius: 8px;
    font-size: 16px;
  }
}
</style>
