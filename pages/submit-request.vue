<template>
  <section class="container max-w-md mx-auto px-4 sm:px-6 py-8 md:py-14">
    <h3
      class="text-xl font-medium text-gray-900 dark:text-[#A6ADBA] lg:text-2xl mb-8 text-center"
    >
      Submit a Request
    </h3>
    <p class="text-gray-600 dark:text-gray-400 font-normal text-center mb-6">
      We kindly suggest that you first check our
      <nuxt-link to="/faq" class="text-blue-500"
        >Frequently Asked Questions</nuxt-link
      >
      page before sending your query.
    </p>

    <ValidationObserver ref="form">
      <ValidationProvider
        v-slot="{ errors }"
        name="Request"
        vid="request"
        rules="required"
        tag="div"
        class="mb-4"
      >
        <label
          for="request"
          class="block mb-2 font-medium text-gray-900 dark:text-slate-400 text-sm"
          >Request type</label
        >
        <BaseAppDropdown v-model="form.request_type">
          <template #trigger>
            <span class="capitalize">{{ requestTriggerText }}</span>
          </template>
          <BaseAppDropdownItem
            v-for="(request, i) in requests"
            :key="i"
            :value="request.value"
            >{{ request.label }}</BaseAppDropdownItem
          >
        </BaseAppDropdown>
        <span class="mt-1 block text-sm text-red-500">{{ errors[0] }}</span>
      </ValidationProvider>

      <ValidationProvider
        v-if="form.request_type === 'others'"
        v-slot="{ errors }"
        name="Title"
        rules="required"
        tag="div"
        class="mb-4"
      >
        <BaseAppInput
          v-model="form.custom_request_type"
          label="Title"
          :errors="errors"
          placeholder="Type in title"
        />
      </ValidationProvider>

      <ValidationProvider
        v-slot="{ errors }"
        name="Message"
        vid="message"
        rules="required|max:255|min:8"
        tag="div"
        class="mb-4"
      >
        <label
          for="message"
          class="block mb-2 font-medium text-gray-900 dark:text-slate-400 text-sm"
          >Describe your request</label
        >
        <textarea
          v-model="form.message"
          rows="4"
          class="block p-2.5 w-full text-sm text-gray-900 bg-slate-100 rounded-lg border border-gray-300 focus:ring-yellow-500 focus:border-yellow-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-yellow-500 dark:focus:border-yellow-500 focus:outline-none"
          placeholder="Your question..."
        ></textarea>
        <span class="mt-1 block text-sm text-red-500">{{ errors[0] }}</span>
      </ValidationProvider>

      <BaseAppButton expanded @click.prevent="onSubmit">
        <IconLoader
          v-if="submitting"
          class="animate-spin -ml-1 mr-3 h-5 w-5 text-black fill-current"
        />
        Submit
      </BaseAppButton>
    </ValidationObserver>
  </section>
</template>

<script>
import UserRequest from '@/models/UserRequest'
import IconLoader from '@/assets/svg/loader.svg?inline'

export default {
  components: {
    IconLoader,
  },

  layout: 'auth',

  middleware: 'auth',

  data() {
    return {
      requests: [
        {
          value: 'Add new feature',
          label: 'Add new feature',
        },
        {
          value: 'others',
          label: 'Others',
        },
      ],
      form: {
        request_type: null,
        message: '',
        custom_request_type: '',
      },
      submitting: false,
    }
  },

  head() {
    return {
      title: this.$t('pages.submit_request'),
    }
  },

  computed: {
    requestTriggerText() {
      if (this.form.request_type === null) {
        return 'Select request'
      }

      return this.form.request_type
    },
  },

  methods: {
    onSubmit() {
      this.$refs.form.validate().then((success) => {
        if (success) {
          this.submitting = true

          const userRequest = new UserRequest(this.form)
          userRequest
            .save()
            .then(() => {
              this.form
              // reset form values
              this.form = {
                request_type: null,
                message: '',
                custom_request_type: '',
              }

              // reset form errors
              this.$nextTick(() => {
                this.$refs.form.reset()
              })

              this.$toast.success('Your request has been submitted.', {
                duration: 3000,
              })
            })
            .catch((err) => {
              console.log('error : ' + err)
            })
            .then(() => (this.submitting = false))
        }
      })
    },
  },
}
</script>
