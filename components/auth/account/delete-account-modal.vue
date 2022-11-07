<template>
  <div
    @click.self="closeModal"
    class="fixed z-50 -inset-1 bg-gray-900 bg-opacity-50 overflow-y-auto h-full w-full px-4"
  >
    <div
      class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[370px] m-auto h-1/2 max-h-screen max-w-5xl shadow-lg rounded bg-white"
    >
      <!-- Modal header -->
      <div
        class="modal flex justify-between text-white text-xl rounded-t-sm p-4 bg-cover bg-black"
      >
        <h1 class="uppercase text-2xl text-white">Are you sure?</h1>
        <button @click="closeModal()">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
              clip-rule="evenodd"
            />
          </svg>
        </button>
      </div>
      <!-- Modal body -->
      <div
        class="p-4 text-black bg-[url('https://assets.shagtoday.co.uk/st/img/bg-delete.png')] bg-no-repeat bg-cover h-[25.5rem]"
        style="background-position: 100%"
      >
        <div class="flex flex-col gap-4">
          <p class="w-[60%]">
            Check our special offer before deleting your account!
          </p>
          <span class="text-2xl font-bold mt-3">750 credits</span>
          <div class="relative">
            <a
              class="bg-white -ml-4 h-[76px] w-[140px] rounded-tr-[5px] rounded-br-[5px] flex flex-col items-start px-4 py-[0.8rem]"
            >
              <p class="line-through text-[#8b8b8b]">£14.95</p>
              <h2 class="text-3xl font-bold">£9.95</h2>
            </a>
            <div
              class="bg-black absolute top-0 h-[76px] w-[2.3rem] left-[118px] rounded-tr-[8px] rounded-br-[8px]"
            >
              <div
                class="text-white font-bold text-xl absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -rotate-90"
              >
                -35%
              </div>
            </div>
            <small class="absolute top-[43%] left-[165px] text-black"
              >*One-time only</small
            >
          </div>
          <button
            class="bg-black text-white text-sm p-2 rounded-md w-[100px] mt-5"
          >
            Buy now
          </button>
          <a @click="deleteConfirm()" class="flex gap-2 text-sm"
            ><svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="2"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              /></svg
            >No thank you</a
          >
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  mounted() {
    document.documentElement.style.overflow = 'hidden'
  },
  methods: {
    closeModal() {
      document.documentElement.style.overflow = 'scroll'
      this.$emit('deleteModalOpened', false)
    },
    deleteConfirm() {
      this.$emit('deleteConfirm', true)
      this.closeModal()
    },
  },
}
</script>
