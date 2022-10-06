<template>
  <li
    class="text-gray-900 relative cursor-default select-none py-2 pl-3 pr-9 hover:bg-indigo-600 hover:text-white"
    role="option"
    @click="selectItem"
  >
    <slot />
  </li>
</template>

<script>
export default {
  props: {
    value: {
      type: [String, Number, Boolean, Object, Array, Function],
      default: null,
    },
    disabled: Boolean,
    custom: Boolean,
  },

  computed: {
    isClickable() {
      return !this.parent.disabled && !this.disabled && !this.custom
    },
    isActive() {
      if (this.parent.selected === null) return false
      if (this.parent.multiple) return this.parent.selected.includes(this.value)
      return this.value === this.parent.selected
    },
  },

  methods: {
    selectItem() {
      // eslint-disable-next-line no-console
      this.$parent.selectItem(this.value)
      this.$emit('click')
    },
  },
}
</script>
