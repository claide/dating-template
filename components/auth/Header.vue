<template>
  <div>
    <div class="bg-black-100">
      <div class="container max-w-7xl px-4 sm:px-6 py-2 mx-auto text-slate-200">
        <div class="hidden lg:flex items-center">
          <AuthAvatar
            :src="user.primary_photo ? user.primary_photo.url : noPhoto"
            to="/profile/edit"
            class="h-14 w-14"
          />
          <span class="mx-4 text-xl">{{ user.username }}</span>
          <nuxt-link
            to="/credits/buy"
            class="px-4 py-2 bg-gradient-to-r from-primary to-secondary hover:bg-yellow-500 text-black rounded font-medium text-sm"
            >Buy credits</nuxt-link
          >
        </div>
        <div class="lg:hidden flex justify-between items-center">
          <div class="flex flex-col">
            <span class="text-sm text-slate-400">Account Balance</span>
            <div class="text-white">
              {{ user.credits }} <span class="text-sm">credits</span>
            </div>
          </div>
          <nuxt-link
            to="/credits/buy"
            class="p-2 bg-gradient-to-r from-primary to-secondary hover:bg-yellow-500 text-black rounded font-medium text-sm"
            >Buy credits</nuxt-link
          >
        </div>
      </div>
    </div>
    <AuthMenu class="hidden lg:block" />
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  data() {
    return {
      noPhoto: require('assets/img/no-photo.png'),
    }
  },

  computed: {
    ...mapState({
      user: (state) => state.authentication.user.data,
    }),
  },

  methods: {
    async logout() {
      await this.$auth.logout().then(() => {
        location.replace('/')
      })
    },
  },
}
</script>
