<script setup lang="ts"></script>

<template>
  <div class="ui-input">
    <div class="ui-input-tip">TON wallet address</div>
    <div class="ui-input-wrapper">
      <input v-bind="$attrs" />
      <slot />
    </div>
    <div class="ui-input-error">*Обязательно при переводе укажите комментарий MEMO</div>
  </div>
</template>

<style scoped lang="scss">
.ui-input {
  &-wrapper {
    max-width: 100%;
    width: 100%;
  }
}
</style>
