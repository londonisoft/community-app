import Vue from 'vue'
import moment from 'moment'
import i18n from '../i18n'
import Store from '../store/index'

function formatNumber (value) {
  return Number(value).toLocaleString()
}
function capitalize (string) {
    return string.charAt(0).toUpperCase() + string.slice(1)
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
function snakeToWords (string) {
    const words = string.split('_')
    const capitalized = words.map(word => capitalize(word))
    return capitalized.join(' ')
}

Vue.filter('snakeToWords', function (value) {
  return snakeToWords(value)
})


export { dateFormat, snakeToWords, formatNumber}
