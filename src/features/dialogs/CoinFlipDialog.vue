<script setup lang="ts">
import { defineProps, defineEmits } from 'vue'
import UiButton from '@/shared/ui/UiButton.vue'
import UiDialog from '@/shared/ui/UiDialog.vue'

interface Props {
  modelValue: boolean
  text?: string
  status: 'win' | 'lose'
}
const props = withDefaults(defineProps<Props>(), {
  text: 'Вы успешно атаковали планету!',
})

const emit = defineEmits<{
  (e: 'update:modelValue', v: boolean): void
}>()

function close() {
  emit('update:modelValue', false)
}
</script>

<template>
  <UiDialog :model-value="props.modelValue" @update:modelValue="emit('update:modelValue', $event)">
    <div :class="['congrats-modal', status]">
      <h2 class="modal-title title-1">{{ text }}</h2>
      <UiButton @click="close" color="accent" class="congrats-modal-btn"> Продолжить </UiButton>
    </div>
  </UiDialog>
</template>

<style scoped lang="scss">
@use '@/app/styles/mixins' as mixins;
.congrats-modal {
  background: #1e2237;
  border-radius: 16px;
  padding: 24px;
  text-align: center;
  max-width: 100%;
  width: 100%;
  border: 1px solid #32315f;
  @include mixins.bg-cover;

  &.win {
    background-image: url('@/shared/assets/bg/level-card-bg.png');
    background-position: 70% bottom;
  }
  &.lose {
    background-image: url('@/shared/assets/bg/false-transaction.png');
    background-position: 70% bottom;
  }

  .modal-title {
    margin-bottom: 12px;
  }
}
</style>
