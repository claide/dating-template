<template>
  <div>
    <GuestAppHero />

    <section class="container mx-auto px-2 sm:px-4 py-12 md:py-16 text-center section-tagline">
      <h1 class="text-3xl md:text-5xl font-medium mb-4 dark:text-slate-300">Register now. It’s free</h1>
      <p class="text-lg md:text-xl dark:text-slate-300">Sign Up, Get Unlimited Access And Start Chatting</p>
    </section>
  </div>
</template>

<script>
export default {
  layout: 'default',

  middleware: 'guest',

  head() {
    return {
      title: 'Home',
      htmlAttrs: {
        class: this.checkLandingPage(),
      },
    }
  },

  methods: {
    checkLandingPage() {
      return +this.$store.state.campaign.landing === 3 ||
        (+this.$store.state.campaign.landing === 4 && this.start === false)
        ? 'survey-start ' + this.$colorMode.preference
        : this.$colorMode.preference
    },
  },
}
</script>

<style lang="scss">
.section {
  &-tagline {
    margin-top: 43rem;
    @media (min-width: 374px) {
      margin-top: 39rem;
    }
    @media (min-width: 413px) {
      margin-top: 37rem;
    }
    @media (min-width: 1024px) {
      margin-top: 0;
    }
  }
}
</style>
