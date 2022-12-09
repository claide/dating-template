<template>
  <div>
    <h1 class="text-2xl mb-5 text-black dark:text-slate-400">{{ title }}</h1>
    <div
      :class="{ flex: $route.name === 'profile-complete' }"
      class="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-8"
    >
      <div
        v-for="(photo, index) in media"
        :key="index"
        class="w-full h-40 sm:h-48 md:h-40"
      >
        <AuthProfilePhotoUploader
          v-bind.sync="photo"
          :submitting="submitting"
          @changePrimary="changePrimary(index)"
          @removed="removeImage(index)"
        />
      </div>
    </div>
    <div class="flex justify-between">
      <button
        :disabled="submitting"
        class="text-black dark:text-slate-400"
        @click.prevent="$emit('cancel')"
      >
        {{ cancelText || 'Skip' }}
      </button>
      <button
        :class="{ 'is-loading': submitting || isLoading }"
        :disabled="submitting || isLoading"
        class="py-2 px-4 bg-gradient-to-r from-primary to-secondary hover:bg-yellow-500 text-black rounded font-medium text-sm"
        @click.prevent="submit"
      >
        {{ submitText || 'Save' }}
      </button>
    </div>
  </div>
</template>

<script>
import { cloneDeep, orderBy } from 'lodash'
import axios from 'axios'

export default {
  title: 'photos',

  // isLoading variable comes from complete component
  props: ['title', 'cancelText', 'submitText', 'isLoading'],

  data() {
    return {
      media: [],
      submitting: false,
      oldPrimary: null,
      deleteImagesId: [],
    }
  },

  computed: {
    newImages() {
      console.log(
        'new image',
        this.media.filter((o) => o.id === null && o.file)
      )
      return this.media.filter((o) => o.id === null && o.file)
    },
    currentPrimary() {
      return this.media.find((o) => o.collection === 'primary_photo')
    },
  },

  created() {
    this.initializeMedia()
  },

  methods: {
    async submit() {
      this.submitting = true
      if (!this.currentPrimary) {
        this.media[0].collection = 'primary_photo'
      }
      await this.updatePrimary()
      await this.deleteImages()
      await this.saveImages()
      this.$emit('save')

      this.submitting = false
    },
    async deleteImages() {
      const promises = []
      for (const index in this.deleteImagesId) {
        promises.push(
          await this.$axios.delete(`users/media/${this.deleteImagesId[index]}`)
        )
      }

      await axios.all(promises)
    },
    async updatePrimary() {
      if (
        this.currentPrimary.id == null ||
        this.oldPrimary == null ||
        this.oldPrimary.id == null ||
        this.currentPrimary.id === this.oldPrimary.id
      ) {
        return
      }

      await this.$axios.put(`users/media/${this.currentPrimary.id}`, {
        collection: 'primary_photo',
      })
    },
    async saveImages() {
      const promises = []
      for (const image of this.newImages) {
        const data = new FormData()
        data.append('image', image.file)
        data.append('collection', image.collection || 'photos')
        promises.push(
          this.$axios.post(`/users/${this.$auth.user.data.uuid}/images/`, data)
        )
      }
      await axios.all(promises)
    },
    changePrimary(index) {
      const oldPrimary = this.media.find(
        (o) => o.collection === 'primary_photo'
      )
      if (oldPrimary) {
        oldPrimary.collection = 'photos'
      }

      this.media[index].collection = 'primary_photo'
    },
    initializeMedia() {
      this.media = cloneDeep(this.$auth.user.data.photos)
      if (this.$auth.user.data.primary_photo) {
        this.media.push(cloneDeep(this.$auth.user.data.primary_photo))
      }
      this.media = orderBy(this.media, 'collection', 'desc')
      this.oldPrimary = cloneDeep(this.$auth.user.data.primary_photo)
      for (let i = this.media.length; i < 5; i++) {
        this.media.push({
          url: null,
          file: null,
          collection: 'photos',
        })
      }
    },
    removeImage(index) {
      const image = this.media[index]
      if (image.id) {
        this.deleteImagesId.push(image.id)
        this.media.id = null
      }
    },
  },
}
</script>
<style lang="scss">
.profile-photo-upload {
  height: 10rem;
  width: 100%;

  @media (min-width: 340px) {
    height: 12rem;
  }

  @media (min-width: 768px) {
    height: 161px;
  }

  .uploader {
    height: 100%;

    &-container {
      height: 100%;
    }
  }

  .photo-div {
    height: 100%;
    width: 100%;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      border-radius: 5px;
    }
  }

  .upload {
    height: 161px;
    width: 100%;
    @media (max-width: 600px) {
      height: 100%;
    }
    img {
      width: 100%;
      height: 100%;
    }
  }
}

.media-library-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.75rem;
  margin-bottom: 1.8rem;

  @media (min-width: 768px) {
    grid-template-columns: 1fr 1fr 1fr;
  }

  &.photo-upload-container {
    display: flex;
  }
}
</style>
