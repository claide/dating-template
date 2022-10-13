<template>
  <div>
    <div class="bg-[#dfe0df]">
      <div class="container mx-auto flex flex-col items-center py-12 sm:py-16">
        <div class="w-11/12 sm:w-2/3 mb-5 sm:mb-10">
          <h1
            class="text-2xl md:text-3xl lg:text-5xl text-center text-black font-extrabold leading-tight"
          >
            Privacy Policy
          </h1>
        </div>
      </div>
    </div>

    <section class="container mx-auto max-w-6xl px-4 sm:px-6 py-8 md:py-14">
      <div class="flex mb-6">
        <span class="text-sm p-2 bg-gray-200 mr-2 rounded-full"
          >Last updated on 2 December 2019</span
        >
        <span class="text-sm p-2 bg-gray-200 rounded-full">19 min read</span>
      </div>

      <div
        class="text-black dark:text-slate-200 leading-relaxed"
        v-html="pageContent"
      ></div>
    </section>
  </div>
</template>

<script>
import { marked } from 'marked'
import DOMPurify from 'dompurify'
import Page from '@/models/Page'

export default {
  layout: 'default',

  data() {
    return {
      page: '',
      location: null,
    }
  },

  head() {
    return {
      title: this.$t('pages.privacy'),
    }
  },

  computed: {
    pageContent() {
      if (!this.ukUser) {
        return DOMPurify.sanitize(
          marked
            .parse(this.page.content || '', {
              breaks: true,
              gfm: true,
            })
            .replace('and with identification number of 2912018', '')
        )
      } else {
        return DOMPurify.sanitize(
          marked.parse(this.page.content || '', {
            breaks: true,
            gfm: true,
          })
        )
      }
    },
    ukUser() {
      if (this.location) {
        return this.location.countryCode === 'UK'
      }
      return false
    },
  },

  created() {
    this.getPage()
    this.getUserLocation()
  },

  methods: {
    getPage() {
      const page = 'privacy-policy'

      Page.$find(page).then((page) => {
        this.page = page
        // console.log(this.page.content)
      })
    },
    getUserLocation() {
      this.$axios('/user/location').then(({ data }) => {
        this.location = data.data
      })
    },
  },
}
</script>

<style lang="scss" scoped>
p {
  margin-bottom: 0.7rem;
}
</style>
