import Vue from 'vue'
import moment from 'moment'
import i18n from '../i18n'
import Store from '../store/index'

function formatNumber (value) {
  return Number(value).toLocaleString()
}
const formatForDate = 'DD/MM/YYYY'

function dateFormat (value, format = formatForDate) {
    require('moment/min/locales.min.js')
    moment.locale(i18n.locale)
    return moment(value).format(format)
}

Vue.filter('dateFormat', function (value) {
  return dateFormat(value)
})


export { dateFormat }
