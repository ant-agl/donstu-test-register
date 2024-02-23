<template>
  <div class="input">
    <h6 v-if="label" class="input__label">{{ label }}</h6>
    <div class="input__wrapper">
      <input
        v-if="type == 'tel'"
        :type="type"
        :placeholder="placeholder"
        :value="modelValue"
        :disabled="disabled"
        :class="{ error, success }"
        :style="{ paddingRight }"
        v-mask="'+7 ### ### ## ##'"
        @input="$emit('update:modelValue', $event.target.value.trim())"
      />
      <input
        v-else
        :type="type"
        :placeholder="placeholder"
        :value="modelValue"
        :disabled="disabled"
        :class="{ error, success }"
        :style="{ paddingRight }"
        @input="$emit('update:modelValue', $event.target.value.trim())"
      />

      <img
        v-if="success"
        src="@/assets/img/icons/check.svg"
        class="input__icon"
      />
    </div>
    <p v-if="errorText" class="input__error">{{ errorText }}</p>
  </div>
</template>

<script>
import { mask } from "vue-the-mask";

export default {
  directives: { mask },
  emits: ["update:modelValue"],
  props: {
    type: {
      type: String,
      default: "text",
    },
    placeholder: String,
    label: String,
    modelValue: [String, Number],
    disabled: Boolean,
    success: Boolean,
    error: Boolean,
    errorText: String,
  },
  computed: {
    paddingRight() {
      return this.success ? "44px" : "12px";
    },
  },
};
</script>

<style scoped lang="scss">
.input {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 8px;

  &__label {
    font-size: 14px;
    font-weight: 400;
    line-height: 20px;
    color: var(--text-2-color);
  }

  input {
    font-size: 16px;
    font-weight: 400;
    line-height: 24px;
    color: #000;
    padding: 8px 12px;
    border: 1px solid var(--border-color);
    border-radius: 5px;
    transition: 0.2s;
    width: 100%;

    &::placeholder {
      color: var(--text-2-color);
    }

    &:hover:not(:disabled),
    &:focus {
      border-color: var(--primary-color);
      outline: none;
    }

    &.success {
      border-color: var(--success-color);
    }
    &.error {
      border-color: var(--error-color);
    }
    &:disabled {
      color: var(--text-2-color);
      background-color: var(--disabled-color);
    }
  }
  &__wrapper {
    position: relative;
    display: flex;
    align-items: center;
  }
  &__icon {
    position: absolute;
    right: 12px;
  }
  &__error {
    font-size: 12px;
    font-weight: 400;
    line-height: 18px;
    color: var(--error-color);
  }
}
</style>
