<template>
  <!-- Note: Add class .read to ce-list-item for already read messages  -->
  <div
    :class="{ 'is-read': isRead }"
    class="border-b-2 dark:border-gray-900 cursor-pointer"
    @click.prevent="recordUserMessageAction"
  >
    <a
      class="flex items-center w-full px-4 md:px-8 py-2 md:py-4"
      @click.prevent.self="$router.push('/messages/' + conversation.uuid)"
    >
      <div class="ce-avatar">
        <router-link
          v-if="conversation.chatmate"
          :to="'/profile/' + conversation.chatmate.uuid"
        >
          <AuthAvatar
            :src="
              conversation.chatmate.approved_primary_photo
                ? conversation.chatmate.approved_primary_photo.url
                : null
            "
            :gender="conversation.chatmate.gender"
            class="h-9 w-9 md:h-14 md:w-14 mr-4"
          />
        </router-link>
      </div>
      <div
        v-if="conversation.chatmate"
        class="mr-4 flex flex-col flex-1"
        @click="$router.push('/messages/' + conversation.uuid)"
      >
        <span class="text-xs md:text-base dark:text-white">{{
          conversation.chatmate.username
        }}</span>
        <span class="text-primary text-xs md:text-sm mb-1 lg:mb-2">
          {{ conversation.chatmate.lives_in }}
        </span>
        <div
          class="break-all mr-4"
          @click="$router.push('/messages/' + conversation.uuid)"
        >
          <template v-if="lastMsg">
            <template v-if="lastMsg.type === 'wink'">
              <figure v-if="lastMsg.body == 'wink'" class="h-7 w-7">
                <WinkIcon />
              </figure>
              <figure v-if="lastMsg.body == 'cool'" class="h-7 w-7">
                <CoolIcon />
              </figure>
              <figure v-if="lastMsg.body == 'in-love'" class="h-7 w-7">
                <InLoveIcon />
              </figure>
              <figure v-if="lastMsg.body == 'surprised'" class="h-7 w-7">
                <SurprisedIcon />
              </figure>
            </template>
            <span
              v-else
              :inner-html.prop="lastMsg.body | truncate(30)"
              class="text-xs md:text-base text-gray-500 dark:text-gray-200"
            ></span>
          </template>
        </div>
      </div>
      <template v-if="lastMsg">
        <div class="flex flex-col items-end ml-auto">
          <small
            v-if="lastMsg"
            class="text-slate-400 dark:text-slate-200 text-xs mb-1"
          >
            <Realtime
              v-if="conversation.last_message"
              :time="conversation.updated_at"
            ></Realtime>
          </small>
          <small v-else class="text-slate-400">No messages</small>
          <BaseAppButton
            tag="a"
            variant="primary"
            class="text-xs"
            size="sm"
            @click.native="$router.push('/messages/' + conversation.uuid)"
          >
            {{ isRead ? 'Read' : 'Unread' }}
          </BaseAppButton>
        </div>
      </template>
    </a>
  </div>
</template>

<script>
import { cloneDeep } from 'lodash'
import Message from '@/models/Message'
import WinkIcon from '@/assets/svg/winks/wink.svg?inline'
import CoolIcon from '@/assets/svg/winks/cool.svg?inline'
import InLoveIcon from '@/assets/svg/winks/in-love.svg?inline'
import SurprisedIcon from '@/assets/svg/winks/surprised.svg?inline'

export default {
  components: {
    WinkIcon,
    CoolIcon,
    InLoveIcon,
    SurprisedIcon,
  },
  filters: {
    truncate(text, stop, clamp) {
      if (text) {
        return text.slice(0, stop) + (stop < text.length ? clamp || '...' : '')
      }
      return ''
    },
  },
  props: {
    conversation: {
      type: Object,
      required: true,
    },
  },
  computed: {
    lastMsg() {
      if (this.conversation.last_message) {
        return new Message(this.conversation.last_message)
      }
      return null
    },
    isRead() {
      if (this.lastMsg) {
        return this.lastMsg.read || this.lastMsg.fromMe
      }
      return false
    },
  },
  methods: {
    read() {
      this.$axios.put('messages/read', { all: true }).then((res) => {
        this.$store.commit(
          'authentication/setUnreadMessagesCount',
          res.data.unread_messages_count
        )
        if (this.lastMsg) {
          const msg = cloneDeep(this.lastMsg)
          msg.read_at = new Date()
          this.$store.commit('conversation/setConversationLastMessage', msg)
        }
      })
    },
    unread() {
      this.$axios
        .put('messages/unread', { message: this.lastMsg.id })
        .then((res) => {
          this.$store.commit(
            'authentication/setUnreadMessagesCount',
            res.data.unread_messages_count
          )
          if (this.lastMsg) {
            const msg = cloneDeep(this.lastMsg)
            msg.read_at = null
            this.$store.commit('conversation/setConversationLastMessage', msg)
          }
        })
    },

    recordUserMessageAction() {
      this.$axios.put('action/messages/read', {
        conversationId: this.conversation.id,
      })
    },
  },
}
</script>

<style></style>
