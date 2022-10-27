<template>
  <section class="container max-w-md mx-auto px-4 sm:px-6 py-8 md:py-14">
    <h3
      class="text-xl font-medium text-gray-900 dark:text-[#A6ADBA] lg:text-2xl mb-8 text-center"
    >
      Helpdesk
    </h3>
    <p class="text-gray-600 dark:text-gray-400 font-normal text-center mb-6">
      We kindly suggest that you first check our
      <nuxt-link to="/faq" class="text-blue-500"
        >Frequently Asked Questions</nuxt-link
      >
      page before sending your query.
    </p>

    <ValidationObserver ref="form">
      <ValidationProvider
        v-slot="{ errors }"
        name="Category"
        vid="category"
        rules="required"
        tag="div"
        class="mb-4"
      >
        <label
          for="category"
          class="block mb-2 font-medium text-gray-900 dark:text-slate-400 text-sm"
          >Category</label
        >
        <BaseAppDropdown v-model="form.category">
          <template #trigger>
            <span class="capitalize">{{ categoryTriggerText }}</span>
          </template>
          <BaseAppDropdownItem
            v-for="(category, i) in categories"
            :key="i"
            :value="category.value"
            >{{ category.label }}</BaseAppDropdownItem
          >
        </BaseAppDropdown>
        <span class="mt-1 block text-sm text-red-500">{{ errors[0] }}</span>
      </ValidationProvider>

      <ValidationProvider
        v-slot="{ errors }"
        name="Question"
        vid="question"
        rules="required"
        tag="div"
        class="mb-4"
      >
        <label
          for="question"
          class="block mb-2 font-medium text-gray-900 dark:text-slate-400 text-sm"
          >Describe your question</label
        >
        <textarea
          v-model="form.question"
          rows="4"
          class="block p-2.5 w-full text-sm text-gray-900 bg-slate-100 rounded-lg border border-gray-300 focus:ring-yellow-500 focus:border-yellow-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-yellow-500 dark:focus:border-yellow-500 focus:outline-none"
          placeholder="Your question..."
        ></textarea>
        <span class="mt-1 block text-sm text-red-500">{{ errors[0] }}</span>
      </ValidationProvider>

      <BaseAppButton expanded @click.prevent="onSubmit">
        <IconLoader
          v-if="submitting"
          class="animate-spin -ml-1 mr-3 h-5 w-5 text-black fill-current"
        />
        Submit
      </BaseAppButton>
    </ValidationObserver>
  </section>
</template>

<script>
import Helpdesk from '@/models/Helpdesk'
import IconLoader from '@/assets/svg/loader.svg?inline'

export default {
  components: {
    IconLoader,
  },

  layout: 'auth',

  middleware: 'auth',

  data() {
    return {
      categories: [
        {
          value: 'payments',
          label: 'Payments',
        },
      ],
      form: {
        category: null,
        question: '',
      },
      submitting: false,
    }
  },

  head() {
    return {
      title: 'Helpdesk',
    }
  },

  computed: {
    categoryTriggerText() {
      if (this.form.category === null) {
        return 'Select category'
      }

      return this.form.category
    },
  },

  methods: {
    onSubmit() {
      this.submitting = true
      this.$refs.form.validate().then((success) => {
        if (!success) {
          return
        }

        const helpdesk = new Helpdesk(this.form)
        helpdesk
          .save()
          .then(() => {
            // reset form values
            this.form = {
              category: null,
              question: '',
            }

            // reset form errors
            this.$nextTick(() => {
              this.$refs.form.reset()
            })
          })
          .catch((e) => {
            console.log(e.response)
          })
        this.submitting = false
      })
    },
  },
}
</script>
