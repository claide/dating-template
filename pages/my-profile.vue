<template>
  <div class="px-4 sm:px-6 py-2">
    <div class="w-full flex flex-col lg:flex-row">
      <div class="basis-2/5 lg:mr-4 flex flex-col lg:block mb-4">
        <div class="order-last lg:order-1 dark:text-slate-300">
          <div class="flex items-center justify-center lg:justify-start mb-4">
            <span class="text-2xl font-medium">{{ profile.username }}</span>
            <span
              v-if="profile.is_online"
              class="h-3 w-3 bg-green-500 ml-4 rounded-full"
            ></span>
          </div>
          <div
            class="flex items-center justify-center lg:justify-start leading-none mb-3"
          >
            <span class="mr-3">
              {{ profile.age }}
            </span>

            <svg
              v-if="profile.gender == 'male'"
              width="24"
              height="24"
              viewBox="0 0 512 512"
              xmlns="http://www.w3.org/2000/svg"
              class="text-primary fill-current mr-3"
            >
              <path
                d="M442,48H352a22,22,0,0,0,0,44h36.89L328.5,152.39c-68.19-52.86-167-48-229.54,14.57h0C31.12,234.81,31.12,345.19,99,413A174.21,174.21,0,0,0,345,413c62.57-62.58,67.43-161.35,14.57-229.54L420,123.11V160a22,22,0,0,0,44,0V70A22,22,0,0,0,442,48ZM313.92,381.92a130.13,130.13,0,0,1-183.84,0c-50.69-50.68-50.69-133.16,0-183.84s133.16-50.69,183.84,0S364.61,331.24,313.92,381.92Z"
              />
            </svg>

            <svg
              v-else
              width="24px"
              height="24px"
              viewBox="-5 -2 24 24"
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="xMinYMin"
              class="text-primary fill-current mr-3"
            >
              <path
                d="M7 12A5 5 0 1 0 7 2a5 5 0 0 0 0 10zm1 4h1a1 1 0 0 1 0 2H8v1a1 1 0 0 1-2 0v-1H5a1 1 0 0 1 0-2h1v-2c0-.024 0-.047.002-.07A7.002 7.002 0 0 1 7 0a7 7 0 0 1 .998 13.93L8 14v2z"
              />
            </svg>

            {{ profile.lives_in }}
          </div>
          <div class="mb-4 text-center lg:text-left">
            {{ profile.country.name }}
          </div>
          <div class="text-center lg:text-left">
            <!-- <BaseAppButton tag="a">
              Edit Profile -->
            <nuxt-link
              to="/profile/edit"
              class="py-2 px-4 bg-gradient-to-r from-primary to-secondary hover:bg-yellow-500 text-black rounded block lg:inline w-3/5 font-medium text-sm mx-auto"
              >Edit Profile</nuxt-link
            >
            <!-- </BaseAppButton> -->
          </div>
        </div>

        <AuthAvatar
          :src="profile.primary_photo ? profile.primary_photo.url : null"
          :gender="profile.gender"
          class="mt-8 w-52 order-1 lg:order-last mx-auto lg:mx-0 mb-4"
          type="display"
          @click.native="index = profile.photos.length"
        />
      </div>
      <div class="w-full">
        <div
          class="bg-white dark:bg-clay rounded mx-auto shadow-[0_8px_30px_rgb(0,0,0,0.12)] px-4 sm:px-6 py-2"
        >
          <h1 class="text-2xl py-4 text-black dark:text-slate-300">
            About me
            <nuxt-link
              :to="{
                name: 'profile-edit',
                params: { tab: 'information' },
              }"
              class="text-primary ml-4 text-sm"
              >Change</nuxt-link
            >
          </h1>
          <ul class="list-none py-3">
            <li
              class="grid lg:grid-cols-[166px,_1fr] gap-2 lg:gap-3 dark:text-slate-400 pb-3 items-center"
            >
              <div class="font-medium">Username</div>
              <div class="text-slate-500">{{ profile.username }}</div>
            </li>
            <li
              class="grid lg:grid-cols-[166px,_1fr] gap-2 lg:gap-3 dark:text-slate-400 pb-3 items-center"
            >
              <div class="font-medium">Gender</div>
              <div class="text-slate-500 capitalize">{{ profile.gender }}</div>
            </li>
            <li
              class="grid lg:grid-cols-[166px,_1fr] gap-2 lg:gap-3 dark:text-slate-400 pb-3 items-center"
            >
              <div class="font-medium">Age</div>
              <div class="text-slate-500">{{ profile.age }}</div>
            </li>
            <li
              class="grid lg:grid-cols-[166px,_1fr] gap-2 lg:gap-3 dark:text-slate-400 pb-3 items-center"
            >
              <div class="font-medium">City</div>
              <div class="text-slate-500">{{ profile.lives_in }}</div>
            </li>
            <li
              v-if="profile.country"
              class="grid lg:grid-cols-[166px,_1fr] gap-2 lg:gap-3 dark:text-slate-400 pb-3 items-center"
            >
              <div class="font-medium">Country</div>
              <div class="text-slate-500">{{ profile.country.name }}</div>
            </li>
            <li
              class="grid lg:grid-cols-[166px,_1fr] gap-2 lg:gap-3 dark:text-slate-400 pb-3 items-center"
            >
              <div class="font-medium">Looking for</div>
              <div class="text-slate-500 capitalize">
                {{ profile.looking_for }}
              </div>
            </li>
          </ul>
          <h1 class="text-2xl py-4 text-black dark:text-slate-300">
            Appearance
            <nuxt-link
              :to="{
                name: 'profile-edit',
                params: { tab: 'appearance' },
              }"
              class="text-primary ml-4 text-sm"
              >Change</nuxt-link
            >
          </h1>
          <ul class="list-none py-3">
            <li
              class="grid lg:grid-cols-[166px,_1fr] gap-2 lg:gap-3 dark:text-slate-400 pb-3"
            >
              <div class="font-medium">Body type</div>
              <div v-if="profile.body_type_string" class="text-slate-500">
                {{ profile.body_type_string | preferences }}
              </div>
              <div v-else class="text-slate-500">—</div>
            </li>
            <li
              class="grid lg:grid-cols-[166px,_1fr] gap-2 lg:gap-3 dark:text-slate-400 pb-3"
            >
              <div class="font-medium">Length</div>
              <div v-if="profile.length" class="text-slate-500">
                {{ profile.length }} cm
              </div>
              <div v-else class="text-slate-500">—</div>
            </li>
            <li
              class="grid lg:grid-cols-[166px,_1fr] gap-2 lg:gap-3 dark:text-slate-400 pb-3"
            >
              <div class="font-medium">Eye color</div>
              <div
                v-if="profile.eye_color_string"
                class="text-slate-500 capitalize"
              >
                {{ profile.eye_color_string | preferences }}
              </div>
              <div v-else class="text-slate-500">—</div>
            </li>
            <li
              class="grid lg:grid-cols-[166px,_1fr] gap-2 lg:gap-3 dark:text-slate-400 pb-3"
            >
              <div class="font-medium">Hair color</div>
              <div v-if="profile.hair_color_string" class="text-slate-500">
                {{ profile.hair_color_string | preferences }}
              </div>
              <div v-else class="text-slate-500">—</div>
            </li>
            <li
              class="grid lg:grid-cols-[166px,_1fr] gap-2 lg:gap-3 dark:text-slate-400 pb-3"
            >
              <div class="font-medium">Tattoos</div>
              <div v-if="profile.tattoos_string" class="text-slate-500">
                {{ profile.tattoos_string | preferences }}
              </div>
              <div v-else class="text-slate-500">—</div>
            </li>
            <li
              class="grid lg:grid-cols-[166px,_1fr] gap-2 lg:gap-3 dark:text-slate-400 pb-3"
            >
              <div class="font-medium">Piercings</div>
              <div v-if="profile.piercings_string" class="text-slate-500">
                {{ profile.piercings_string | preferences }}
              </div>
              <div v-else class="text-slate-500">—</div>
            </li>
          </ul>
          <h1 class="text-2xl py-4 text-black dark:text-slate-300">
            Photos ({{ gallery.length }})
            <nuxt-link
              :to="{
                name: 'profile-edit',
                params: { tab: 'photos' },
              }"
              class="text-primary ml-4 text-sm"
              >Change</nuxt-link
            >
          </h1>
          <div class="flex flex-wrap">
            <div
              v-for="(photo, index) in profile.photos"
              :key="photo.id"
              class="basis-1/2 lg:basis-1/4 p-3"
            >
              <a href="#" @click.prevent="openThumbnail(index)">
                <img
                  :src="photo.url"
                  alt=""
                  class="rounded-md object-cover w-full h-[230px]"
                />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>

    <CoolLightBox
      :items="gallery"
      :index="index"
      :effect="'fade'"
      @close="index = null"
    >
    </CoolLightBox>
  </div>
</template>

<script>
export default {
  name: 'MyProfile',

  layout: 'auth',

  middleware: 'auth',

  asyncData({ store }) {
    return { profile: store.state.authentication.user.data }
  },
  data() {
    return {
      index: null,
    }
  },

  head() {
    return {
      title: this.$t('pages.my_profile'),
    }
  },

  computed: {
    gallery() {
      if (
        !(this.profile.photos && this.profile.photos.length) &&
        !this.profile.primary_photo
      ) {
        return []
      }

      const photos = this.profile.photos.map((o) => {
        return {
          thumb: o.src || o.url,
          src: o.src || o.url,
        }
      })

      if (this.profile.primary_photo) {
        const primary = {
          thumb: this.profile.primary_photo.url,
          src: this.profile.primary_photo.url,
        }
        return [...photos, primary]
      }
      return photos
    },
  },

  methods: {
    openThumbnail(index) {
      this.index = index
    },
    convertToFeet(cm) {
      const realFeet = (cm * 0.3937) / 12
      const feet = Math.floor(realFeet)
      const inches = Math.round((realFeet - feet) * 12)
      return feet + "'" + inches + '"'
    },
  },
}
</script>

<style lang="scss">
.cool-lightbox__slide__img {
  @media (min-width: 767px) {
    img {
      width: 50%;
      height: 100%;
    }
  }
}
</style>
