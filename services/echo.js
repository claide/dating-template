import Echo from 'laravel-echo'
window.Pusher = require('pusher-js')

const config = {
  broadcaster: 'pusher',
  key: process.env.pusherAppKey,
  wsHost: process.env.pusherAppHost,
  wsPort: process.env.pusherAppPort,
  wssHost: process.env.pusherAppHost,
  wssPort: process.env.pusherAppPort,
  authEndpoint: process.env.wsAuthEndpoint,
  disableStats: true,
  auth: {
    headers: {
      Authorization: '',
      Accept: 'application/json',
    },
  },
}

let echoInstance = null

export default function (auth) {
  config.auth.headers.Authorization = auth.$storage._state['_token.local']
  if (echoInstance) {
    return echoInstance
  } else {
    echoInstance = new Echo(config)
    return echoInstance
  }
}
