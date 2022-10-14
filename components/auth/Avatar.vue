<template>
  <div @click="push" class="cursor-pointer flex items-end">
    <img
      v-if="srcLink"
      :src="srcLink"
      @error="onImageError"
      :type="type"
      :class="imgType"
      class="w-full h-full object-cover"
    />
    <img
      v-if="!srcLink && gender === 'male'"
      :type="type"
      :class="imgType"
      class="w-full h-full object-cover"
      src="https://assets.shagtoday.co.uk/st/img/male-avatar.png"
    />
    <img
      v-if="!srcLink && gender === 'female'"
      :type="type"
      :class="imgType"
      class="w-full h-full object-cover"
      src="https://assets.shagtoday.co.uk/st/img/female-avatar.png"
    />
  </div>
</template>

<script>
export default {
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
    type: {
      type: String,
      default: 'avatar',
    },
  },

  data() {
    return {
      srcLink: null,
    }
  },

  computed: {
    imgType() {
      return {
        'rounded-full ring-2 ring-primary p-1': this.type === 'avatar',
        'rounded-t h-[170px] md:min-h-[284px]': this.type === 'thumbnail',
        rounded: this.type === 'gallery',
      }
    },
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
