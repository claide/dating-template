import Vue from 'vue'
import { required, email } from 'vee-validate/dist/rules'
import {
  ValidationProvider,
  ValidationObserver,
  extend,
  configure,
} from 'vee-validate'
import { i18n } from './i18n'
// import { first, isArray } from 'lodash'

configure({
  // @ts-ignore
  defaultMessage: (field, values) => {
    // override the field name.
    values._field_ = i18n.t(`fields.${field}`)

    return i18n.t(`validation.${values._rule_}`, values)
  },
})

// Add rules
extend('required', {
  ...required,
  message: `{_field_} is required`,
})

extend('email', {
  ...email,
  message: 'Please fill in a valid email address',
})

// Global components
Vue.component('ValidationObserver', ValidationObserver)
Vue.component('ValidationProvider', ValidationProvider)

// import Vue from 'vue'
// import VeeValidate, { Validator } from 'vee-validate'
// import { first, isArray } from 'lodash'

// Vue.use(VeeValidate, {
//   trigger: 'blur|input',
// })

// const dict = {
//   custom: {
//     email: {
//       email: 'Please fill in a valid email address',
//     },
//     city: {
//       required: () => 'Please fill in your city',
//     },
//   },
// }

// Validator.localize('en', dict)

// export default ({ app }) => {
//   Vue.prototype.$setErrorsFromResponse = function (errorResponse) {

// only allow this function to be run if the validator exists
// if (!this.$validator) {
//   return
// }

// clear errors
// this.$validator.errors.clear()

// check if errors exist
// if (!errorResponse.errors) {
//   return
// }

// const errorFields = Object.keys(errorResponse.errors)

// insert laravel errors
// eslint-disable-next-line array-callback-return
// errorFields.map((field) => {
//   let error = errorResponse.errors[field]
//   let msg = ''

//   if (isArray(error)) {
//     msg = first(error)
//   } else {
//     msg = error
//   }

//   this.$validator.errors.add({
//     field,
//     msg: app.i18n.tc(msg, null, null, {
//       attribute: field,
//     }),
//   })
// })
// }
// }
