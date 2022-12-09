<template>
  <div class="h-full">
    <div class="h-full">
      <div v-show="!url" class="mt-1 sm:mt-0 sm:col-span-2 h-full">
        <div class="h-full">
          <label
            class="flex flex-col w-full border-2 border-gray-300 border-dashed rounded-md h-full my-auto"
          >
            <div
              class="flex flex-col items-center justify-center my-auto hover:cursor-pointer"
            >
              <svg
                class="mx-auto h-12 w-12 text-gray-400"
                stroke="currentColor"
                fill="none"
                viewBox="0 0 48 48"
                aria-hidden="true"
              >
                <path
                  d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
              <p
                class="pt-1 text-sm tracking-wider text-gray-400 group-hover:text-gray-600"
              >
                Select a photo
              </p>
            </div>
            <input
              v-show="!url"
              id="file-upload"
              ref="imageInput"
              :loading="submitting"
              :native="true"
              name="file-upload"
              type="file"
              class="sr-only opacity-0"
              accept="image/*"
              @input="onChange"
            />
          </label>
        </div>
      </div>

      <div
        v-if="url"
        :class="{
          'w-[255px] h-[255px] my-0 mx-auto':
            $route.path == '/profile/complete',
        }"
        class="photo-div relative h-full w-full"
      >
        <img
          ref="imageSrc"
          :src="url"
          :class="{
            ' my-0 mx-auto object-cover rounded-[50%]':
              $route.path == '/profile/complete',
          }"
          class="object-cover cursor-pointer w-full h-full"
          alt="primary_photo"
        />
        <div
          v-on-clickaway="away"
          class="p-1 bg-[#c1c1c1] absolute top-1 right-1 align-top inline-flex rounded-sm cursor-pointer"
          @click="isToggledDown = !isToggledDown"
        >
          <EditIcon class="w-4 h-4" />
          <transition
            enter-active-class="transition ease-out duration-100"
            enter-class="transform opacity-0 scale-95"
            enter-to-class="transform opacity-100 scale-100"
            leave-active-class="transition ease-in duration-75"
            leave-class="transform opacity-100 scale-100"
            leave-to-class="transform opacity-0 scale-95"
          >
            <div
              :class="isToggledDown ? 'block' : 'invisible'"
              class="origin-top-right fixed md:absolute top-4 right-0 mt-2 w-full lg:w-40 rounded overflow-hidden z-20"
            >
              <div
                class="rounded bg-white shadow-xs"
                role="menu"
                aria-orientation="vertical"
                aria-labelledby="options-menu"
              >
                <div class="w-full text-slate-400">
                  <div class="text-xs text-black p-2 mb-2">
                    <ul>
                      <li v-if="collection === 'photos'" class="py-2">
                        <a
                          href="javascript:;"
                          class="dropdown-item"
                          @click="handleChangePrimary"
                          >Make primary photo</a
                        >
                      </li>
                      <li class="py-2">
                        <a
                          href="javascript:;"
                          class="dropdown-item"
                          @click.prevent="removePhoto"
                          >Remove photo</a
                        >
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </transition>
        </div>
        <span
          v-if="status"
          :class="{
            'bg-[#f5f5f5] text-black': status == 'PENDING',
            ' bg-[#7bb81a] text-white': status == 'APPROVED',
            'bg-[#db2b2b] text-white': status == 'REJECTED',
          }"
          class="items-center inline-flex text-[0.75rem] leading-[1.5] h-[2em] justify-center px-3 whitespace-nowrap absolute bottom-0 left-0 w-full rounded-none"
          >{{ status }}</span
        >
      </div>
    </div>
    <!-- crop modal -->
    <div
      v-if="isCropModalActive"
      class="fixed z-50 -inset-1 bg-gray-900 bg-opacity-50 overflow-y-auto h-full w-full px-4"
    >
      <div
        class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[384px] m-auto max-h-screen max-w-5xl shadow-lg rounded bg-white"
      >
        <!-- Modal header -->

        <!-- Modal body -->
        <div class="text-black" style="background-position: 100%">
          <div class="flex flex-col gap-4">
            <AuthProfileCropper
              v-if="url"
              :img="url"
              :file="file"
              @close="isCropModalActive = false"
              @crop="cropHandler"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { directive as onClickaway } from 'vue-clickaway'
import EditIcon from '@/assets/svg/edit.svg?inline'

export default {
  name: 'PhotoUpload',

  directives: { onClickaway },

  components: { EditIcon },

  props: ['url', 'file', 'submitting', 'status', 'collection'],

  data() {
    return {
      isCropModalActive: false,
      isToggledDown: false,
    }
  },

  methods: {
    away() {
      this.isToggledDown = false
    },
    cropHandler(photo) {
      this.$emit('update:url', photo.url)
      this.$emit('update:file', photo.file)
    },
    handleChangePrimary() {
      this.$emit('changePrimary')
      setTimeout(() => {
        this.away()
      }, 500)
    },
    onChange(file) {
      console.log(file.target.files[0])
      const fileSize = file.target.files[0].size / 1024 / 1024 // in MB
      if (fileSize > 5.12) {
        this.removePhoto()
        this.$toast.error(
          `Image size (${fileSize}MB) is greater than the limit (5MB).`
        )
        return
        // this.$buefy.snackbar.open({
        //   message: `Image size (${fileSize}MB) is greater than the limit (5MB).`,
        //   type: 'is-danger',
        //   position: 'is-top',
        //   actionText: 'Okay',
        //   indefinite: true
        // })
      }
      const reader = new FileReader()

      reader.readAsDataURL(file.target.files[0])
      console.log(file.target.files[0])

      reader.onload = (e) => {
        console.log(e.target)
        this.$emit('update:url', e.target.result)
        this.$emit('update:file', file.target.files[0])

        this.isCropModalActive = true
      }
    },
    removePhoto() {
      console.log(this.$refs.imageInput.value)
      this.$refs.imageSrc.url = null
      this.$emit('update:url', null)
      this.$emit('update:file', null)
      this.$emit('removed')
    },
  },
}
</script>
<style lang="scss">
.field-dob .field {
  padding-top: 3px;
}

.primary-photo {
  object-fit: cover;
}

.photo-status {
  position: absolute;
  bottom: 0px;
  left: 0px;
  width: 100%;
}

.remove-button {
  position: absolute;
  left: 95%;
  top: -5%;
  background-color: #ff3860;
}

.select .is-danger {
  border-color: #ff3860;
}

.profile-p-ddown-content {
  .dropdown-item {
    font-size: 12px;
  }
}

.photo-empty {
  border: 2px dashed #a4a4a4;
  border-radius: 5px;
  height: 100%;
  width: 100%;
  cursor: pointer;
  position: relative;

  @media (min-width: 768px) {
    border-width: 3px;
  }

  svg {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: #a4a4a4;
    height: 3rem;

    @media (min-width: 768px) {
      height: 100%;
    }
  }
}
</style>
