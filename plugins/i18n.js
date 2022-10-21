import Vue from 'vue'
import VueI18n from 'vue-i18n'
import messages from '../utils/lang'

Vue.use(VueI18n)

console.log(messages)

export default ({ app }) => {
  app.i18n = new VueI18n({
    locale: 'en',
    messages: messages,
  })
}
