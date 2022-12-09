<template>
  <div>
    <div class="max-w-xl my-8 mx-auto bg-white dark:bg-clay">
      <nav
        class="relative z-0 shadow flex flex-col md:flex-row"
        aria-label="Tabs"
      >
        <button
          v-for="(tab, tabIdx) in tabs"
          :key="tab.key"
          :class="[
            tab.current
              ? 'dark:text-white text-gray-900'
              : 'text-slate-400 hover:text-gray-900 hover:dark:text-white',
            tabIdx === 0 ? 'rounded-tl-lg' : '',
            tabIdx === tabs.length - 1 ? 'rounded-tr-lg' : '',
            'group relative min-w-0 flex-1 overflow-hidden bg-white dark:bg-clay py-4 px-2 text-sm font-medium text-center hover:bg-gray-50 focus:z-10',
          ]"
          :aria-current="tab.current ? 'page' : undefined"
          @click="setActiveTab(tab.key)"
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
        <AuthProfilePhotos
          v-if="activeTab === 'photos'"
          cancel-text="Back"
          submit-text="Save"
          title="My Photos"
          @save="save"
          @cancel="cancel"
        />
        <AuthProfileInformation
          v-if="activeTab === 'information'"
          @save="save"
          @cancel="cancel"
        />
        <ProfileAppearance
          v-if="activeTab === 'appearance'"
          title="My appearance"
          cancel-text="Back"
          submit-text="Save"
          @save="save"
          @cancel="cancel"
        />
        <ProfilePreferenceInterests
          v-if="activeTab === 'preference'"
          title="Preference & interests"
          cancel-text="Back"
          submit-text="Save"
          @save="save"
          @cancel="cancel"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  layout: 'auth',
  middleware: 'auth',
  data() {
    return {
      activeTab: this.$route.params.tab ? this.$route.params.tab : 'photos',
      tabs: [
        {
          name: 'My Photos',
          href: '#',
          current: false,
          key: 'photos',
        },
        {
          name: 'About me',
          href: '#',
          current: false,
          key: 'information',
        },
        { name: 'My appearance', href: '#', current: false, key: 'appearance' },
        {
          name: 'Preference & interests',
          href: '#',
          current: false,
          key: 'preference',
        },
      ],
    }
  },
  head() {
    return {
      title: 'Account settings',
    }
  },
  mounted() {
    this.tabs.filter((item) => {
      if (item.key !== this.activeTab) return (item.current = false)
      item.current = true
    })
  },

  methods: {
    async save() {
      await this.$auth.fetchUser()
      this.success()
    },
    cancel() {
      this.$router.push('/my-profile')
    },
    success() {
      this.$toast.success('Your profile has been updated.')
      // this.$buefy.snackbar.open({
      //   message: 'Your profile has been updated.',
      //   type: 'is-success',
      //   position: 'is-bottom-right'
      // })
    },
    setActiveTab(key) {
      this.tabs.filter((item) => {
        if (item.key !== key) return (item.current = false)
        return (item.current = true)
      })
      this.activeTab = key
    },
  },
}
</script>
