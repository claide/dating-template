<template>
  <div class="auth bg-[#F1F4F8] dark:bg-gray-900">
    <!-- Begin navbar -->
    <!-- <AuthNavbar /> -->
    <!-- <navbar /> -->
    <!-- End navbar -->
    <div>
      <!-- Begin dashboard nav -->
      <!-- <AuthHeader /> -->
      <!-- End dashboard nav -->
      <nuxt
        id="wrapper"
        :class="{ 'pt-2': $route.name != 'messages-id' }"
        class="h-full min-h-[calc(100vh-200px)] lg:pt-6 lg:pb-12"
      />
    </div>

    <!-- Begin footer -->
    <!-- <BaseFooter /> -->
    <!-- End footer -->
    <!-- <notification-handler /> -->
  </div>
</template>

<script>
// import NotificationHandler from '@/components/notifications/notification-handler'

export default {
  name: 'AuthLayout',

  // components: {
  //   NotificationHandler,
  // },

  middleware: 'deactivated',
}
</script>

<style lang="scss" scoped>
.auth {
  display: flex;
  min-height: 100vh;
  flex-direction: column;
}

#wrapper {
  flex: 1;
}
</style>
