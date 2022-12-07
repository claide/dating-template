<template>
  <div
    class="container max-w-7xl px-0 md:px-4 sm:px-6 mx-auto h-full min-h-[calc(100vh-200px)] lg:pt-6 lg:pb-12"
  >
    <AuthChatConversation v-if="conversation" :conversation="conversation" />
    <div v-else style="height: 600px"></div>
  </div>
</template>

<script>
import UserConversation from '@/models/UserConversation'

export default {
  layout: 'auth',

  middleware: 'auth',

  data() {
    return {
      conversation: null,
    }
  },

  created() {
    this.fetchConversation()
  },

  methods: {
    async fetchConversation() {
      const { data } = await UserConversation.include(
        'recipient.approved_primary',
        'initiator.approved_primary'
      ).find(this.$route.params.id)
      this.conversation = new UserConversation(data)
    },
  },
}
</script>

<style></style>
