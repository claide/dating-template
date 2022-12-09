<template>
  <div class="image-modal card">
    <div class="card-image">
      <VueCropper
        ref="cropper"
        :aspect-ratio="4 / 5"
        :view-mode="2"
        :src="img"
        :zoomOnTouch="false"
        :zoomOnWheel="false"
      ></VueCropper>
    </div>
    <div class="flex justify-between p-5">
      <button
        @click.prevent="$emit('close')"
        class="text-white bg-gradient-to-t from-[#d7393b] to-[#d55152] text-lg font-bold h-auto text-center px-5 py-3 whitespace-nowrap cursor-pointer justify-center rounded-lg"
      >
        Cancel
      </button>
      <button
        @click.prevent="crop"
        class="text-black bg-primary text-lg h-auto text-center px-5 py-3 whitespace-nowrap cursor-pointer justify-center rounded-lg"
      >
        Crop
      </button>
    </div>
  </div>
</template>
<script>
import VueCropper from 'vue-cropperjs'
import 'cropperjs/dist/cropper.css'

export default {
  components: { VueCropper },

  props: ['img', 'file'],

  methods: {
    crop() {
      this.$refs.cropper.getCroppedCanvas().toBlob(
        (blob) => {
          // create preview base64
          this.$emit('crop', {
            url: URL.createObjectURL(blob),
            file: blob,
          })
          // save actual file
          this.$emit('close')
        },
        'image/jpeg',
        0.75
      )
    },
  },
}
</script>
<style>
.is-flex.crop-buttons {
  justify-content: space-between;
  padding: 0 20px 20px 20px;
}
.card-image img {
  max-height: 300px;
}

.image-modal .card-image {
  padding: 20px;
  margin: auto;
  max-height: 350px;
}
</style>
