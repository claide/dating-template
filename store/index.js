const authPlugin = (store) => {
  store.subscribe((mutation, state) => {
    if (mutation.type === 'auth/SET') {
      store.commit('authentication/setUser', state.auth.user)
      store.commit('authentication/setLoggedIn', state.auth.loggedIn)
    }
  })
}

export const plugins = [authPlugin]
