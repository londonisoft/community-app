import Vue from 'vue'
import VueI18n from 'vue-i18n'

Vue.use(VueI18n)
const mergeLocaleMessage = (localeMessages) => {
  const messages = {}

  localeMessages.keys().forEach(key => {
    const matched = key.match(/([A-Za-z0-9-_]+)\./i)
    if (matched && matched.length > 1) {
      const locale = matched[1]
      messages[locale] = localeMessages(key)
    }
  })

  return messages
}

function loadLocaleMessages () {
  let locales = require.context('./locales', true, /[A-Za-z0-9-_,\s]+\.json$/i)
  const defaultMessages = mergeLocaleMessage(locales)
  const allMessages = {
    bn: Object.assign({}, defaultMessages.bn),
    en: Object.assign({}, defaultMessages.en)
  }
  return allMessages
}

export default new VueI18n({
  locale: process.env.VUE_APP_I18N_LOCALE || 'en',
  fallbackLocale: process.env.VUE_APP_I18N_FALLBACK_LOCALE || 'en',
  messages: loadLocaleMessages()
})
