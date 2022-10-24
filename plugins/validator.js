import Vue from 'vue'
// import { required, email } from 'vee-validate/dist/rules'
import {
  ValidationProvider,
  ValidationObserver,
} from 'vee-validate/dist/vee-validate.full.esm'

import { first, isArray } from 'lodash'

export default ({ app }) => {
  Vue.prototype.$setErrorsFromResponse = (errorResponse) => {
    // check if error exist
    if (!errorResponse.errors) return

    const errorFields = Object.keys(errorResponse.errors)

    return errorFields.map((field) => {
      const error = errorResponse.errors[field]
      let msg = ''

      if (isArray(error)) {
        msg = first(error)
      } else {
        msg = error
      }

      return app.i18n.tc(msg)
    })
  }
}

// Add rules
// extend('required', {
//   ...required,
//   message: `{_field_} is required`,
// })

// extend('email', {
//   ...email,
//   message: 'Please fill in a valid email address',
// })

// Global components
Vue.component('ValidationObserver', ValidationObserver)
Vue.component('ValidationProvider', ValidationProvider)
