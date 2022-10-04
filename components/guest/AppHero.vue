<template>
  <div
    :style="{ backgroundImage: `url(${heroImg})` }"
    class="bg-yellow-500 bg-cover h-[16rem] md:h-[24rem] lg:h-auto lg:flex lg:items-center"
  >
    <div
      class="container max-w-5xl mx-auto flex flex-col items-center lg:items-end py-10"
    >
      <LandingCreateAccount />
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      heroImg: 'https://assets.shagtoday.co.uk/st/img/hero-background_01.png'
    }
  },

  mounted () {
    this.getBackground()
  },

  methods: {
    getBackground () {
      const landing = this.$store.state.campaign.landing

      if (landing === '2') {
        this.heroImg = 'https://assets.shagtoday.co.uk/st/img/hero-background_02.jpeg'
      }
    }
  }
}
</script>
