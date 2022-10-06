import Vue from 'vue'

Vue.filter('defaultAvatarThumb', function (src, gender = 'male') {
  if (!src) {
    // eslint-disable-next-line
    if (gender == 'Male') {
      return 'male'
    }
    return 'female'
  }
  return src
})

Vue.filter('preferences', function (string) {
  return string.toLowerCase().replace(/_/g, ' ')
})

Vue.filter('cityName', function (city) {
  try {
    const suffix = city.split('-')[1]
    const simplified = city.split('-')[0]
    if (/^[A-Z]*$/.test(suffix)) {
      return simplified
    }
  } catch (e) {}

  return city
})
