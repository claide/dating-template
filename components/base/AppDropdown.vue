<template>
  <div ref="dropdown" class="relative">
    <button
      ref="trigger"
      type="button"
      class="relative w-full cursor-default rounded-md border border-slate-300 bg-slate-100 py-2.5 pl-3 pr-10 text-left shadow-sm focus:border-yellow-500 focus:outline-none focus:ring-1 focus:ring-yellow-500 sm:text-sm"
      aria-haspopup="listbox"
      aria-expanded="true"
      aria-labelledby="listbox-label"
      @click="onClick"
    >
      <span class="flex items-center">
        <span class="block truncate">
          <slot name="trigger" :active="isActive" />
        </span>
      </span>
      <span class="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
        <!-- Heroicon name: mini/chevron-up-down -->
        <svg
          class="h-5 w-5 text-slate-400"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path
            fill-rule="evenodd"
            d="M10 3a.75.75 0 01.55.24l3.25 3.5a.75.75 0 11-1.1 1.02L10 4.852 7.3 7.76a.75.75 0 01-1.1-1.02l3.25-3.5A.75.75 0 0110 3zm-3.76 9.2a.75.75 0 011.06.04l2.7 2.908 2.7-2.908a.75.75 0 111.1 1.02l-3.25 3.5a.75.75 0 01-1.1 0l-3.25-3.5a.75.75 0 01.04-1.06z"
            clip-rule="evenodd"
          />
        </svg>
      </span>
    </button>

    <transition
      enter-active-class="transition ease-out duration-100"
      enter-class="transform opacity-0 scale-95"
      enter-to-class="transform opacity-100 scale-100"
      leave-active-class="transition ease-in duration-75"
      leave-class="transform opacity-100 scale-100"
      leave-to-class="transform opacity-0 scale-95"
    >
      <ul
        v-show="isActive"
        ref="dropdownMenu"
        class="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
        tabindex="-1"
        role="listbox"
        aria-labelledby="listbox-label"
        aria-activedescendant="listbox-option-3"
      >
        <slot />
      </ul>
    </transition>
  </div>
</template>

<script>
import { isCustomElement } from '../../utils/helpers'

const DEFAULT_CLOSE_OPTIONS = ['escape', 'outside']

export default {
  props: {
    value: {
      type: [String, Number, Boolean, Object, Array, Function],
      default: null,
    },
    disabled: Boolean,
    inline: Boolean,
    triggers: {
      type: Array,
      default: () => ['click'],
    },
    multiple: Boolean,
    closeOnClick: {
      type: Boolean,
      default: true,
    },
    canClose: {
      type: [Array, Boolean],
      default: true,
    },
  },

  data() {
    return {
      selected: this.value,
      isActive: false,
    }
  },

  computed: {
    cancelOptions() {
      return typeof this.canClose === 'boolean' ? (this.canClose ? DEFAULT_CLOSE_OPTIONS : []) : this.canClose
    },

    hoverable() {
      return this.triggers.includes('hover')
    },
  },

  watch: {
    value(value) {
      this.selected = value
    },

    isActive(value) {
      this.$emit('active-change', value)
    },
  },

  mounted() {
    document.addEventListener('click', this.clickedOutside)
  },

  methods: {
    selectItem(value) {
      if (this.multiple) {
        if (this.selected) {
          if (!this.selected.includes(value)) {
            // Add value
            this.selected = [...this.selected, value]
          } else {
            // Remove value
            this.selected = this.selected.filter((val) => val !== value)
          }
        } else {
          this.selected = [value]
        }
        this.$emit('change', this.selected)
      } else if (this.selected !== value) {
        this.selected = value
        this.$emit('change', this.selected)
      }
      this.$emit('input', this.selected)
      if (!this.multiple) {
        this.isActive = !this.closeOnClick
        if (this.hoverable && this.closeOnClick) {
          this.isHoverable = false
        }
      }
    },

    clickedOutside(event) {
      if (!this.cancelOptions.includes('outside')) return
      if (this.inline) return
      const target = isCustomElement(this) ? event.composedPath()[0] : event.target
      if (!this.isInWhiteList(target)) this.isActive = false
    },

    isInWhiteList(el) {
      if (el === this.$refs.dropdownMenu) return true
      if (el === this.$refs.trigger) return true
      // All chidren from dropdown
      if (this.$refs.dropdownMenu !== undefined) {
        const children = this.$refs.dropdownMenu.querySelectorAll('*')
        for (const child of children) {
          if (el === child) {
            return true
          }
        }
      }
      // All children from trigger
      if (this.$refs.trigger !== undefined) {
        const children = this.$refs.trigger.querySelectorAll('*')
        for (const child of children) {
          if (el === child) {
            return true
          }
        }
      }
      return false
    },

    onClick() {
      if (!this.triggers.includes('click')) return
      this.toggle()
    },

    toggle() {
      if (this.disabled) return
      if (!this.isActive) {
        // if not active, toggle after clickOutside event
        // this fixes toggling programmatic
        this.$nextTick(() => {
          const value = !this.isActive
          this.isActive = value
          // Vue 2.6.x ???
          setTimeout(() => (this.isActive = value))
        })
      } else {
        this.isActive = !this.isActive
      }
    },

    beforeDestroy() {
      document.removeEventListener('click', this.clickedOutside)
    },
  },
}
</script>
