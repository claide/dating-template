<template>
  <div
    v-if="showing"
    id="exampleModal"
    class="fixed inset-0 w-full h-screen flex items-center justify-center bg-gray-600 bg-opacity-50 z-50"
    tabindex="-1"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
    @click.self="close"
  >
    <div class="modal-dialog relative w-auto pointer-events-none">
      <div
        class="modal-content border-none shadow-lg relative flex flex-col w-full pointer-events-auto bg-white bg-clip-padding rounded-md outline-none text-current"
      >
        <div
          class="modal-header flex flex-shrink-0 items-center justify-between p-4 border-b border-gray-200 rounded-t-md"
        >
          <slot name="header"></slot>

          <button
            type="button"
            class="ml-auto btn-close box-content w-4 h-4 p-1 text-black border-none rounded-none opacity-50 focus:shadow-none focus:outline-none focus:opacity-100 hover:text-black hover:opacity-75 hover:no-underline"
            data-bs-dismiss="modal"
            aria-label="Close"
            @click.prevent="close"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="24"
              height="24"
            >
              <path fill="none" d="M0 0h24v24H0z" />
              <path
                d="M12 10.586l4.95-4.95 1.414 1.414-4.95 4.95 4.95 4.95-1.414 1.414-4.95-4.95-4.95 4.95-1.414-1.414 4.95-4.95-4.95-4.95L7.05 5.636z"
              />
            </svg>
          </button>
        </div>
        <div class="relative p-4">
          <slot name="body" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    showing: {
      type: Boolean,
      required: true,
    },
  },

  watch: {
    showing(value) {
      if (value) {
        return document.querySelector('body').classList.add('overflow-hidden')
      }

      document.querySelector('body').classList.remove('overflow-hidden')
    },
  },

  methods: {
    close() {
      this.$emit('close')
    },
  },
}
</script>
