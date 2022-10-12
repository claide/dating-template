<template>
  <section class="container max-w-sm mx-auto px-4 sm:px-6 py-8 md:py-14">
    <h3
      class="text-xl font-medium text-gray-900 dark:text-[#A6ADBA] lg:text-2xl mb-8 text-center"
    >
      Enter email and password
    </h3>
    <GuestLoginForm />
  </section>
</template>

<script>
export default {
  layout: 'guest',
  middleware: 'guest',
  head() {
    return {
      title: 'Login',
    }
  },
}
</script>
