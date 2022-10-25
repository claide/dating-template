<template>
  <div class="">
    <div
      class="mt-12 space-y-4 sm:mt-16 sm:space-y-0 sm:grid sm:grid-cols-2 sm:gap-6 lg:max-w-4xl lg:mx-auto xl:max-w-none xl:mx-0 xl:grid-cols-4"
    >
      <div
        v-for="credit in creditsPlans"
        :key="credit.name"
        :class="
          credit.is_best_seller
            ? 'border-primary'
            : credit.discount
            ? 'border-green-500'
            : 'border-gray-200'
        "
        class="border rounded-lg shadow-sm bg-white dark:bg-clay relative"
      >
        <div
          v-if="credit.is_best_seller"
          class="absolute inset-x-0 top-0 transform translate-y-px border-none outline-none"
        >
          <div class="flex justify-center transform -translate-y-1/2">
            <span
              class="inline-flex rounded-full bg-primary px-4 py-1 text-sm font-semibold tracking-wider uppercase text-black"
            >
              Best seller
            </span>
          </div>
        </div>
        <div
          v-if="credit.discount"
          class="absolute inset-x-0 top-0 transform translate-y-px border-none outline-none"
        >
          <div class="flex justify-center transform -translate-y-1/2">
            <span
              class="inline-flex rounded-full bg-green-600 px-4 py-1 text-sm font-semibold tracking-wider uppercase text-white"
            >
              Save {{ credit.discount }}%
            </span>
          </div>
        </div>
        <div class="p-6">
          <div class="flex justify-between">
            <h2
              class="text-lg leading-6 font-medium text-gray-900 dark:text-slate-300 self-center"
            >
              <span v-if="!credit.addons_credits"
                >{{ credit.features[0].value }} credits</span
              >
              <span v-else
                >{{ credit.features[0].value - credit.addons_credits }} credits
              </span>
            </h2>
            <a
              @click.prevent="buyItem(credit)"
              class="block md:hidden uppercase bg-gray-800 dark:bg-primary border border-gray-800 dark:border-primary rounded-md px-4 py-2 text-sm font-semibold text-white text-center hover:bg-gray-900"
            >
              buy
            </a>
          </div>

          <p class="mt-4 md:mt-8">
            <span
              class="text-4xl font-extrabold text-gray-900 dark:text-slate-300"
              >{{
                credit.currency === 'CAD'
                  ? 'CA$'
                  : credit.currency === 'GBP'
                  ? '£'
                  : '$'
              }}{{ credit.price }}</span
            >
          </p>
          <BaseAppButton
            @click="buyItem(credit)"
            class="mt-8 w-full hidden md:block"
          >
            Buy
            <span v-if="!credit.addons_credits"
              >{{ credit.features[0].value }} credits</span
            >
            <span v-else
              >{{ credit.features[0].value - credit.addons_credits }} credits
            </span>
          </BaseAppButton>
        </div>
        <hr v-if="credit.addons_credits" class="text-gray-200" />
        <div
          v-if="credit.addons_credits"
          class="pt-4 md:pt-6 pb-6 md:pb-8 px-4 md:px-6"
        >
          <h3
            class="text-xs font-medium text-gray-900 dark:text-slate-300 tracking-wide uppercase"
          >
            What's included
          </h3>
          <div class="mt-6 flex gap-3 text-green-600">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              class="w-6 h-6 fill-current"
            >
              <path fill="none" d="M0 0h24v24H0z" />
              <path
                d="M10 15.172l9.192-9.193 1.415 1.414L10 18l-6.364-6.364 1.414-1.414z"
              />
            </svg>
            <span class="text-gray-900 dark:text-slate-300"
              >Free {{ credit.addons_credits }} credits</span
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    creditsPlans: {
      type: Array,
      default: null,
    },
  },
  data() {
    return {}
  },
  methods: {
    async buyItem(credit) {
      this.loadingBuy = true
      await this.$axios.post(`/sales/${credit.id}/pending`)
      window.location.replace(credit.purchase_url)
    },
  },
}
</script>
