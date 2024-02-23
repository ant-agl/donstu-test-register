<template>
  <div class="select" :class="{ open }">
    <h6 v-if="label" class="select__label">{{ label }}</h6>
    <div class="select__wrapper" ref="select">
      <input
        type="text"
        :placeholder="placeholder"
        :value="value"
        :disabled="disabled"
        :class="{ error, success }"
        readonly
        @click="open = !open"
        @input="$emit('update:modelValue', $event.target.value.trim())"
      />
      <img src="@/assets/img/icons/chevron-down.svg" class="select__icon" />

      <div class="select__list">
        <div
          v-for="item in list"
          :key="item.id"
          class="select__item"
          :class="{ active: item.id === modelValue }"
          @click="
            $emit('update:modelValue', item.id);
            open = false;
          "
        >
          {{ item.label }}
        </div>
      </div>
    </div>
    <p v-if="errorText" class="select__error">{{ errorText }}</p>
  </div>
</template>

<script>
export default {
  emits: ["update:modelValue"],
  props: {
    label: String,
    placeholder: String,
    modelValue: [String, Number],
    disabled: Boolean,
    success: Boolean,
    error: Boolean,
    errorText: String,
    list: {
      type: Array,
      default: () => [],
    },
  },
  data: () => ({
    open: false,
  }),
  computed: {
    value() {
      let selected = this.list.find((i) => i.id === this.modelValue);
      if (!selected) return "";
      return selected.label;
    },
  },
  methods: {
    closeSelect(e) {
      if (!this.$refs.select.contains(e.target)) this.open = false;
    },
  },
  mounted() {
    document.body.addEventListener("click", this.closeSelect);
  },
  unmounted() {
    document.body.removeEventListener("click", this.closeSelect);
  },
};
</script>

<style scoped lang="scss">
.select {
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
    padding-right: 44px;
    border: 1px solid var(--border-color);
    border-radius: 5px;
    transition: 0.2s;
    width: 100%;
    cursor: pointer;

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
    transition: 0.3s;
  }
  &__error {
    font-size: 12px;
    font-weight: 400;
    line-height: 18px;
    color: var(--error-color);
  }

  &__list {
    position: absolute;
    top: calc(100% + 8px);
    left: 0;
    right: 0;
    width: 100%;
    border-radius: 5px;
    border: 1px solid var(--primary-color);
    overflow-y: auto;
    background-color: #fff;
    max-height: 250px;
    transition: 0.2s;
    opacity: 0;
    transform: scaleY(0);
    transform-origin: top;
  }
  &__item {
    padding: 16px 12px;
    font-size: 16px;
    font-weight: 400;
    line-height: 24px;
    color: var(--text-color);
    transition: 0.2s;
    cursor: pointer;

    &:not(.active):hover {
      background-color: #f9f9f9;
    }

    &.active {
      background-color: var(--primary-blind-color);
      color: var(--primary-color);
    }
  }

  &.open &__icon {
    transform: rotate(180deg);
  }
  &.open &__list {
    opacity: 1;
    transform: scaleY(1);
  }
}
</style>
