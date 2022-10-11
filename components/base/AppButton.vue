<template>
  <component
    :is="tag"
    :expanded="expanded"
    class="leading-relaxed font-medium flex items-center justify-center cursor-pointer border shadow focus:outline-none rounded-md"
    :class="[
      btnClass,
      {
        [`bg-${color}-600 text-${color}-100 border-${color}-600 hover:bg-${color}-700 hover:border-${color}-700 hover:text-white`]:
          color && !outline,
        [`border-${color}-600 bg-white text-${color}-600 hover:bg-${color}-600 hover:border-${color}-600 hover:text-white`]:
          outline,
        [`py-2 text-sm ${icon ? 'px-2' : 'px-4'}`]: size === 'sm',
        [`py-2 ${icon ? 'px-3' : 'px-6'}`]: size === 'md',
        [`py-4 text-lg ${icon ? 'px-4' : 'px-12'}`]: size === 'lg',
        'rounded-full': round,
      },
    ]"
    v-bind="$attrs"
    v-on="$listeners"
  >
    <slot></slot>
  </component>
</template>
<script>
export default {
  inheritAttrs: false,

  props: {
    tag: {
      type: String,
      default: 'button',
    },
    expanded: {
      type: Boolean,
      default: false,
    },
    color: {
      type: String,
      default: 'teal',
    },
    size: {
      type: String,
      default: 'md', // sm, md, lg
    },
    outline: Boolean,
    icon: Boolean,
    round: Boolean,
  },

  computed: {
    btnClass() {
      return {
        'w-full': this.expanded === true,
      }
    },
  },
}
</script>
