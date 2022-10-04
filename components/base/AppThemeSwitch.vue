<template>
  <div
    class="flex items-center justify-center w-full border-l border-slate-500"
  >
    <label for="toogleA" class="flex items-center cursor-pointer ml-6">
      <!-- toggle -->
      <div class="relative">
        <!-- input -->
        <input
          id="toogleA"
          :checked="$colorMode.preference === 'light' ? false : true"
          type="checkbox"
          class="sr-only"
          @click="themeHandler()"
        >
        <!-- line -->
        <div class="w-8 h-4 bg-slate-400 rounded-full shadow-inner" />
        <!-- dot -->
        <div
          class="dot absolute w-6 h-6 bg-white rounded-full shadow -left-1 -top-1 transition"
        >
          <span
            class="absolute text-black top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
          >
            <svg
              v-if="$colorMode.preference === 'light'"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              class="h-4 w-4 fill-current"
            >
              <path fill="none" d="M0 0h24v24H0z" />
              <path
                d="M12 18a6 6 0 1 1 0-12 6 6 0 0 1 0 12zm0-2a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM11 1h2v3h-2V1zm0 19h2v3h-2v-3zM3.515 4.929l1.414-1.414L7.05 5.636 5.636 7.05 3.515 4.93zM16.95 18.364l1.414-1.414 2.121 2.121-1.414 1.414-2.121-2.121zm2.121-14.85l1.414 1.415-2.121 2.121-1.414-1.414 2.121-2.121zM5.636 16.95l1.414 1.414-2.121 2.121-1.414-1.414 2.121-2.121zM23 11v2h-3v-2h3zM4 11v2H1v-2h3z"
              />
            </svg>

            <svg
              v-else
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              class="fill-current h-4 w-4"
            >
              <path fill="none" d="M0 0h24v24H0z" />
              <path
                d="M10 7a7 7 0 0 0 12 4.9v.1c0 5.523-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2h.1A6.979 6.979 0 0 0 10 7zm-6 5a8 8 0 0 0 15.062 3.762A9 9 0 0 1 8.238 4.938 7.999 7.999 0 0 0 4 12z"
              />
            </svg>
          </span>
        </div>
      </div>
    </label>
  </div>
</template>

<script>
export default {
  methods: {
    themeHandler () {
      if (this.$colorMode.preference !== 'dark') {
        this.$colorMode.preference = 'dark'
      } else {
        this.$colorMode.preference = 'light'
      }
    }
  }
}
</script>
<style lang="scss" scoped>
input:checked ~ .dot {
  transform: translateX(70%);
  background-color: #fabe39;
}
</style>
