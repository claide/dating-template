<template>
  <ValidationObserver ref="form">
    <form @submit.prevent="submit">
      <div class="mb-4">
        <ValidationProvider
          v-slot="{ errors }"
          name="Password"
          rules="required|min:6"
        >
          <BaseAppInput
            v-model="form.new_password"
            type="password"
            label="New password"
            :errors="errors || $t(errors)"
            placeholder="New password"
          />
        </ValidationProvider>
      </div>
      <div class="text-right">
        <BaseAppButton
          :disabled="form.$busy"
          :class="{ 'cursor-not-allowed': form.$busy }"
          type="danger"
          size="md"
          class="flex py-3 pr-4 pl-3 bg-primary hover:bg-yellow-500"
          @click.prevent="submit"
        >
          <IconLoader
            v-if="form.$busy"
            class="animate-spin -ml-1 mr-3 h-5 w-5 text-white fill-current"
          />
          Change password
        </BaseAppButton>
      </div>
    </form>
  </ValidationObserver>
</template>

<script>
import IconLoader from '@/assets/svg/loader.svg?inline'
export default {
  name: 'ChangePasswordForm',
  components: {
    IconLoader,
  },
  data() {
    return {
      form: {
        new_password: '',
      },
    }
  },
  methods: {
    submit() {
      this.$refs.form.validate().then((valid) => {
        if (valid) {
          this.form.$busy = true
          this.$axios
            .put('change-password', this.form)
            .then(() => {
              this.form.$busy = false
              this.$toast.show('Settings updated successfully.', {
                duration: 2000,
                type: 'success',
                position: 'top-center',
              })
            })
            .catch((err) => {
              if (err.response && err.response.status === 422) {
                this.$refs.form.setErrors({
                  new_password: [err.response.data.errors],
                })
                console.log(err.response.data.errors)
                // this.$refs.form.setErrors(err.response.data.errors)
                // this.form.$setErrors(err.response.data.errors)
                this.form.$busy = false
              }
            })
        }
      })
    },
  },
}
</script>

<style></style>
