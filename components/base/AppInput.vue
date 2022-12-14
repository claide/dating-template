<template>
  <div>
    <label
      v-if="label"
      :for="id"
      class="block mb-2 font-medium text-gray-900 text-sm dark:text-slate-400"
      >{{ label }}</label
    >
    <div class="relative">
      <input
        :id="id"
        ref="input"
        v-bind="$attrs"
        :type="type"
        :value="value"
        class="w-full rounded-md border border-slate-300 bg-slate-100 py-2.5 pl-3 pr-10 text-left sm:text-sm"
        :class="[classes]"
        :placeholder="placeholder"
        @input="$emit('input', $event.target.value)"
        @keydown="$emit('keydown', $event)"
        @blur="$emit('blur', $event)"
        @keyup="$emit('keyup', $event)"
      />
      <span v-if="errors" class="mt-1 block text-sm text-red-500">{{
        $t(errors[0], { attribute: label })
      }}</span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    id: {
      type: String,
      default() {
        return `text-input-${this._uid}`
      },
    },
    type: {
      type: String,
      default: 'text',
    },
    value: {
      type: String,
      default: null,
    },
    label: {
      type: String,
      default: 'Field',
    },
    errors: {
      type: [Array, Object],
      default: () => [],
    },
    withIcon: {
      type: Boolean,
      default: false,
    },
    bordered: {
      type: Boolean,
      default: false,
    },
    placeholder: {
      type: String,
      default: 'Field name',
    },
  },

  computed: {
    classes() {
      return {
        'border-2': this.bordered === true,
        'border bg-slate-100 focus:border-yellow-500 focus:outline-none focus:ring-1 focus:ring-yellow-500':
          this.bordered === false,
      }
    },
  },

  methods: {
    focus() {
      this.$refs.input.focus()
    },
    select() {
      this.$refs.input.select()
    },
    setSelectionRange(start, end) {
      this.$refs.input.setSelectionRange(start, end)
    },
  },
}
</script>
