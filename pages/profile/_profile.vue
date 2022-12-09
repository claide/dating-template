<template>
  <div class="container max-w-7xl px-4 sm:px-6 py-2 mx-auto">
    <div class="w-full flex flex-col lg:flex-row">
      <div class="basis-2/5 flex flex-col lg:block mb-4">
        <div class="order-last lg:order-1 dark:text-slate-200">
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
          <div class="flex justify-center lg:justify-start gap-8 lg:gap-3">
            <ChatMessageMe v-if="profile.uuid" :recipient="profile" />
            <ChatSendWink
              v-if="profile.uuid"
              :recipient="profile"
              @credits-error="$router.push('/credits/buy')"
            />
            <!-- <nuxt-link
              to="/profile/edit"
              class="
                py-2
                px-4
                bg-gradient-to-r
                from-primary
                to-secondary
                hover:bg-yellow-500
                text-black
                rounded
                block
                lg:inline
                font-medium
                text-sm
              "
              >Send a wink</nuxt-link
            > -->
          </div>
        </div>

        <AuthAvatar
          :src="
            profile.approved_primary_photo
              ? profile.approved_primary_photo.url
              : null
          "
          :gender="profile.gender"
          class="mt-8 w-1/2 lg:w-[70%] order-1 lg:order-last mx-auto lg:mx-0 mb-4"
          type="thumbnail"
        />
      </div>

      <!-- Begin profile details -->
      <div class="w-full">
        <div
          class="bg-white dark:bg-clay rounded mx-auto shadow-[0_8px_30px_rgb(0,0,0,0.12)] px-4 sm:px-6 py-2"
        >
          <h1 class="text-2xl py-4 text-black dark:text-slate-300">About me</h1>
          <ul class="list-none py-3">
            <li
              class="grid lg:grid-cols-[166px,_1fr] gap-2 lg:gap-3 dark:text-slate-400 pb-3 text-sm lg:text-base"
            >
              <div>Username</div>
              <div class="font-medium">{{ profile.username }}</div>
            </li>
            <li
              class="grid lg:grid-cols-[166px,_1fr] gap-2 lg:gap-3 dark:text-slate-400 pb-3 text-sm lg:text-base"
            >
              <div>Gender</div>
              <div class="font-medium capitalize">{{ profile.gender }}</div>
            </li>
            <li
              class="grid lg:grid-cols-[166px,_1fr] gap-2 lg:gap-3 dark:text-slate-400 pb-3 text-sm lg:text-base"
            >
              <div>Age</div>
              <div class="font-medium">{{ profile.age }}</div>
            </li>
            <li
              class="grid lg:grid-cols-[166px,_1fr] gap-2 lg:gap-3 dark:text-slate-400 pb-3 text-sm lg:text-base"
            >
              <div>City</div>
              <div class="font-medium">{{ profile.lives_in }}</div>
            </li>
            <li
              v-if="profile.country"
              class="grid lg:grid-cols-[166px,_1fr] gap-2 lg:gap-3 dark:text-slate-400 pb-3 text-sm lg:text-base"
            >
              <div>Country</div>
              <div class="font-medium">{{ profile.country.name }}</div>
            </li>
            <li
              class="grid lg:grid-cols-[166px,_1fr] gap-2 lg:gap-3 dark:text-slate-400 pb-3 text-sm lg:text-base"
            >
              <div>Looking for</div>
              <div class="font-medium capitalize">
                {{ profile.looking_for }}
              </div>
            </li>
          </ul>
          <h1 class="text-2xl py-4 text-black dark:text-slate-300">
            Appearance
          </h1>
          <ul class="list-none py-3">
            <li
              class="grid lg:grid-cols-[166px,_1fr] gap-2 lg:gap-3 dark:text-slate-400 pb-3 text-sm lg:text-base"
            >
              <div>Body type</div>
              <div v-if="profile.body_type_string" class="font-medium">
                {{ profile.body_type_string | preferences }}
              </div>
              <div v-else class="font-medium">—</div>
            </li>
            <li
              class="grid lg:grid-cols-[166px,_1fr] gap-2 lg:gap-3 dark:text-slate-400 pb-3 text-sm lg:text-base"
            >
              <div>Length</div>
              <div v-if="profile.length" class="font-medium">
                {{ profile.length }} cm
              </div>
              <div v-else class="font-medium">—</div>
            </li>
            <li
              class="grid lg:grid-cols-[166px,_1fr] gap-2 lg:gap-3 dark:text-slate-400 pb-3 text-sm lg:text-base"
            >
              <div>Eye color</div>
              <div
                v-if="profile.eye_color_string"
                class="font-medium capitalize"
              >
                {{ profile.eye_color_string | preferences }}
              </div>
              <div v-else class="font-medium">—</div>
            </li>
            <li
              class="grid lg:grid-cols-[166px,_1fr] gap-2 lg:gap-3 dark:text-slate-400 pb-3 text-sm lg:text-base"
            >
              <div>Hair color</div>
              <div v-if="profile.hair_color_string" class="font-medium">
                {{ profile.hair_color_string | preferences }}
              </div>
              <div v-else class="font-medium">—</div>
            </li>
            <li
              class="grid lg:grid-cols-[166px,_1fr] gap-2 lg:gap-3 dark:text-slate-400 pb-3 text-sm lg:text-base"
            >
              <div>Tattoos</div>
              <div v-if="profile.tattoos_string" class="font-medium">
                {{ profile.tattoos_string | preferences }}
              </div>
              <div v-else class="font-medium">—</div>
            </li>
            <li
              class="grid lg:grid-cols-[166px,_1fr] gap-2 lg:gap-3 dark:text-slate-400 pb-3 text-sm lg:text-base"
            >
              <div>Piercings</div>
              <div v-if="profile.piercings_string" class="font-medium">
                {{ profile.piercings_string | preferences }}
              </div>
              <div v-else class="font-medium">—</div>
            </li>
          </ul>
          <h1 class="text-2xl py-4 text-black dark:text-slate-300">
            Photos ({{ gallery.length }})
          </h1>
          <div class="flex flex-wrap relative">
            <div
              v-for="(photo, index) in profile.approved_photos"
              :key="photo.id"
              class="basis-1/2 lg:basis-1/4 p-3"
            >
              <a href="#" @click.prevent="openThumbnail(index)">
                <img
                  :src="photo.url"
                  :class="!_user.is_vip ? 'blur-sm' : ''"
                  alt=""
                  class="rounded-md object-cover w-full h-[230px]"
                />
              </a>
            </div>
            <div
              v-if="!_user.is_vip && profile.approved_photos.length >= 1"
              :class="{
                'absolute bg-[rgba(255, 255, 255, 0.7)] dark:bg-[rgba(40,48,59,0.7)] w-full h-full flex items-center justify-center':
                  !_user.is_vip,
              }"
            >
              <span class="absolute top-4 right-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-8 w-8"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fill-rule="evenodd"
                    d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                    clip-rule="evenodd"
                  />
                </svg>
              </span>
              <nuxt-link
                to="/credits/buy?tab=vip"
                class="p-4 bg-red-500 text-white rounded-lg"
              >
                Request access
              </nuxt-link>
            </div>

            <div v-if="!_user.is_vip" class="basis-1/2 lg:basis-1/4 p-3">
              <div
                class="p-5 items-center border-2 border-[#cccccc] h-[230px] rounded-md flex flex-col justify-center"
                @click="requestMorePhotos"
              >
                <p class="text-lg sm:text-2xl lg:text-center mb-5">
                  Request more photos
                </p>
                <img
                  class="w-[5em] h-[5em]"
                  src="https://assets.shagtoday.co.uk/st/img/more-photos.png"
                  alt
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- End profile -->
    <LightBox
      ref="lightbox"
      :images="gallery"
      :show-light-box="false"
      :show-thumbs="false"
    ></LightBox>
  </div>
</template>

<script>
import LightBox from 'vue-image-lightbox'
import User from '@/models/User'
// import MessageMe from '@/components/chat/message-me'
// import SendWink from '@/components/chat/send-wink'
// import CreditsWarning from '@/components/chat/credits-warning'
import Conversation from '@/models/UserConversation'
// import FireBadgeIcon from '@/assets/img/fire-circle.svg'
// import CameraIcon from '@/assets/icons/camera.svg'
// import AvatarFixed from '../../components/avatar-fixed.vue'

export default {
  components: {
    // MessageMe,
    // SendWink,
    // CreditsWarning,
    LightBox,
    // FireBadgeIcon,
    // CameraIcon,
    // AvatarFixed
  },
  layout: 'auth',
  middleware: 'auth',
  async asyncData({ params, error }) {
    const response = await User.include(
      'approved-primary',
      'approved-media',
      'liked',
      'country'
    ).find(params.profile)
    return { profile: response.data }
  },
  data() {
    return {
      isWinkModalActive: false,
      profile: {},
      showCreditsWarning: false,
    }
  },
  head() {
    return {
      title: 'Profile',
    }
  },
  computed: {
    gallery() {
      if (
        !(
          this.profile.approved_photos && this.profile.approved_photos.length
        ) &&
        !this.profile.approved_primary_photo
      ) {
        return []
      }

      const photos = this.profile.approved_photos.map((o) => {
        return {
          thumb: o.src || o.url,
          src: o.src || o.url,
        }
      })

      if (this.profile.approved_primary_photo) {
        const primary = {
          thumb: this.profile.approved_primary_photo.url,
          src: this.profile.approved_primary_photo.url,
        }
        return [...photos, primary]
      }
      return photos
    },
    _user() {
      return this.$auth.user.data
    },
  },
  methods: {
    openThumbnail(index = 0) {
      this.$refs.lightbox.showImage(index)
    },
    async requestMorePhotos() {
      if (!this.$auth.user.data.credits) {
        this.$router.push('/credits/buy')
      } else {
        const convo = new Conversation({ recipient: this.profile.uuid })
        const { data } = await convo.save()
        this.$router.push('/messages?conversation=' + data.uuid)
        this.$router.push('/messages/' + data.uuid)
      }
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
