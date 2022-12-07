<template>
  <!-- Begin content -->
  <section class="container max-w-7xl px-4 sm:px-6 py-2 mx-auto">
    <div
      class="bg-white dark:bg-clay rounded w-full lg:w-[50%] mx-auto shadow-[0_8px_30px_rgb(0,0,0,0.12)]"
    >
      <AuthChatConversationsCard
        :has-seleted="hasSeleted"
        @selected="convoSelected"
      />
    </div>
  </section>
  <!-- End content -->
</template>

<script>
export default {
  layout: 'auth',
  middleware: 'auth',

  data() {
    return {
      selectedConversation: null,
    }
  },
  head() {
    return {
      title: 'Messages',
    }
  },

  computed: {
    hasSeleted() {
      return !!this.selectedConversation
    },
    isMobile() {
      return screen.width <= 760
    },
  },

  methods: {
    convoSelected(convo) {
      this.selectedConversation = convo
    },
  },
}
</script>
