import Vue from 'vue'
import VueI18n from 'vue-i18n'
import messages from '../utils/lang'

Vue.use(VueI18n)

export default ({ app }) => {
  app.i18n = new VueI18n({
    locale: 'en',
    fallbackLocale: 'en',
    messages: messages,
  })
}
