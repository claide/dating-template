<template>
  <div class="bg-white dark:bg-gray-900 guest">
    <!-- Show if offline -->
    <div v-if="$nuxt.isOffline" class="text-center bg-red-600 text-white">
      Oops! Looks like you're offline.
    </div>
    <BaseNavbarElement />
    <Nuxt />
    <BaseFooter />
  </div>
</template>

<script>
export default {
  name: 'Guest'
}
</script>
