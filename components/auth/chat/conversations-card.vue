<template>
  <div class="min-h-[15rem] lg:min-h-[30rem]">
    <div class="flex items-center leading-none p-4 md:p-8">
      <h2 class="text-xl font-semibold leading-none mr-3 dark:text-white">
        Messages
      </h2>
      <span class="bg-primary text-black text-sm mr-2 px-2.5 py-0.5 rounded">{{
        meta.total
      }}</span>
    </div>

    <div
      v-if="!sortedConversations.length && !loading"
      class="flex flex-col min-h-[10rem] lg:min-h-[20rem] justify-center text-center p-4 md:p-8"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-16 w-16 md:h-24 md:w-24 text-slate-400 mx-auto"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        stroke-width="1.5"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
        />
      </svg>
      <h3 class="text-lg mb-3">No Messages</h3>
      <div class="text-slate-400 text-sm">
        When you have messages, you'll see them here
      </div>
    </div>

    <!-- Begin messages list -->
    <transition-group :css="false" name="animatedlist">
      <AuthChatConversationItem
        v-for="convo in sortedConversations"
        :key="convo.id"
        :conversation="convo"
      />
    </transition-group>
    <!-- End messages list -->

    <div class="flex justify-center py-4">
      <button
        v-show="hasNextPage"
        :disabled="loading"
        class="bg-gray-200 p-2 rounded text-black mx-auto inline-flex items-center text-xs lg:text-sm"
        @click.prevent="loadMore"
      >
        <svg
          v-if="loading"
          class="animate-spin -ml-1 mr-3 h-5 w-5 text-black"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            class="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            stroke-width="4"
          ></circle>
          <path
            class="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg>
        Load More
      </button>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState, mapGetters, mapMutations } from 'vuex'
import { find, debounce } from 'lodash'
import EventBus from '@/services/eventBus'

export default {
  props: {
    hasSeleted: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      loading: false,
      search: null,
      dropMore: false,
    }
  },
  computed: {
    ...mapState({
      meta: (state) => state.conversation.listMeta,
    }),
    ...mapGetters({
      hasNextPage: 'conversation/hasNextPage',
      sortedConversations: 'conversation/sortedConversationList',
    }),
    isMobile() {
      return screen.width <= 760
    },
  },
  watch: {
    $route() {
      this.setSelectedConversation()
    },
  },
  created() {
    this.fetchConversations({ page: 1 })
  },
  mounted() {
    EventBus.$on('NEW_NOTIFICATION', (noti) => {
      if (noti.action_type === 'MESSAGE_RECEIVED') {
        this.fetchConversations({ page: 1 })
      }
    })
  },
  methods: {
    ...mapActions({
      getConversations: 'conversation/getConversations',
    }),
    ...mapMutations({
      emptyList: 'conversation/emptyList',
    }),
    async fetchConversations(params) {
      this.loading = true
      await this.getConversations(params)
      this.loading = false
      this.setSelectedConversation()
    },
    searchChange: debounce(function () {
      this.emptyList()
      this.fetchConversations({ username: this.search })
    }, 600),
    loadMore(event) {
      if (this.hasNextPage) {
        this.fetchConversations({ page: this.meta.currentPage + 1 })
      }
    },
    setSelectedConversation() {
      if (this.$route.query.conversation) {
        const convo = find(this.sortedConversations, {
          uuid: this.$route.query.conversation,
        })
        if (convo) {
          this.$emit('selected', convo)
        }
      } else if (
        !this.isMobile &&
        !this.hasSeleted &&
        this.sortedConversations.length > 0
      ) {
        this.$emit('selected', this.sortedConversations[0])
      }
    },
  },
}
</script>

<style></style>
