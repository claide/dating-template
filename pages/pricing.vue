<template>
  <section class="container max-w-3xl mx-auto px-4 sm:px-6 py-8 md:py-14">
    <div class="mb-12">
      <h1
        class="text-2xl md:text-3xl lg:text-5xl text-center text-black font-extrabold leading-tight dark:text-slate-300"
      >
        Prices
      </h1>
      <p
        class="mt-4 sm:mt-8 text-gray-600 dark:text-gray-400 font-normal text-center text-lg sm:text-lg"
      >
        Costs of using our services
      </p>
    </div>
    <p class="mb-8 leading-relaxed dark:text-slate-300">
      While receiving messages is completely free, to cover the costs of our
      employees and running this service we ask a small fee for sending messages
      to other members.
    </p>

    <h2 class="text-lg text-black dark:text-slate-300 font-medium">Why buy?</h2>
    <ul class="mt-4 mb-8">
      <li
        v-for="item in items"
        :key="item"
        class="flex items-center leading-relaxed"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="3"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="text-green-700 mr-2"
        >
          <polyline points="20 6 9 17 4 12"></polyline>
        </svg>
        <span class="dark:text-slate-300">{{ item }}</span>
      </li>
    </ul>

    <h2 class="text-lg text-black dark:text-slate-300 font-medium">Prices</h2>
    <p class="leading-relaxed mt-4 dark:text-slate-300">
      Our credit packages range from £ 24.95 for 1250 credits, up to £ 249.95
      for as much as 17500 credits. While the use of the website and receiving
      messages is completely free of charge, we charge you a small fee of 100
      credits per sent message and 50 credits per sent wink.
    </p>
  </section>
</template>

<script>
export default {
  data() {
    return {
      items: [
        'Send and receive messages',
        'Get more attention',
        'Share photos',
        'Premium support',
      ],
    }
  },
  head() {
    return {
      title: 'Prices',
    }
  },
}
</script>
