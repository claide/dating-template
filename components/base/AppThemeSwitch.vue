<template>
  <div
    class="flex items-center justify-center md:w-full md:border-l border-slate-500 text-slate-400 hover:text-slate-200"
  >
    <IconLight
      v-if="$colorMode.preference === 'light'"
      :class="iconClass"
      class="h-6 w-6 fill-current ml-2 md:ml-6 hover:cursor-pointer"
      @click="getTheme"
    />
    <IconDark
      v-else-if="$colorMode.preference === 'dark'"
      :class="iconClass"
      class="h-6 w-6 fill-current ml-2 md:ml-6 hover:cursor-pointer"
      @click="getTheme"
    />
    <!-- <IconSystem
      v-else
      :class="iconClass"
      class="h-6 w-6 fill-current ml-2 md:ml-6 hover:cursor-pointer"
      @click="getTheme"
    /> -->
  </div>
</template>

<script>
// import IconSystem from '@/assets/svg/system.svg?inline'
import IconLight from '@/assets/svg/light.svg?inline'
import IconDark from '@/assets/svg/dark.svg?inline'

export default {
  components: {
    // IconSystem,
    IconLight,
    IconDark,
  },

  props: {
    iconClass: {
      type: String,
      default: 'w-6 h-6 m-auto',
    },
  },

  data() {
    return {
      colors: ['light', 'dark'],
    }
  },

  methods: {
    getTheme() {
      const index = this.colors.indexOf(this.$colorMode.preference)

      if (index === -1) {
        this.$colorMode.preference = this.colors[0]
      } else {
        const nextIndex = (index + 1) % this.colors.length
        this.$colorMode.preference = this.colors[nextIndex]
      }
    },
  },
}
</script>
<style lang="scss" scoped></style>
