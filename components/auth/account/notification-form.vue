<template>
  <div>
    <h1 class="text-xl text-center text-gray-900 dark:text-slate-400">
      Email Notifications
    </h1>
    <div class="flex justify-between py-5">
      <span class="text-sm text-gray-900 dark:text-slate-400"
        >Enable all email notifications</span
      >
      <label for="emailAll" class="flex items-center cursor-pointer">
        <!-- toggle -->
        <div class="relative">
          <!-- input -->
          <input
            id="emailAll"
            @click="emailAllChanged(!form.email.all)"
            :checked="form.email.all"
            type="checkbox"
            class="sr-only"
          />
          <!-- line -->
          <div class="w-8 h-4 bg-slate-400 rounded-full shadow-inner"></div>
          <!-- dot -->
          <div
            class="dot absolute w-6 h-6 bg-slate-200 rounded-full shadow -left-1 -top-1 transition"
          ></div>
        </div>
      </label>
      <!-- <b-switch
        v-model="form.email.all"
        :true-value="true"
        :false-value="false"
        @input="emailAllChanged"
      /> -->
    </div>

    <hr />
    <div class="flex flex-col gap-5 py-5">
      <div class="flex justify-between">
        <span class="text-sm text-gray-900 dark:text-slate-400">Messages</span>
        <label
          :class="form.email.all ? 'opacity-50' : ''"
          for="emailMessages"
          class="flex items-center cursor-pointer"
        >
          <!-- toggle -->
          <div class="relative">
            <!-- input -->
            <input
              id="emailMessages"
              @click="form.email.messages = !form.email.messages"
              :checked="form.email.messages"
              :disabled="form.email.all"
              type="checkbox"
              class="sr-only"
            />
            <!-- line -->
            <div class="w-8 h-4 bg-slate-400 rounded-full shadow-inner"></div>
            <!-- dot -->
            <div
              class="dot absolute w-6 h-6 bg-slate-200 rounded-full shadow -left-1 -top-1 transition"
            ></div>
          </div>
        </label>
      </div>
      <div class="flex justify-between">
        <span class="text-sm text-gray-900 dark:text-slate-400">Winks</span>
        <label
          :class="form.email.all ? 'opacity-50' : ''"
          for="emailWinks"
          class="flex items-center cursor-pointer"
        >
          <!-- toggle -->
          <div class="relative">
            <!-- input -->
            <input
              id="emailWinks"
              @click="form.email.winks = !form.email.winks"
              :checked="form.email.winks"
              :disabled="form.email.all"
              type="checkbox"
              class="sr-only"
            />
            <!-- line -->
            <div class="w-8 h-4 bg-slate-400 rounded-full shadow-inner"></div>
            <!-- dot -->
            <div
              class="dot absolute w-6 h-6 bg-slate-200 rounded-full shadow -left-1 -top-1 transition"
            ></div>
          </div>
        </label>
      </div>
      <div class="flex justify-between">
        <span class="text-sm text-gray-900 dark:text-slate-400">Media</span>
        <label
          :class="form.email.all ? 'opacity-50' : ''"
          for="emailMedia"
          class="flex items-center cursor-pointer"
        >
          <!-- toggle -->
          <div class="relative">
            <!-- input -->
            <input
              id="emailMedia"
              @click="form.email.media = !form.email.media"
              :checked="form.email.media"
              :disabled="form.email.all"
              type="checkbox"
              class="sr-only"
            />
            <!-- line -->
            <div class="w-8 h-4 bg-slate-400 rounded-full shadow-inner"></div>
            <!-- dot -->
            <div
              class="dot absolute w-6 h-6 bg-slate-200 rounded-full shadow -left-1 -top-1 transition"
            ></div>
          </div>
        </label>
      </div>
    </div>
    <div class="text-right mt-11">
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
</template>

<script>
export default {
  name: 'NotificationForm',
  data() {
    return {
      loading: false,
      form: {
        email: {
          all: false,
          messages: false,
          winks: false,
          media: false,
        },
      },
    }
  },
  created() {
    this.fetchSettings()
  },
  methods: {
    emailAllChanged(value) {
      this.form.email.all = value
      if (value) {
        this.form.email = {
          all: true,
          messages: true,
          winks: true,
          media: true,
        }
      }
    },
    async fetchSettings() {
      this.loading = true
      const { data } = await this.$axios.get('user-notification-settings')
      this.form = data.data
      this.loading = false
    },

    async submit() {
      this.loading = true
      await this.$axios.put('user-notification-settings', {
        notification_settings: this.form,
      })
      this.$toast.show('Notification settings updated successfully.', {
        duration: 2000,
        type: 'success',
        position: 'top-center',
      })
      this.loading = false
    },
  },
}
</script>

<style scoped lang="scss">
input:checked ~ .dot {
  transform: translateX(70%);
  background-color: #fabe39;
}
</style>
