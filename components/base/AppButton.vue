<template>
  <component
    :is="tag"
    :expanded="expanded"
    class="leading-relaxed font-medium items-center justify-center border focus:outline-none rounded inline-flex"
    :class="[
      btnClass,
      {
        [`bg-${color}-600 text-${color}-100 border-${color}-600 hover:bg-${color}-700 hover:border-${color}-700 hover:text-white`]:
          color && !outline && !variant,
        [`border-${color}-600 bg-white text-${color}-600 hover:bg-${color}-600 hover:border-${color}-600 hover:text-white`]:
          outline && !variant,
        [`py-2 text-sm ${icon ? 'px-2' : 'px-4'}`]: size === 'sm',
        [`py-2 ${icon ? 'px-3' : 'px-6'}`]: size === 'md',
        [`py-4 text-lg ${icon ? 'px-4' : 'px-12'}`]: size === 'lg',
        'rounded-full': round,
      },
    ]"
    v-bind="$attrs"
    v-on="$listeners"
  >
    <template v-if="isLoading"><AppLoading /> Processing...</template>
    <slot v-else></slot>
  </component>
</template>
<script>
import AppLoading from '~/assets/svg/loading.svg?inline'
export default {
  components: { AppLoading },
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
      default: 'md',
    },
    variant: {
      type: String,
      default: 'primary', //primary, info, warning, danger
    },
    outline: Boolean,
    icon: Boolean,
    round: Boolean,
    isLoading: Boolean,
  },
  computed: {
    btnClass() {
      return {
        'w-full': this.expanded === true,
        //isLoading
        'cursor-not-allowed inline-flex': this.isLoading,
        'cursor-pointer flex': !this.isLoading,
        //button variant
        'bg-primary text-black hover:bg-yellow-500 shadow font-medium rounded text-md p-3.5 border-primary':
          this.variant === 'primary',
        'bg-red-700 text-white hover:bg-red-800 shadow font-medium rounded text-md p-3.5 border-red-700':
          this.variant === 'danger',
        'bg-blue-700 text-white hover:bg-blue-800 shadow font-medium rounded text-md p-3.5 border-blue-700':
          this.variant === 'info',
        'text-black hover:text-blue-700 bg-transparent border-0 hover:bg-gray-200':
          this.variant === 'link',
      }
    },
  },
}
</script>
