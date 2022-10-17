<template>
  <div class="h-48 sm:h-80 lg:h-60">
    <img v-if="src" :src="src" class="w-full h-full rounded-t-lg" />
    <template v-else>
      <MaleAvatar v-if="gender === 'male'" class="w-full h-full" />
      <FemaleAvatar v-else class="w-full h-full" />
    </template>
  </div>
</template>

<script>
import MaleAvatar from '~/assets/icons/male.svg?inline'
import FemaleAvatar from '~/assets/icons/female.svg?inline'

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
  },
}
</script>
