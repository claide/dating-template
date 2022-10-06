export default function ({ $axios, store }) {
  $axios.onError((error) => {
    if (error && error.response && error.response.status === 422) {
      store.dispatch('validation/setErrors', error.response.data.errors)
    }

    if (error && error.response) {
      store.dispatch('validation/failedLogin', error.response.status)
    }

    return Promise.reject(error)
  })

  $axios.onResponse(() => {
    // alert('test')
  })

  $axios.onRequest((config) => {
    store.dispatch('fingerprint/setDeviceId')
    config.headers.common['Site-key'] = 'uylux4m2ynut356'
    config.headers.common['Device-ID'] = store.state.fingerprint.deviceId
    // store.dispatch('validation/clearErrors')
  })
}
