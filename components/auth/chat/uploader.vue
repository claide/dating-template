<template>
  <div class="flex items-center">
    <button @click="onFilePick">
      <slot />
    </button>
    <input
      ref="fileInput"
      type="file"
      accept="image/*"
      class="hidden"
      style="clip: rect(0, 0, 0, 0)"
      @change="handleFileChange($event)"
    />
  </div>
</template>

<script>
export default {
  props: {
    value: File,
  },

  methods: {
    onFilePick() {
      this.$refs.fileInput.click()
    },

    handleFileChange($event) {
      const file = $event.target.files[0]
      this.$emit('input', file)
    },
  },
}
</script>
