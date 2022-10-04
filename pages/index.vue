<template>
  <div>
    <GuestAppHero />
  </div>
</template>

<script>
export default {
  layout: 'default',

  middleware: 'guest',

  head () {
    return {
      title: 'Home',
      htmlAttrs: {
        class: this.checkLandingPage()
      }
    }
  },

  methods: {
    checkLandingPage () {
      return +this.$store.state.campaign.landing === 3 ||
        (+this.$store.state.campaign.landing === 4 && this.start === false)
        ? 'survey-start ' + this.$colorMode.preference
        : this.$colorMode.preference
    }
  }
}
</script>
