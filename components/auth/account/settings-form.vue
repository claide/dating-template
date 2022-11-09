<template>
  <div class="flex flex-col divide-y-2 divide-gray-200 dark:divide-gray-900">
    <ValidationObserver ref="form">
      <form>
        <div class="">
          <h1 class="text-xl text-center text-gray-900 dark:text-slate-400">
            Settings
          </h1>

          <div class="mb-4">
            <ValidationProvider
              v-slot="{ errors }"
              name="Username"
              rules="required|max:16"
            >
              <BaseAppInput
                v-model="form.username"
                name="Username"
                type="text"
                label="Username"
                :errors="errors || $t(errors)"
                placeholder="Your username"
              />
            </ValidationProvider>
          </div>
          <div class="mb-4">
            <ValidationProvider
              v-slot="{ errors }"
              name="E-mail"
              rules="required|email"
            >
              <BaseAppInput
                v-model="form.email"
                name="E-mail"
                type="email"
                label="E-mail"
                :errors="errors || $t(errors)"
                placeholder="Type in e-mail"
                readonly
              />
            </ValidationProvider>
          </div>
          <div class="mb-4">
            <label
              for="profile-type"
              class="block mb-2 font-medium text-gray-900 text-sm"
              >Profile type</label
            >
            <BaseAppDropdown v-model="form.invisible">
              <template #trigger>
                {{ form.invisible ? 'Invisible' : 'Visible' }}
              </template>
              <BaseAppDropdownItem :value="true">Invisible</BaseAppDropdownItem>
              <BaseAppDropdownItem :value="false">Visible</BaseAppDropdownItem>
            </BaseAppDropdown>
          </div>

          <div class="text-right mb-6">
            <BaseAppButton
              :disabled="loading"
              :class="{ 'cursor-not-allowed': loading }"
              type="danger"
              size="md"
              class="flex py-3 pr-4 pl-3 bg-primary hover:bg-yellow-500"
              @click.prevent="submit"
            >
              <IconLoader
                v-if="loading"
                class="animate-spin -ml-1 mr-3 h-5 w-5 text-white fill-current"
              />
              Update settings
            </BaseAppButton>
          </div>
        </div>
      </form>
    </ValidationObserver>
    <div class="pt-4">
      <AuthAccountChangePasswordForm />
    </div>
    <div class="pt-4">
      <button
        @click="deleteAccount()"
        :disabled="loading"
        :class="{ 'cursor-not-allowed': loading }"
        type="submit"
        class="flex items-center justify-center text-center py-3 pr-4 pl-3 bg-red-600 hover:bg-red-700 text-white rounded font-medium text-lg w-full shadow mb-6"
      >
        <svg
          v-if="loading"
          class="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
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
        Delete Account
      </button>
    </div>
    <transition name="home" mode="out-in">
      <AuthAccountDeleteAccountModal
        v-if="deleteModalOpened"
        @deleteModalOpened="deleteModalOpened = $event"
        @deleteConfirm="deleteConfirm = $event"
      />
    </transition>
  </div>
</template>

<script>
import IconLoader from '@/assets/svg/loader.svg?inline'
export default {
  name: 'SettingsForm',
  data() {
    return {
      loading: false,
      form: {
        username: '',
        email: '',
        invisible: false,
      },
      deleteModalOpened: false,
      deleteConfirm: false,
    }
  },
  components: {
    IconLoader,
  },
  created() {
    this.fetchSettings()
  },
  methods: {
    deleteAccount() {
      if (this.deleteConfirm) return this.confirmDelete()
      this.deleteModalOpened = true
    },
    async confirmDelete() {
      this.loading = true
      await this.$axios.post('deactive-account')
      this.loading = false
      await this.$auth.logout()
      location.replace('/')
    },
    async fetchSettings() {
      this.loading = true
      const { data } = await this.$axios.get('user-settings')
      this.form = data.data
      this.loading = false
    },

    async submit() {
      this.loading = true
      await this.$axios
        .put('user-settings', this.form)
        .then(() => {
          this.$toast.show('Settings updated successfully.', {
            duration: 2000,
            type: 'success',
            position: 'top-center',
          })
          this.loading = false
          this.$store.commit('authentication/setUsername', this.form.username)
        })
        .catch((err) => {
          if (err.response && err.response.status === 422) {
            this.$refs.form.setErrors(err.response.data.errors)
            // this.form.$setErrors(err.response.data.errors)
            this.loading = false
          }
        })
    },
  },
}
</script>

<style scoped>
.input:read-only {
  cursor: not-allowed;
}
</style>
