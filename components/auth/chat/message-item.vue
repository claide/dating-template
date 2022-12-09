<template>
  <div :class="isMine ? '' : 'flex'" class="p-2 md:p-3">
    <router-link :to="'/profile/' + message.from.uuid">
      <div v-if="!isMine" class="relative">
        <AuthAvatar
          :src="message.from.approved_primary_photo_thumb"
          :gender="message.from.gender"
          type="avatar"
          class="flex items-center relative h-8 w-8 md:h-12 md:w-12"
        />
      </div>
    </router-link>
    <div
      :class="
        isMine
          ? 'float-right max-w-[94%] md:max-w-[60%]'
          : 'float-left max-w-[96%] md:max-w-[80%] ml-2'
      "
    >
      <div
        v-if="messageBody && message.type !== 'wink'"
        class="bg-white dark:bg-gray-600 dark:text-slate-200 p-2 md:p-3 rounded break-words relative text-sm leading-normal"
      >
        {{ messageBody }}
      </div>

      <!-- Begin winks -->
      <div
        :class="{
          'text-right': isMine,
          'text-left': !isMine,
          'has-image': message.image,
        }"
      >
        <figure
          v-if="message.image"
          :class="{ 'ml-auto': isMine }"
          class="cursor-pointer"
        >
          <img
            :src="message.image.thumb"
            class="rounded"
            @click="onViewImage"
          />
        </figure>
        <template v-if="message.type === 'wink'">
          <figure
            v-if="message.body == 'wink'"
            :class="{ 'ml-auto': isMine }"
            class="block relative h-11 w-11"
          >
            <WinkSvg />
          </figure>
          <figure
            v-if="message.body == 'cool'"
            :class="{ 'ml-auto': isMine }"
            class="block relative h-11 w-11"
          >
            <CoolSvg />
          </figure>
          <figure
            v-if="message.body == 'in-love'"
            :class="{ 'ml-auto': isMine }"
            class="block relative h-11 w-11"
          >
            <InLoveSvg />
          </figure>
          <figure
            v-if="message.body == 'surprised'"
            :class="{ 'ml-auto': isMine }"
            class="block relative h-11 w-11"
          >
            <SurprisedSvg />
          </figure>
        </template>
        <AuthChatConversationTime
          :time="message.created_at"
          class="text-xs text-slate-400"
        />
      </div>
      <!-- End winks -->
    </div>
    <div class="clear-both"></div>

    <BaseAppModal :showing="viewImage" @close="viewImage = false">
      <template #body>
        <img v-if="viewImage" :src="message.image.url" />
      </template>
    </BaseAppModal>
  </div>
</template>

<script>
import {
  findAndReplacePhoneNumbers,
  findAndReplaceEmails,
} from '@/utils/replace'
import CoolSvg from '@/assets/svg/winks/cool.svg?inline'
import WinkSvg from '@/assets/svg/winks/wink.svg?inline'
import InLoveSvg from '@/assets/svg/winks/in-love.svg?inline'
import SurprisedSvg from '@/assets/svg/winks/surprised.svg?inline'

export default {
  components: {
    CoolSvg,
    WinkSvg,
    InLoveSvg,
    SurprisedSvg,
  },

  props: {
    message: {
      type: Object,
      required: true,
    },
    isMine: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {
      viewImage: false,
    }
  },

  computed: {
    messageBody() {
      if (this.message) {
        const message = findAndReplacePhoneNumbers(this.message.body)
        return findAndReplaceEmails(message)
      }
      return null
    },
  },

  methods: {
    onViewImage() {
      this.viewImage = true
    },
  },
}
</script>
