<template>
  <div>
    <div class="max-w-2xl my-8 mx-auto bg-white dark:bg-clay">
      <nav
        class="relative z-0 rounded-lg shadow flex flex-col md:flex-row divide-x divide-gray-200 dark:divide-gray-500"
        aria-label="Tabs"
      >
        <button
          v-for="(tab, tabIdx) in tabs"
          :key="tab.name"
          @click="activeTab(tab.name)"
          :class="[
            tab.current
              ? 'dark:text-white text-gray-900'
              : 'text-slate-400 hover:text-gray-900 hover:dark:text-white',
            tabIdx === 0 ? 'rounded-tl-lg' : '',
            tabIdx === tabs.length - 1 ? 'rounded-tr-lg' : '',
            'group relative min-w-0 flex-1 overflow-hidden bg-white dark:bg-clay py-4 px-4 text-sm font-medium text-center hover:bg-gray-50 focus:z-10',
          ]"
          :aria-current="tab.current ? 'page' : undefined"
        >
          <span>{{ tab.name }}</span>
          <span
            :class="[
              tab.current ? 'bg-primary' : 'bg-transparent',
              'absolute inset-x-0 bottom-0 h-0.5',
            ]"
            aria-hidden="true"
          />
        </button>
      </nav>
      <div class="bg-white dark:bg-clay w-full p-8">
        <AuthAccountSettingsForm v-if="tabs[0].current" />
        <AuthAccountNotificationForm v-if="tabs[1].current" />
        <AuthAccountPayments v-if="tabs[2].current" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  layout: 'auth',
  middleware: 'auth',
  head() {
    return {
      title: 'Account settings',
    }
  },
  components: {},
  data() {
    return {
      tabs: [
        {
          name: 'Settings',
          href: '#',
          current: true,
          component: 'SettingsForm',
        },
        {
          name: 'Notifications',
          href: '#',
          current: false,
          component: 'NotificationForm',
        },
        { name: 'Payments', href: '#', current: false, component: 'Payments' },
      ],
    }
  },
  methods: {
    activeTab(name) {
      this.tabs.filter((item) => {
        if (item.name !== name) return (item.current = false)
        return (item.current = true)
      })
    },
  },
}
</script>
