<template>
  <div class="auth bg-[#F1F4F8] dark:bg-gray-900">
    <!-- Show if offline -->
    <div v-if="$nuxt.isOffline" class="text-center bg-red-600 text-white">
      Oops! Looks like you're offline.
    </div>
    <AuthNavbar />
    <div>
      <AuthHeader />
      <Nuxt class="min-h-[calc(100vh-200px)] mb-3 lg:pt-12" />
    </div>
    <BaseAppFooter />
  </div>
</template>
