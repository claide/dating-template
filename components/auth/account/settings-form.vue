<template>
  <div class="flex flex-col divide-y-2 divide-gray-200 dark:divide-gray-900">
    <div class="">
      <h1 class="text-xl text-center text-gray-900 dark:text-slate-400">
        Settings
      </h1>
      <div class="mb-4">
        <label
          for="username"
          class="block mb-2 font-medium text-gray-900 dark:text-slate-400 text-sm"
          >Username</label
        >
        <input
          v-model="form.username"
          v-validate="'required|username'"
          :class="
            errors.has('new_password')
              ? 'border-red-600 focus:ring-red-400 focus:border-red-400'
              : 'border-slate-100 dark:border-gray-800 focus:ring-yellow-400 focus:border-yellow-400'
          "
          type="text"
          name="username"
          class="bg-slate-100 focus:bg-white border dark:bg-[#1D2636]text-gray-900 dark:text-gray-50 text-sm rounded block w-full p-2.5 outline-none"
          maxlength="15"
        />
        <span class="text-sm text-red-600">{{
          form.$getError('username')
        }}</span>
      </div>
      <div class="mb-4">
        <label
          for="email"
          class="block mb-2 font-medium text-gray-900 dark:text-slate-400 text-sm"
          >Email</label
        >
        <input
          v-model="form.email"
          type="email"
          name="email"
          class="bg-slate-100 focus:bg-white border border-slate-100 dark:border-gray-800 dark:bg-[#1D2636]text-gray-900 dark:text-gray-50 text-sm rounded focus:ring-yellow-400 focus:border-yellow-400 block w-full p-2.5 outline-none"
          readonly
        />
      </div>
      <div class="mb-4">
        <label
          for="profile-type"
          class="block mb-2 font-medium text-gray-900 dark:text-slate-400 text-sm"
          >Profile type</label
        >
        <select
          v-model="form.invisible"
          class="bg-slate-100 focus:bg-white border border-slate-100 dark:border-gray-800 dark:bg-[#1D2636]text-gray-900 dark:text-gray-50 text-sm rounded focus:ring-yellow-400 focus:border-yellow-400 block w-full p-2.5 appearance-none control-select outline-none"
        >
          <option :value="true">Invisible</option>
          <option :value="false">Visible</option>
        </select>
      </div>

      <div class="text-right">
        <button
          @click="submit"
          :disabled="loading"
          :class="{ 'cursor-not-allowed': loading }"
          type="submit"
          class="flex py-3 pr-4 pl-3 bg-primary hover:bg-yellow-500 text-black rounded font-medium text-md shadow mb-6 ml-auto"
        >
          <svg
            v-if="loading"
            class="animate-spin -ml-1 mr-3 h-5 w-5 text-black self-center"
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
          Update settings
        </button>
      </div>
    </div>
    <div class="pt-4">
      <AccountChangePasswordForm />
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
      <AccountDeleteAccountModal
        v-if="deleteModalOpened"
        @deleteModalOpened="deleteModalOpened = $event"
        @deleteConfirm="deleteConfirm = $event"
      />
    </transition>
  </div>
</template>

<script>
export default {
  name: 'SettingsForm',
  data() {
    return {
      loading: false,
      form: new Form({
        username: '',
        email: '',
        invisible: false,
      }),
      deleteModalOpened: false,
      deleteConfirm: false,
    }
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
      this.form = new Form(data.data)
      this.loading = false
    },

    async submit() {
      this.form.$clearErrors()
      this.loading = true
      await this.$axios
        .put('user-settings', this.form.$data())
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
            this.form.$setErrors(err.response.data.errors)
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
