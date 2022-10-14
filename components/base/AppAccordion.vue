<template>
  <div>
    <h2>
      <button
        :class="isOpen ? 'bg-gray-100 rounded-b-none' : ''"
        :aria-expanded="isOpen"
        :aria-controls="`collapse${_uid}`"
        type="button"
        class="flex justify-between rounded items-center p-5 dark:bg-gray-800 dark:text-slate-300 w-full font-medium text-left text-black hover:bg-gray-100 border dark:border-gray-800"
        @click="toggleAccordion()"
      >
        <span class="font-medium">
          <slot name="title" />
        </span>
        <svg
          :class="{
            'rotate-180': isOpen,
            'rotate-0': !isOpen,
          }"
          class="w-3 transition-all duration-200 transform"
          fill="none"
          stroke="currentColor"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 16 10"
          aria-hidden="true"
        >
          <path
            d="M15 1.2l-7 7-7-7"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </button>
    </h2>
    <div
      v-if="isOpen"
      :id="`collapse${_uid}`"
      class="p-5 text-left border border-t-0 dark:text-slate-300 dark:border-gray-800 dark:bg-gray-800"
    >
      <slot name="content" />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isOpen: false,
    }
  },

  methods: {
    toggleAccordion() {
      this.isOpen = !this.isOpen
    },
  },
}
</script>
