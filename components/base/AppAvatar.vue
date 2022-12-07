<template>
  <div class="avatar-fixed clickable" @click="push">
    <img v-if="srcLink" :src="srcLink" @error="onImageError" />
    <template v-else>
      <MaleAvatar v-if="gender === 'male'" class="svg-icon user-avatar" />
      <FemaleAvatar v-else class="svg-icon user-avatar" />
    </template>
  </div>
</template>

<script>
import MaleAvatar from '@/assets/icons/avatar/male.svg'
import FemaleAvatar from '@/assets/icons/avatar/female.svg'

export default {
  components: {
    MaleAvatar,
    FemaleAvatar,
  },
  props: {
    src: {
      type: String,
      default: null,
    },
    gender: {
      type: String,
      default: 'male',
    },
    to: {
      type: String,
      default: '',
    },
  },

  data() {
    return {
      srcLink: null,
    }
  },

  watch: {
    src(val) {
      this.srcLink = val
    },
  },

  mounted() {
    this.srcLink = this.src
  },

  methods: {
    push() {
      if (this.to) {
        this.$router.push(this.to)
      }
    },
    onImageError() {
      this.srcLink = null
    },
  },
}
</script>
