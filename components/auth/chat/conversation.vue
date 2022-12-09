<template>
  <div
    class="bg-white dark:bg-clay md:rounded w-full lg:w-1/2 mx-auto p-4 md:p-8 shadow-[0_8px_30px_rgb(0,0,0,0.12)]"
  >
    <div class="flex items-center justify-between pb-4 md:pb-8">
      <a
        class="text-gray-900 dark:text-slate-400 cursor-pointer"
        @click="$router.back()"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          width="24"
          height="24"
          class="fill-current"
        >
          <path fill="none" d="M0 0h24v24H0z" />
          <path
            d="M7.828 11H20v2H7.828l5.364 5.364-1.414 1.414L4 12l7.778-7.778 1.414 1.414z"
          />
        </svg>
      </a>

      <div class="flex items-center">
        <span class="dark:text-slate-200 text-lg md:text-xl">{{
          conversation.chatmate.username
        }}</span>
        <span
          :class="
            conversation.chatmate.is_online ? 'bg-green-500' : 'bg-slate-400'
          "
          class="h-3 w-3 ml-2 rounded-full"
        ></span>
      </div>

      <a href class="text-red-500" @click.prevent="confirmDeleteConversation()">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          width="24"
          height="24"
          class="fill-current"
        >
          <path fill="none" d="M0 0h24v24H0z" />
          <path
            d="M17 6h5v2h-2v13a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V8H2V6h5V3a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v3zm1 2H6v12h12V8zm-9 3h2v6H9v-6zm4 0h2v6h-2v-6zM9 4v2h6V4H9z"
          />
        </svg>
      </a>
    </div>

    <div
      v-if="showCreditWarning"
      class="p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg dark:bg-red-200 dark:text-red-800"
      role="alert"
    >
      <span class="font-medium">Oops!</span> Insufficient balance. Please top up
      <a href="/credits/buy" class="text-blue-600">credit</a>.
    </div>

    <div
      ref="convo"
      class="h-[350px] overflow-y-auto bg-slate-100 dark:bg-[#1D2636] p-2 md:p-4 rounded"
      @scroll="showLoadMore()"
    >
      <div class="text-center">
        <button
          v-if="showLoadMoreButton"
          :disabled="loading"
          class="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded p-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700 text-sm"
          @click="loadMore"
        >
          <svg
            v-if="loading"
            aria-hidden="true"
            role="status"
            class="inline mr-2 w-4 h-4 text-white animate-spin"
            viewBox="0 0 100 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="#E5E7EB"
            />
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="currentColor"
            />
          </svg>
          Load more
        </button>
      </div>
      <!-- Begin convo -->
      <div>
        <template v-for="msg in sortedMessages">
          <AuthChatMessageItem
            :key="msg.id"
            :message="msg"
            :is-mine="isMine(msg.from_id)"
          />
        </template>
      </div>
    </div>

    <AuthChatMessageBox :conversation="conversation" />
  </div>
</template>

<script>
import { each, find, orderBy, filter } from 'lodash'
import { mapMutations } from 'vuex'
import echo from '@/services/echo'
import Message from '@/models/Message'

let echoInstance = null

export default {
  props: {
    conversation: {
      type: Object,
      required: true,
    },
  },

  data() {
    return {
      messages: [],
      meta: {},
      loading: false,
      showLoadMoreButton: false,
    }
  },

  computed: {
    initialMessage() {
      if (this.messages.length === 1) {
        return this.messages[0]
      }
      return null
    },
    sortedMessages() {
      return orderBy(this.messages, ['id'], 'asc')
    },
    hasNextPage() {
      return this.meta.current_page < this.meta.last_page
    },
    showCreditWarning() {
      return this.$auth.user.data.credits < 50
    },
  },

  mounted() {
    echoInstance = echo(this.$auth)
    this.reset()
    this.fetchMessages()
    this.subscribeToChannel()
  },

  destroyed() {
    this.unsubscribeToChannel(this.conversation.uuid)
  },

  methods: {
    ...mapMutations({
      removeConversation: 'conversation/removeConversation',
    }),

    async fetchMessages(page = 1, scroll) {
      this.loading = true
      const res = await this.conversation
        .messages()
        .include('from.approved_primary', 'to')
        .limit(10)
        .page(page)
        .get()

      this.pushMessages(res.data)
      this.meta = await res.meta
      this.scrollMessages(scroll)
      this.loading = false
    },

    async loadMore() {
      await this.fetchMessages(this.meta.current_page + 1, 'top')
      this.$refs.convo.scrollTop = 1
      this.showLoadMore()
    },

    async newMessage(message) {
      if (
        !this.isMsgExist(message.id) &&
        this.conversation.id === message.conversation_id
      ) {
        if (!(message instanceof Message)) {
          message = new Message(message)
        }
        this.messages.push(message)
        await this.$store.commit(
          'conversation/setConversationLastMessage',
          message
        )
        this.scrollMessages()
      }
    },

    pushMessages(messages) {
      each(messages, (msg) => {
        if (!this.isMsgExist(msg.id)) {
          this.messages.push(msg)
        }
      })
      this.markTriggerMessageAsRead()
      this.markMessagesAsRead()
    },
    isMsgExist(id) {
      return !!find(this.messages, { id: id })
    },

    reset() {
      this.messages = []
      this.meta = {}
    },

    isMine(from) {
      return from === this.conversation.viewer
    },

    confirmDeleteConversation() {
      this.$buefy.dialog.confirm({
        title: 'Deleting conversation',
        message:
          'Are you sure you want to <b>delete</b> this conversation ? This action cannot be undone.',
        confirmText: 'Delete Conversation',
        type: 'is-danger',
        hasIcon: true,
        onConfirm: () => this.deleteConversation(),
      })
    },

    async deleteConversation() {
      await this.conversation.delete()
      this.removeConversation(this.conversation.id)
      this.$emit('deleted')
      this.$router.replace('/messages')
    },

    async markMessagesAsRead() {
      const unreadMessages = filter(this.messages, (msg) => !msg.read)

      if (unreadMessages && unreadMessages.length > 0) {
        const unreadMessagesId = unreadMessages.map((msg) => msg.id)
        const { data } = await this.$axios.put('messages/read', {
          messages: unreadMessagesId,
        })
        this.$store.commit(
          'authentication/setUnreadMessagesCount',
          data.data.unread_messages_count
        )
      }
    },

    subscribeToChannel() {
      echoInstance
        .join(`chat.conversation.${this.conversation.uuid}`)
        .listen('MessageSent', (e) => {
          this.newMessage(e.message)
        })
    },

    unsubscribeToChannel(convoUuid) {
      if (echoInstance) {
        echoInstance.leave(`chat.conversation.${convoUuid}`)
      }
    },

    scrollMessages(scroll) {
      if (scroll === 'top') return (this.$refs.convo.scrollTop = 0)
      return (this.$refs.convo.scrollTop = this.$refs.convo.scrollHeight)
    },

    markTriggerMessageAsRead() {
      if (
        this.initialMessage &&
        this.initialMessage.type === 'trigger' &&
        !this.initialMessage.read_at
      ) {
        this.$axios.post(`/triggers/messages/${this.initialMessage.id}/read`)
      }
    },

    showLoadMore() {
      if (this.hasNextPage && this.$refs.convo.scrollTop === 0)
        return (this.showLoadMoreButton = true)
      return (this.showLoadMoreButton = false)
    },
  },
}
</script>
