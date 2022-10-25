<template>
  <section>
    <PurchaseBuy />
  </section>
</template>

<script>
// import TestBuy from '@/components/purchase/testbuy'

export default {
  // components: { TestBuy },
  layout: 'auth',
  middleware: 'auth',

  head() {
    return {
      title: 'Buy credits',
    }
  },
}
</script>
