<template>
  <label class="checkbox" :class="{ disabled }">
    <input
      type="checkbox"
      class="checkbox__input"
      :disabled="disabled"
      :checked="modelValue"
      @change="$emit('update:modelValue', $event.target.checked)"
    />
    <div class="checkbox__check" :class="{ error }">
      <svg
        width="12"
        height="9"
        viewBox="0 0 12 9"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M11 1L4.125 7.875L1 4.75"
          stroke="#fff"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </div>
    <span class="checkbox__label">
      <slot></slot>
    </span>
  </label>
</template>

<script>
export default {
  emits: ["update:modelValue"],
  props: {
    disabled: Boolean,
    modelValue: Boolean,
    error: Boolean,
  },
};
</script>

<style scoped lang="scss">
.checkbox {
  display: flex;
  gap: 12px;

  &__input {
    display: none;
  }

  &__check {
    min-width: 18px;
    height: 18px;
    border-radius: 2px;
    border: 1px solid var(--border-color);
    background-color: #fff;
    transition: 0.2s;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;

    &.error {
      border-color: var(--error-color);
    }

    svg {
      opacity: 0;
    }

    &:hover {
      border-color: var(--primary-dark-color);
    }
    &:active {
      border-color: var(--primary-dark-color);
      outline: 3px solid #c8d5ff;
    }
  }

  &:not(.disabled) &__input:checked + &__check {
    border-color: var(--primary-color);
    background-color: var(--primary-color);

    svg {
      opacity: 1;
    }

    &:hover {
      background-color: var(--primary-dark-color);
    }
    &:active {
      background-color: var(--primary-dark-color);
    }
  }

  &__label {
    font-size: 14px;
    font-weight: 400;
    line-height: 20px;
    color: var(--text-color);
  }

  &.disabled &__check {
    background-color: var(--disabled-color);
    cursor: not-allowed;
    border-color: var(--border-color);
    outline: none;

    path {
      stroke: var(--border-color);
    }
  }
  &.disabled &__label {
    color: var(--text-2-color);
  }
}
</style>
