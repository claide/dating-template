<template>
  <div>
    <h1 class="text-xl text-center text-gray-900 dark:text-slate-400">
      Payment Transactions
    </h1>

    <div class="mt-4">
      <table class="border-collapse table-fixed w-full text-sm">
        <thead>
          <tr>
            <th
              class="border-b dark:border-slate-600 font-medium p-4 pl-8 pt-0 pb-3 text-gray-900 dark:text-slate-400 text-left"
            >
              Date
            </th>
            <th
              class="border-b dark:border-slate-600 font-medium p-4 pl-8 pt-0 pb-3 text-gray-900 dark:text-slate-400 text-left"
            >
              Reference
            </th>
            <th
              class="border-b dark:border-slate-600 font-medium p-4 pl-8 pt-0 pb-3 text-gray-900 dark:text-slate-400 text-left"
            >
              Price
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="t in transactions" :key="t.id">
            <td
              class="border-b border-slate-100 dark:border-slate-700 p-4 pl-8 text-gray-900 dark:text-slate-400"
            >
              {{ formatDate(t.created_at) }}
            </td>
            <td
              class="border-b border-slate-100 dark:border-slate-700 p-4 pl-8 text-gray-900 dark:text-slate-400"
            >
              {{ t.transaction_id }}
            </td>
            <td
              class="border-b border-slate-100 dark:border-slate-700 p-4 pl-8 text-gray-900 dark:text-slate-400"
            >
              {{ t.amount }} USD
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import dayjs from 'dayjs'

export default {
  name: 'Payments',
  data() {
    return {
      transactions: [],
    }
  },
  created() {
    this.fetchTransactions()
  },
  methods: {
    async fetchTransactions() {
      const { data } = await this.$axios.get('user-transactions')
      this.transactions = data.data
    },
    formatDate(date) {
      return dayjs(date).format('MMM D, YYYY')
    },
  },
}
</script>
