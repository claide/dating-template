import * as Fingerprint2 from '@fingerprintjs/fingerprintjs'

export const state = () => ({
  deviceId: null,
})

export const actions = {
  setDeviceId({ commit, state }) {
    if (!state.deviceId) {
      if (window.requestIdleCallback) {
        requestIdleCallback(() => {
          Fingerprint2.get((components) => {
            const deviceId = getDeviceId(components)
            commit('setDeviceId', deviceId)
          })
        })
      } else {
        setTimeout(() => {
          Fingerprint2.get((components) => {
            const deviceId = getDeviceId(components)
            commit('setDeviceId', deviceId)
          })
        }, 500)
      }
    }
  },
}

export const mutations = {
  setDeviceId(state, deviceId) {
    state.deviceId = deviceId
  },
}

function getDeviceId(componests) {
  const values = componests.map((component) => {
    return component.value
  })
  return Fingerprint2.x64hash128(values.join(''), 31)
}
