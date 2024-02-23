<template>
  <button type="submit" class="btn" :disabled="disabled">
    <slot></slot>
  </button>
</template>

<script>
export default {
  props: {
    disabled: Boolean,
  },
};
</script>

<style scoped lang="scss">
.btn {
  text-transform: uppercase;
  color: #fff;
  padding: 14px 32px;
  font-size: 14px;
  font-weight: 600;
  line-height: 18px;
  border-radius: 10px;
  background-color: var(--primary-color);
  border: none;
  cursor: pointer;
  transition: 0.2s;
  &:hover {
    background-color: var(--primary-dark-color);
  }
  &:active {
    background-color: var(--primary-light-color);
  }
  &:disabled {
    background-color: var(--disabled-color);
    color: var(--text-2-color);
    cursor: not-allowed;
  }
}
</style>
