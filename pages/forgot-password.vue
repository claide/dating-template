<template>
  <section class="container max-w-md mx-auto px-4 sm:px-6 py-8 md:py-14">
    <h3
      class="text-xl font-medium text-gray-900 dark:text-[#A6ADBA] lg:text-2xl mb-8 text-center"
    >
      Forgot password?
    </h3>

    <p class="text-gray-600 dark:text-gray-400 font-normal text-center mb-6">
      No worries, we'll send you reset instructions.
    </p>

    <div
      v-if="emailSent"
      class="p-4 mb-4 text-sm text-green-700 bg-green-100 rounded-lg dark:bg-green-200 dark:text-green-800"
      role="alert"
    >
      An email with a password reset link was just sent to {{ form.email }}
    </div>

    <ValidationObserver ref="form">
      <ValidationProvider
        v-slot="{ errors }"
        name="E-mail"
        vid="email"
        rules="required|email"
        class="mb-4 block"
      >
        <BaseAppInput
          v-model="form.email"
          label="E-mail"
          type="email"
          :errors="errors"
          placeholder="Type in email address"
        />
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
import IconLoader from '@/assets/svg/loader.svg?inline'

export default {
  components: {
    IconLoader,
  },

  data() {
    return {
      form: {
        email: '',
      },
      submitting: false,
      emailSent: false,
    }
  },

  head() {
    return {
      title: 'Forgot Password',
    }
  },

  methods: {
    async onSubmit() {
      if (!(await this.$refs.form.validate())) {
        return false
      }

      try {
        this.submitting = true

        await this.$axios.post('/password/email', {
          email: this.form.email,
        })

        this.emailSent = true
      } catch (err) {
        this.$refs.form.setErrors(err.response.data.errors)
      }

      this.submitting = false
    },
  },
}
</script>
