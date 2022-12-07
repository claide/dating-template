import forEach from 'lodash/forEach'
import orderBy from 'lodash/orderBy'
import uniqBy from 'lodash/uniqBy'
import findIndex from 'lodash/findIndex'
import UserConversation from '@/models/UserConversation'

export const state = () => ({
  list: [],
  listMeta: {
    currentPage: 0,
    lastPage: 1,
    total: 0,
  },
  activeConversation: {
    chatmate: {},
  },
})

export const getters = {
  sortedConversationList(state) {
    return orderBy(uniqBy(state.list, 'id'), 'timestamp', 'desc')
  },
  loaded(state) {
    return !!state.list.length
  },
  hasNextPage(state) {
    return state.listMeta.currentPage < state.listMeta.lastPage
  },
}

export const mutations = {
  pushToList(state, conversations) {
    forEach(conversations, (convo) => {
      const i = findIndex(state.list, (c) => c.id === convo.id)
      if (i !== -1) {
        state.list.splice(i, 1, convo)
      } else {
        state.list.push(convo)
      }
    })
  },
  emptyList(state) {
    state.list = []
  },
  setListMeta(state, meta) {
    state.listMeta = meta
  },
  removeConversation(state, id) {
    const i = findIndex(state.list, (convo) => convo.id === id)
    if (i !== -1) {
      state.list.splice(i, 1)
    }
    state.activeConversation = {
      chatmate: {},
    }
  },
  setActiveConversation(state, conversation) {
    state.activeConversation = conversation
  },
  setConversationLastMessage(state, message) {
    const i = findIndex(
      state.list,
      (_con) => _con.id === message.conversation_id
    )
    if (i > -1) {
      const convo = state.list[i]
      convo.last_message = message
      convo.updated_at = message.updated_at
      state.list.splice(i, 1, convo)
    }
  },
  addConversationFromMessageNotification(state, message) {
    const convo = message.conversation
    convo.viewer = message.to_id
    delete message.conversation
    convo.last_message = message
    const i = findIndex(state.list, (_con) => _con.uuid === convo.uuid)
    if (i === -1) {
      state.list.push(new UserConversation(convo))
    } else {
      state.list.splice(i, 1, new UserConversation(convo))
    }
  },
}

export const actions = {
  async getConversations({ commit, state }, params) {
    const query = await UserConversation.include(
      'recipient.approved_primary',
      'initiator.approved_primary',
      'last_message.from'
    )
      .page(params.page || 1)
      .limit(10)

    if (params.username) {
      query.where('username', params.username)
    }

    if (params.onlyRead) {
      commit('emptyList')
      query.where('only_read', true)
    }

    if (params.onlyUnread) {
      commit('emptyList')
      query.where('only_unread', true)
    }

    const res = await query.get()

    commit('pushToList', res.data)
    commit('setListMeta', {
      currentPage: res.meta.current_page,
      lastPage: res.meta.last_page,
      total: res.meta.total,
    })
  },
  async getConversation({ commit, state }, uuid) {
    const i = findIndex(state.list, (convo) => convo.uuid === uuid)
    if (i !== -1) {
      commit('setActiveConversation', state.list[i])
    } else {
      const convo = await UserConversation.include(
        'recipient.approved_primary',
        'initiator.approved_primary'
      ).$find(uuid)
      commit('setActiveConversation', convo)
    }
  },
}
