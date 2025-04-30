<script setup lang="ts">
import { ref } from 'vue'

interface CustomInput {
  type: 'max' | 'copy'
  maxValue?: number
}

interface UiInputProps {
  tip?: string
  error?: string
  custom?: CustomInput
}

const inputRef = ref<HTMLInputElement | null>(null)
const props = defineProps<UiInputProps>()

const handleMaxClick = () => {
  const v = props.custom?.maxValue?.toString() ?? ''
  if (inputRef.value) {
    inputRef.value.value = v
    // если нужен v-model, пробросьте emit:
    // emit('update:modelValue', v)
    inputRef.value.dispatchEvent(new Event('input'))
  }
}
</script>

<template>
  <div class="ui-input">
    <div v-if="tip" class="ui-input-tip">{{ tip }}</div>
    <div class="ui-input-wrapper">
      <input ref="inputRef" v-bind="$attrs" />
      <div class="ui-input-custom">
        <button v-if="custom?.type === 'max'" @click="handleMaxClick" class="max-value">
          <svg
            width="10"
            height="10"
            viewBox="0 0 10 10"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g clip-path="url(#clip0_142_3873)">
              <path
                d="M5 0C2.23875 0 0 2.23875 0 5C0 7.76125 2.23875 10 5 10C7.76125 10 10 7.76125 10 5C10 2.23875 7.76125 0 5 0ZM3.2925 2.79042H6.7075C7.33458 2.79042 7.73333 3.46875 7.41792 4.01542L5.31 7.6675C5.27851 7.72182 5.23329 7.76691 5.17888 7.79826C5.12448 7.8296 5.06279 7.8461 5 7.8461C4.93721 7.8461 4.87552 7.8296 4.82112 7.79826C4.76671 7.76691 4.72149 7.72182 4.69 7.6675L2.58292 4.01542C2.26708 3.46792 2.665 2.79042 3.2925 2.79042ZM5.31083 3.41375V6.57208L5.77 5.68542L6.87667 3.70375C6.89361 3.67415 6.90244 3.6406 6.90227 3.60649C6.90209 3.57239 6.89292 3.53893 6.87567 3.50951C6.85842 3.48008 6.83371 3.45573 6.80403 3.43892C6.77436 3.42211 6.74077 3.41342 6.70667 3.41375H5.31083ZM3.29167 3.41458C3.25763 3.41421 3.22411 3.42284 3.19447 3.43958C3.16484 3.45632 3.14015 3.48058 3.1229 3.50992C3.10566 3.53926 3.09646 3.57264 3.09624 3.60667C3.09602 3.6407 3.10479 3.67419 3.12167 3.70375L4.22917 5.68458L4.68833 6.57208V3.41458H3.29167Z"
                fill="white"
              />
            </g>
            <defs>
              <clipPath id="clip0_142_3873">
                <rect width="10" height="10" fill="white" />
              </clipPath>
            </defs>
          </svg>
          MAX
        </button>
        <button v-if="custom?.type === 'copy'" class="copy">
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g clip-path="url(#clip0_142_4097)">
              <path
                d="M13.332 5.33594H6.66536C5.92898 5.33594 5.33203 5.93289 5.33203 6.66927V13.3359C5.33203 14.0723 5.92898 14.6693 6.66536 14.6693H13.332C14.0684 14.6693 14.6654 14.0723 14.6654 13.3359V6.66927C14.6654 5.93289 14.0684 5.33594 13.332 5.33594Z"
                stroke="white"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M2.66536 10.6693C1.93203 10.6693 1.33203 10.0693 1.33203 9.33594V2.66927C1.33203 1.93594 1.93203 1.33594 2.66536 1.33594H9.33203C10.0654 1.33594 10.6654 1.93594 10.6654 2.66927"
                stroke="white"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </g>
            <defs>
              <clipPath id="clip0_142_4097">
                <rect width="16" height="16" fill="white" />
              </clipPath>
            </defs>
          </svg>
        </button>
      </div>
    </div>
    <div v-if="custom?.type === 'max'" class="max-value-available">
      <span>Доступно:</span>
      <span>{{ custom?.maxValue || 0 }}</span>
    </div>
    <div v-if="error" class="ui-input-error">{{ error }}</div>
  </div>
</template>

<style scoped lang="scss">
.ui-input {
  &-tip {
    font-weight: 400;
    font-size: 12px;
    color: rgba(255, 255, 255, 0.7);
    margin-bottom: 7px;
  }
  &-wrapper {
    max-width: 100%;
    width: 100%;
    position: relative;
  }
  &-error {
    font-weight: 300;
    font-size: 14px;
    color: #f48d96;
    margin-top: 5px;
    text-align: center;
  }
  &-custom {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    right: 10px;

    .copy {
      width: 24px;
      height: 24px;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .max-value {
      color: rgba(255, 255, 255, 0.44);
      font-size: 14px;
      display: flex;
      align-items: center;
      gap: 5px;
    }
  }
  .max-value-available {
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 14px;
    font-weight: 300;
    margin-top: 5px;
  }
  input {
    border-radius: 8px;
    max-width: 100%;
    width: 100%;
    padding: 12px 10px;
    background: rgba(255, 255, 255, 0.1);
    font-size: 13px;
    font-weight: 400;
    border: 1px solid #32315f;
    outline: none;
    color: var(--font);

    &:focus {
      border: 1px solid var(--accent);
    }

    &::placeholder {
      color: rgba(255, 255, 255, 0.44);
    }
  }
}
</style>
