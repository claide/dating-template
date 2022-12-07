<template>
  <div>
    <div class="px-4 sm:px-6 lg:px-8">
      <div class="text-center">
        <h2
          class="text-lg leading-6 font-semibold text-black dark:text-gray-300 uppercase tracking-wider"
        >
          Pricing
        </h2>
        <p
          class="mt-2 text-3xl font-extrabold text-black dark:text-white sm:text-4xl lg:text-5xl"
        >
          The right price for you, whoever you are
        </p>
        <p
          class="mt-3 max-w-4xl mx-auto text-xl text-gray-500 dark:text-gray-300 sm:mt-5 sm:text-2xl"
        >
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Velit
          numquam eligendi quos odit doloribus molestiae voluptatum.
        </p>
      </div>
    </div>
    <AuthPurchaseCredits :creditsPlans="creditsPlans" />
  </div>
</template>

<script>
// import TestBuy from '@/components/purchase/testbuy'
import Plan from '@/models/Plan'
export default {
  // components: { TestBuy },
  layout: 'auth',
  middleware: 'auth',
  data() {
    return {
      loadingBuy: false,
      creditsPlans: [],
      featuredPlan: null,
      isValentinePromotion: true,
    }
  },

  head() {
    return {
      title: 'Buy credits',
    }
  },
  computed: {
    user() {
      return this.$auth.user.data
    },
  },
  mounted() {
    this.visit()
    this.getCreditsPlans()
  },
  methods: {
    visit() {
      this.$axios.post('/qs', {
        action: 3,
      })
    },
    async visitUrl(item) {
      this.loadingBuy = true
      await this.$axios.post(`/sales/${item.id}/pending`)
      window.location.replace(item.purchase_url)
    },
    getCreditsPlans() {
      Plan.where('type', 2)
        .where('site_id', 8)
        .where('is_featured', false)
        .include('features')
        .get()
        .then(({ data }) => {
          this.creditsPlans = data
        })
    },
    goBack() {
      this.$router.back()
    },
  },
}
</script>
