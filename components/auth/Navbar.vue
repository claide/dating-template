<template>
  <nav class="bg-black text-white sticky top-0 z-50">
    <div
      class="container max-w-7xl px-4 sm:px-6 py-4 flex flex-wrap justify-between items-center mx-auto"
    >
      <div class="flex items-center">
        <nuxt-link to="/">
          <AppLogo class="mr-0 md:mr-8 h-6 sm:h-10" />
        </nuxt-link>
        <div class="items-center hidden md:flex text-sm">
          <span class="h-3 w-3 bg-green-500 mr-2 rounded-full"></span>
          <span class="dark:text-[#A6ADBA]">2,360 online now</span>
        </div>
      </div>
      <ul class="lg:hidden flex items-center space-x-4">
        <BaseAppThemeSwitch />
        <AuthNotificationNotif />
        <li>
          <nuxt-link
            @click.native="showMobileNav = false"
            to="/messages"
            class="text-slate-400 hover:text-slate-200 relative"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="stroke-current h-5 w-5 md:h-7 md:w-7"
            >
              <path
                d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"
              ></path>
            </svg>

            <!-- Show when there's an unread msg -->
            <span
              v-show="user.unread_messages_count"
              class="flex h-2 w-2 md:h-3 md:w-3 absolute top-0 right-0"
            >
              <span
                class="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"
              ></span>
              <span
                class="relative inline-flex rounded-full h-2 w-2 md:h-3 md:w-3 bg-red-500"
              ></span>
            </span>
          </nuxt-link>
        </li>
        <li class="flex items-center">
          <a
            @click="showMobileNav = !showMobileNav"
            href="#"
            class="text-slate-400 hover:text-slate-200"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="stroke-current h-5 w-5 md:h-7 md:w-7"
            >
              <line x1="3" y1="12" x2="21" y2="12"></line>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <line x1="3" y1="18" x2="21" y2="18"></line>
            </svg>
          </a>
        </li>
      </ul>
      <div class="hidden w-full lg:block lg:w-auto">
        <ul
          class="flex flex-col mt-4 md:flex-row md:space-x-6 md:mt-0 items-center"
        >
          <li>
            <AuthNotificationNotif />
          </li>
          <li>
            <nuxt-link
              @click.native="showMobileNav = false"
              to="/messages"
              class="text-slate-400 hover:text-slate-200 relative"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="stroke-current h-5 w-5 md:h-7 md:w-7"
              >
                <path
                  d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"
                ></path>
              </svg>

              <!-- Show when there's an unread msg -->
              <span
                v-show="user.unread_messages_count"
                class="flex h-3 w-3 absolute top-0 right-0"
              >
                <span
                  class="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"
                ></span>
                <span
                  class="relative inline-flex rounded-full h-3 w-3 bg-red-500"
                ></span>
              </span>
            </nuxt-link>
          </li>
          <li>
            <div class="flex flex-col">
              <span class="text-sm text-slate-400">Account Balance</span>
              <div class="text-white">
                {{ user.credits }} <span class="text-sm">credits</span>
              </div>
            </div>
          </li>
          <li>
            <nuxt-link
              to="/credits/buy"
              class="py-2 px-4 bg-gradient-to-r from-primary to-secondary hover:bg-yellow-500 text-black rounded font-medium text-sm"
              >Buy credits</nuxt-link
            >
          </li>
          <li class="flex items-center">
            <BaseAppThemeSwitch />
          </li>
        </ul>
      </div>
    </div>
    <!-- Begin mobile menu -->
    <div
      :class="{ 'is-active': showMobileNav }"
      class="bg-black-100 container px-4 sm:px-6 py-4 text-slate-400 fixed translate-x-0 right-0 h-full z-50 lg:hidden mobile-menu"
    >
      <div
        v-show="showMobileNav"
        class="grid grid-cols-[1fr,2fr] items-center gap-8 mb-4"
      >
        <AuthAvatar
          :src="user.primary_photo ? user.primary_photo.url : noPhoto"
          to="/profile/edit"
          class="h-24 w-24"
        />
        <div class="flex flex-col w-full">
          <span class="text-sm text-slate-400">Account Balance</span>
          <div class="text-white mb-3">
            {{ user.credits }} <span class="text-sm">credits</span>
          </div>
          <nuxt-link
            to="/credits/buy"
            class="py-2 px-4 bg-gradient-to-r from-primary to-secondary hover:bg-yellow-500 text-black rounded font-medium text-sm text-center"
            >Buy credits</nuxt-link
          >
        </div>
      </div>
      <div class="grid grid-cols-3 gap-1 mb-4">
        <div class="border-b-primary border-b-2 p-2">
          <div class="text-xl text-white">
            {{ user.received_messages_count }}
          </div>
          <div class="text-xs text-slate-400">messages</div>
        </div>
        <div class="border-b-primary border-b-2 p-2">
          <div class="text-xl text-white">
            {{ user.received_wink_interactions_count }}
          </div>
          <div class="text-xs text-slate-400">winks</div>
        </div>
        <div class="border-b-primary border-b-2 p-2">
          <div class="text-xl text-white">
            {{ user.visits_count }}
          </div>
          <div class="text-xs text-slate-400">visits</div>
        </div>
      </div>
      <ul class="text-sm capitalize">
        <li v-for="(item, index) in navigation" :key="index" class="py-1">
          <nuxt-link :to="item.path">
            {{ $t('header.' + item.name, [item.title]) }}
          </nuxt-link>
        </li>

        <li class="leading-loose">
          <a @click.prevent="logout" href="javascript:;" class="py-2">{{
            $t('header.logout', ['logout'])
          }}</a>
        </li>
      </ul>
    </div>
    <!-- End mobile menu -->
  </nav>
</template>

<script>
import { mapState } from 'vuex'
import dayjs from 'dayjs'
import isBetween from 'dayjs/plugin/isBetween'
import utc from 'dayjs/plugin/utc'

import AppLogo from '~/assets/svg/logo.svg?inline'

dayjs.extend(isBetween)
dayjs.extend(utc)

const navigation = [
  {
    title: 'browse',
    name: 'browse',
    path: '/dashboard',
  },
  {
    title: 'messages',
    name: 'messages',
    path: '/messages',
  },
  {
    title: 'my profile',
    name: 'my_profile',
    path: '/my-profile',
  },
  {
    title: 'my visitors',
    name: 'my_visitors',
    path: '/my-visitors',
  },
  {
    title: 'Buy credits',
    name: 'buy_credits',
    path: '/credits/buy',
  },
  {
    title: 'Account settings',
    name: 'account_settings',
    path: '/account',
  },
]

export default {
  components: { AppLogo },

  data() {
    return {
      navigation,
      showMobileNav: false,
      notificationHolder: false,
      noPhoto: 'https://assets.shagtoday.co.uk/st/img/no-photo.png',
      onlineCount: 0,
    }
  },

  computed: {
    ...mapState({
      user: (state) => state.authentication.user.data,
    }),
    screenWidth() {
      return screen.width
    },
    isUserDeactivated() {
      return this.$auth.user.data.deactivated
    },
  },

  watch: {
    $route() {
      this.showMobileNav = false
    },
  },

  mounted() {
    this.getOnlineCount()
  },

  methods: {
    async logout() {
      await this.$auth.logout()
    },
    getOnlineCount() {
      this.$axios
        .get('/onlines/count')
        .then(({ data }) => {
          this.onlineCount = data.data.online
        })
        .then(() => {
          setTimeout(this.getOnlineCount, 1000 * 60 * 5)
        })
    },
  },
}
</script>

<style lang="scss">
.mobile-menu {
  transform: translateX(100%);
  transition: transform 250ms ease-in-out;
  top: 56px;

  &.is-active {
    transform: translateX(0);
  }
}
</style>
