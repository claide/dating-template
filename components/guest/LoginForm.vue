<template>
  <div>
    <ValidationObserver ref="form">
      <form>
        <div class="mb-6">
          <ValidationProvider
            v-slot="{ errors }"
            vid="email"
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
            />
          </ValidationProvider>
        </div>

        <div class="mb-6">
          <ValidationProvider
            v-slot="{ errors }"
            vid="password"
            name="Password"
            rules="required"
          >
            <BaseAppInput
              v-model="form.password"
              type="password"
              label="Password"
              :errors="errors || $t(errors)"
              placeholder="Type in password"
            />
          </ValidationProvider>
        </div>
        <BaseAppButton
          variant="primary"
          expanded
          :is-loading="submitting"
          @click.prevent="onSubmit"
          >Continue</BaseAppButton
        >
      </form>
    </ValidationObserver>

    <nuxt-link
      to="/forgot-password"
      class="block uppercase text-gray-900 dark:text-[#A6ADBA] underline mt-4 text-center text-sm"
      >Forgot password?</nuxt-link
    >

    <span class="separator-text text-sm my-6 text-black dark:text-[#A6ADBA]"
      >or</span
    >

    <!-- Begin login with Google -->
    <a
      :href="googleLink"
      class="w-full border border-black rounded flex items-center mb-4 bg-white text-black relative"
    >
      <div class="flex gap-6 w-full bg-white rounded">
        <div class="ml-[1px] w-[40px] h-[40px] rounded bg-white flex-none">
          <svg
            viewBox="0 0 24 24"
            class="h-[18px] w-[18px] mt-[11px] ml-[11px]"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g transform="matrix(1, 0, 0, 1, 27.009001, -39.238998)">
              <path
                fill="#4285F4"
                d="M -3.264 51.509 C -3.264 50.719 -3.334 49.969 -3.454 49.239 L -14.754 49.239 L -14.754 53.749 L -8.284 53.749 C -8.574 55.229 -9.424 56.479 -10.684 57.329 L -10.684 60.329 L -6.824 60.329 C -4.564 58.239 -3.264 55.159 -3.264 51.509 Z"
              />
              <path
                fill="#34A853"
                d="M -14.754 63.239 C -11.514 63.239 -8.804 62.159 -6.824 60.329 L -10.684 57.329 C -11.764 58.049 -13.134 58.489 -14.754 58.489 C -17.884 58.489 -20.534 56.379 -21.484 53.529 L -25.464 53.529 L -25.464 56.619 C -23.494 60.539 -19.444 63.239 -14.754 63.239 Z"
              />
              <path
                fill="#FBBC05"
                d="M -21.484 53.529 C -21.734 52.809 -21.864 52.039 -21.864 51.239 C -21.864 50.439 -21.724 49.669 -21.484 48.949 L -21.484 45.859 L -25.464 45.859 C -26.284 47.479 -26.754 49.299 -26.754 51.239 C -26.754 53.179 -26.284 54.999 -25.464 56.619 L -21.484 53.529 Z"
              />
              <path
                fill="#EA4335"
                d="M -14.754 43.989 C -12.984 43.989 -11.404 44.599 -10.154 45.789 L -6.734 42.369 C -8.804 40.429 -11.514 39.239 -14.754 39.239 C -19.444 39.239 -23.494 41.939 -25.464 45.859 L -21.484 48.949 C -20.534 46.099 -17.884 43.989 -14.754 43.989 Z"
              />
            </g>
          </svg>
        </div>
        <div
          class="text-left min-h-full mx-auto text-gray-600 font-medium self-center w-full"
        >
          Log in with Google
        </div>
      </div>
    </a>
    <!-- End login with Google -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        email: '',
        password: '',
      },
      submitting: false,
    }
  },

  computed: {
    googleLink() {
      let url = `https://api.wannahookup.com/api/login/google?s1=${this.$store.state.campaign.s1}`
      url += `&s2=${this.$store.state.campaign.s2}`
      url += `&s3=${this.$store.state.campaign.s3}`
      url += `&s4=${this.$store.state.campaign.s4}`
      url += `&s5=${this.$store.state.campaign.s5}`
      url += `&gclid=${this.$store.state.campaign.gclid}`
      url += `&tracking_id=${this.$store.state.campaign.tracking_id}`

      return url
    },
  },

  methods: {
    async onSubmit() {
      if (!(await this.$refs.form.validate())) {
        return false
      }

      try {
        this.submitting = true
        await this.$auth.login({
          data: {
            email: this.form.email,
            password: this.form.password,
          },
        })
      } catch (err) {
        if (err.response.status === 401) {
          this.$refs.form.setErrors({
            email: 'Invalid email/password combination.',
          })
        }

        if (err.response.status === 480) {
          this.$refs.form.setErrors({
            email: 'Please verify your email.',
          })
        }
      }
      this.submitting = false
    },
  },
}
</script>
<style lang="scss">
.separator-text {
  display: grid;
  grid-template-columns: 1fr max-content 1fr;
  grid-column-gap: 1.2rem;
  align-items: center;

  &::before,
  &::after {
    content: '';
    display: block;
    height: 1px;
    background-color: #d1d5db;
  }
}
</style>
