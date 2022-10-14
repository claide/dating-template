<template>
  <div class="relative">
    <a
      @click="toggleNotification"
      class="text-slate-400 hover:text-slate-200 relative"
      role="button"
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
          d="M22 17H2a3 3 0 0 0 3-3V9a7 7 0 0 1 14 0v5a3 3 0 0 0 3 3zm-8.27 4a2 2 0 0 1-3.46 0"
        ></path>
      </svg>

      <span
        v-show="unreadNotificationsCount"
        class="flex h-2 w-2 md:h-3 md:w-3 absolute top-0 right-0"
      >
        <span
          class="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"
        ></span>
        <span
          class="relative inline-flex rounded-full h-2 w-2 md:h-3 md:w-3 bg-red-500"
        ></span>
      </span>
    </a>
    <transition
      enter-active-class="transition ease-out duration-100"
      enter-class="transform opacity-0 scale-95"
      enter-to-class="transform opacity-100 scale-100"
      leave-active-class="transition ease-in duration-75"
      leave-class="transform opacity-100 scale-100"
      leave-to-class="transform opacity-0 scale-95"
    >
      <div
        v-if="mobileNotif"
        class="origin-top-right fixed md:absolute right-0 mt-2 w-full lg:w-96 rounded shadow-lg text-sm overflow-hidden z-20"
      >
        <div
          class="rounded bg-white shadow-xs"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="options-menu"
        >
          <div class="w-full text-slate-400">
            <div class="text-lg text-black font-bold p-4 mb-4">
              Notifications
              <span
                v-if="unreadNotificationsCount > 0"
                class="ml-3 text-primary"
                >{{ unreadNotificationsCount }}</span
              >
            </div>

            <!-- Begin notification lists -->
            <ul class="pb-4 max-h-[26rem] overflow-y-auto">
              <li
                v-for="noti in notifications"
                :key="noti.id"
                :class="{ 'bg-primary-100': noti.isUnread }"
                @click.native="handleNotif"
                :focusable="false"
                custom
                aria-role="menuitem"
                class="px-4 py-2"
              >
                <AuthNotificationList
                  :notification="noti"
                  @deleted="deleted(noti)"
                />
              </li>
              <li class="flex mt-4">
                <button
                  @click.prevent="loadMore"
                  v-show="hasNextPage"
                  :disabled="loading"
                  class="bg-gray-200 p-2 rounded text-black mx-auto inline-flex items-center"
                >
                  <svg
                    v-if="loading"
                    class="animate-spin -ml-1 mr-3 h-5 w-5 text-black"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      class="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      stroke-width="4"
                    ></circle>
                    <path
                      class="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Load More
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import { map, each, findIndex, find } from 'lodash'
import UserNotification from '@/models/UserNotification'
import EventBus from '@/services/eventBus'

export default {
  data() {
    return {
      show: false,
      mobileNotif: false,
      notifications: [],
      unreadNotificationsCount: 0,
      meta: {
        current_page: 1,
        last_page: 1,
      },
      loading: false,
    }
  },

  computed: {
    hasNextPage() {
      return this.meta.current_page < this.meta.last_page
    },
  },

  watch: {
    $route() {
      this.mobileNotif = false
    },
  },

  created() {
    if (this.$auth.loggedIn) {
      this.fetchNotifications()
    }
  },

  mounted() {
    EventBus.$on('NEW_NOTIFICATION', (noti) => {
      this.getUnreadNotificationsCount()
      const exist = find(this.notifications, (notification) => {
        return notification.id === noti.id
      })

      if (!exist) {
        this.notifications.unshift(
          new UserNotification({
            id: noti.id,
            read_at: null,
            data: noti,
          })
        )
      }
    })

    this.getUnreadNotificationsCount()

    document.addEventListener('click', this.closeNotification)
  },

  beforeDestroy() {
    document.removeEventListener('click', this.closeNotification)
  },

  methods: {
    toggleNotification() {
      this.mobileNotif = !this.mobileNotif
    },
    closeNotification(e) {
      if (!this.$el.contains(e.target)) {
        this.mobileNotif = false
      }
    },
    async fetchNotifications() {
      this.loading = true
      const { data, meta } = await UserNotification.page(
        this.meta.current_page
      ).get()
      each(data, (noti) => this.notifications.push(noti))
      this.meta = meta
      this.loading = false
    },
    async getUnreadNotificationsCount() {
      const { data } = await this.$axios.get('notifications/count')
      this.unreadNotificationsCount = data.data.count
    },
    loadMore() {
      this.meta.current_page += 1
      this.fetchNotifications()
    },
    readAll() {
      this.loading = true
      this.$axios.post('/user-notifications/read-all').then(() => {
        this.getUnreadNotificationsCount()
        map(this.notifications, (noti) => {
          return (noti.read_at = new Date().toISOString())
        })
        this.loading = false
      })
    },
    deleted(noti) {
      this.show = true
      const i = findIndex(this.notifications, { id: noti.id })
      if (i > -1) {
        this.notifications.splice(i, 1)
        this.show = true
      }
    },
    handleNotif() {
      this.$refs.notiffx.toggle()
    },
    handleFocusOut() {
      this.handleNotif()
      this.mobileNotif = false
    },
  },
}
</script>

<style>
.notifications-card-header {
  display: flex !important;
  justify-content: space-between;
  align-items: center;
  padding: 0 1.5rem !important;
}
.notification-loadmore {
  padding: 0 !important;
  text-align: center !important;
}
</style>
