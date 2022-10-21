import Vue from 'vue'
import { required, email } from 'vee-validate/dist/rules'
import {
  ValidationProvider,
  ValidationObserver,
  extend,
  configure,
} from 'vee-validate'

export default ({ app }) => {
  configure({
    defaultMessage: (_, values) =>
      app.i18n.t(`validations.validation.${values._rule_}`, values),
  })
}

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
