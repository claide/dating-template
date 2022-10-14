<template>
  <div class="bg-black-100">
    <div
      class="container max-w-7xl px-4 md:px-6 py-2 md:py-4 mx-auto capitalize flex justify-between text-slate-400 dark:text-[#A6ADBA] text-sm"
    >
      <div class="flex gap-6 text-slate-400">
        <nuxt-link
          :to="item.path"
          v-for="(item, index) in navigation"
          :key="index"
          class="hover:text-slate-200"
          >{{ $t('header.' + item.name) }}</nuxt-link
        >
      </div>
      <div class="flex gap-6 justify-end text-slate-400 text-sm">
        <nuxt-link
          :to="item.path"
          v-for="(item, index) in settings"
          :key="index"
          class="hover:text-slate-200"
          >{{ item.title }}</nuxt-link
        >
        <a
          @click.prevent="logout"
          href="javascript:;"
          class="hover:text-slate-200"
          >{{ $t('header.logout', ['logout']) }}</a
        >
      </div>
    </div>
  </div>
</template>
<script>
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
]
const settings = [
  {
    title: 'account settings',
    path: '/account',
  },
]
export default {
  data() {
    return {
      navigation,
      settings,
    }
  },

  methods: {
    async logout() {
      await this.$auth.logout()
    },
  },
}
</script>
