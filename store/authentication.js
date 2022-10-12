export const getters = {
  authenticated(state) {
    return state.loggedIn
  },

  user(state) {
    return state.user
  },

  unreadMessagesCount(state) {
    if (state.user && state.user.data) {
      return state.user.data.unread_messages_count
    } else {
      return 0
    }
  },
}

export const state = () => ({
  busy: false,
  loggedIn: false,
  stragegy: 'local',
  user: false,
})

export const mutations = {
  setUser(state, user) {
    state.user = user
  },

  setLoggedIn(state, loggedIn) {
    state.loggedIn = loggedIn
  },

  subtractCredits(state, credit = 1) {
    state.user.data.credits -= credit
  },
  setCredits(state, credit) {
    state.user.data.credits = credit
  },
  setUnreadMessagesCount(state, count = 0) {
    state.user.data.unread_messages_count = count
  },
  incrementUnreadMessagesCount(state, count = 1) {
    state.user.data.unread_messages_count += count
  },
  complete(state) {
    state.user.data.profile_complete = true
  },
  setPreference(state, preferences = {}) {
    state.user.data.preferences = {
      ...state.user.data.preferences,
      ...preferences,
    }
  },
  setUsername(state, username) {
    state.user.data.username = username
  },
  setNewVisitorsCount(state, value = 0) {
    state.user.data.new_visitors_count = value
  },
  setAccountDeletion(state, accountDeletion = false) {
    state.user.data.has_account_deletion_promo = accountDeletion
  },
}
