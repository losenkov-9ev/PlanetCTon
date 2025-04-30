<script setup lang="ts">
import { defineProps, defineEmits, toRef } from 'vue'
import UiButton from '@/shared/ui/UiButton.vue'
import UiDialog from '@/shared/ui/UiDialog.vue'

interface CongratsDialogProps {
  modelValue: boolean
}
interface CongratsDialogEmits {
  (e: 'update:modelValue', v: boolean): void
}

const props = defineProps<CongratsDialogProps>()
const emit = defineEmits<CongratsDialogEmits>()

const visible = toRef(props, 'modelValue')

function close() {
  emit('update:modelValue', false)
}
</script>

<template>
  <UiDialog v-model="visible">
    <div class="congrats-modal">
      <h2 class="modal-title title-1">Поздравляем!</h2>
      <p class="modal-text">Вы успешно атаковали планету!</p>
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
  background-image: url('@/shared/assets/bg/dialog-bg.jpg');

  .modal-title {
    margin-bottom: 6px;
  }
  .modal-text {
    margin-bottom: 18px;
  }
}
</style>
