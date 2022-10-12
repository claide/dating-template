import Vue from 'vue'
import VeeValidate, { Validator } from 'vee-validate'
import { first, isArray } from 'lodash'

Vue.use(VeeValidate, {
  trigger: 'blur|input',
})

const dict = {
  custom: {
    email: {
      email: 'Please fill in a valid email address',
    },
    city: {
      required: () => 'Please fill in your city',
    },
  },
}
Validator.localize('en', dict)

export default ({ app }) => {
  Vue.prototype.$setErrorsFromResponse = function (errorResponse) {
    // only allow this function to be run if the validator exists
    if (!this.$validator) {
      return
    }

    // clear errors
    this.$validator.errors.clear()

    // check if errors exist
    if (!errorResponse.errors) {
      return
    }

    const errorFields = Object.keys(errorResponse.errors)

    // insert laravel errors
    errorFields.map((field) => {
      const error = errorResponse.errors[field]
      let msg = ''

      if (isArray(error)) {
        msg = first(error)
      } else {
        msg = error
      }

      this.$validator.errors.add({
        field,
        msg: app.i18n.tc(msg, null, null, {
          attribute: field,
        }),
      })
    })
  }
}
