<template>
  <div @click="handleAction" class="flex items-center cursor-pointer">
    <div class="mr-4 md:mr-6 relative">
      <AuthAvatar :src="image" class="h-10 w-10 md:h-14 md:w-14" />
      <img
        v-if="notification.data.action_type === 'PROFILE_VIEW'"
        src="~assets/img/visibility.png"
        alt
        class="absolute top-0 right-[-8px] w-7 bg-white p-1 rounded-full"
      />
    </div>
    <div class="text-slate-400 flex flex-col">
      <div class="text-black text-xs md:text-sm">
        <span class="tex font-bold">{{
          notification.data.from_user_name
        }}</span>
        <span>{{ message }}</span>
      </div>
      <small><real-time :time="notification.data.timestamp"></real-time></small>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    notification: {
      type: Object,
      required: true,
    },
  },
  computed: {
    noti() {
      return this.notification.data
    },
    image() {
      if (this.notification.data.image) {
        return this.notification.data.image
      } else {
        return null
      }
    },
    type() {
      return this.notification.data.action_type
    },
    message() {
      switch (this.type) {
        case 'MESSAGE_RECEIVED':
          return ' has sent you a message'
        case 'PROFILE_VIEW':
          return ' has viewed your profile'
        case 'USER_LIKE':
          return ' liked your profile'
        default:
          return ''
      }
    },
    user() {
      switch (this.type) {
        case 'MESSAGE_RECEIVED':
          return this.noti.message.from
        case 'PROFILE_VIEW':
          return this.noti.viewer
        case 'USER_LIKE':
          return this.noti.liker
        default:
          return ''
      }
    },
  },
  methods: {
    handleAction() {
      this.markAsRead()
      switch (this.type) {
        case 'MESSAGE_RECEIVED':
          this.$router.push('/messages/' + this.noti.message.conversation.uuid)
          break
        case 'PROFILE_VIEW':
          this.$router.push('/profile/' + this.noti.viewer.uuid)
          break
        case 'USER_LIKE':
          this.$router.push('/profile/' + this.noti.liker.uuid)
          break
        default:
          return ''
      }
      this.$emit('clicked', true)
    },
    markAsRead() {
      this.notification.save()
    },
    destroy() {
      this.notification.delete()
      this.$emit('deleted')
    },
  },
}
</script>

<style>
.notification-list-item {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}
</style>
