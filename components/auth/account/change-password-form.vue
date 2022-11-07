<template>
  <form @submit.prevent="submit">
    <div class="mb-4">
      <label
        for="new_password"
        class="block mb-2 font-medium text-gray-900 dark:text-slate-400 text-sm"
        >New password</label
      >
      <input
        v-validate="'required|min:6'"
        :class="
          errors.has('new_password')
            ? 'border-red-600 focus:ring-red-400 focus:border-red-400'
            : 'border-slate-100 dark:border-gray-800 focus:ring-yellow-400 focus:border-yellow-400'
        "
        v-model="form.new_password"
        data-vv-validate-on="custom"
        data-vv-as="new password"
        type="password"
        name="new_password"
        class="bg-slate-100 focus:bg-white border dark:text-gray-50 dark:bg-[#1D2636] text-gray-900 text-sm rounded block w-full p-2.5 outline-none"
      />
      <span class="text-sm text-red-600">{{
        errors.first('new_password')
      }}</span>
    </div>
    <div class="text-right">
      <button
        :disabled="form.$busy"
        :class="{ 'cursor-not-allowed': form.$busy }"
        type="submit"
        class="flex py-3 pr-4 pl-3 bg-primary hover:bg-yellow-500 text-black rounded font-medium text-md shadow mb-6 ml-auto"
      >
        <svg
          v-if="form.$busy"
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
        Change password
      </button>
    </div>
  </form>
</template>

<script>
export default {
  name: 'ChangePasswordForm',
  data() {
    return {
      form: new Form({
        new_password: '',
      }),
    }
  },
  methods: {
    submit() {
      this.$validator.validate().then((valid) => {
        if (valid) {
          this.form.$clearErrors()
          this.form.$busy = true
          this.$axios
            .put('change-password', this.form.$data())
            .then((res) => {
              this.form.$busy = false
              this.form.$reset()
              this.$toast.show('Password updated successfully.', {
                duration: 2000,
                type: 'success',
                position: 'top-center',
              })
            })
            .catch((err) => {
              if (err.response && err.response.status === 422) {
                this.$setErrorsFromResponse(err.response.data)
              }
              this.form.$busy = false
            })
        }
      })
    },
  },
}
</script>

<style></style>
