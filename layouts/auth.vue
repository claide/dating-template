<template>
  <div class="auth bg-[#F1F4F8] dark:bg-gray-900">
    <!-- Show if offline -->
    <div v-if="$nuxt.isOffline" class="text-center bg-red-600 text-white">
      Oops! Looks like you're offline.
    </div>
    <AuthNavbar />
    <div>
      <AuthHeader />
      <Nuxt
        class="container max-w-7xl px-4 mx-auto sm:px-6 py-4 lg:py-8 min-h-[calc(100vh-200px)] relative overflow-auto"
        :class="{ 'py-0 pt-0': $route.name === 'messages-id' }"
      />
    </div>
    <BaseAppFooter />
  </div>
</template>
