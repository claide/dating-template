<template>
  <div
    class="max-w-[410px] mx-auto px-4 md:px-0 py-8 text-black dark:text-slate-400"
  >
    <div class="text-center mb-12">
      <h1
        class="text-2xl md:text-3xl lg:text-5xl text-center text-black font-extrabold leading-tight dark:text-slate-300"
      >
        Congratulations!
      </h1>
      <p
        class="mt-4 sm:mt-8 text-gray-600 dark:text-gray-400 font-normal text-center text-lg sm:text-lg"
      >
        You've succesfully created your profile.
      </p>
    </div>
    <p class="text-[14px] leading-8 tracking-tight text-center">
      Find your activation email for {{ siteName }} (can be in spam), and click
      “Activate your account”.
    </p>
    <div class="flex justify-between items-center my-5 gap-6 md:gap-0">
      <img
        class="max-w-[100px] md:max-w-[140px]"
        src="https://assets.shagtoday.co.uk/st/img/gmail-spam.png"
        alt="gmail inbox"
      />
      <div>
        <h2 class="text-md font-medium mb-2">Did not receive an email?</h2>
        <p class="text-sm">Check your spam.</p>
      </div>
    </div>
    <div class="mb-5 w-9 mx-auto">
      <a :href="`https://${emailLink}`" class="">
        <GmailIcon v-if="emailProvider === 'gmailIcon'" class="w-9 h-9" />
        <YahooIcon v-else-if="emailProvider === 'yahooIcon'" class="w-9 h-9" />
        <OutlookIcon
          v-else-if="emailProvider === 'outlookIcon'"
          class="w-9 h-9"
        />
      </a>
    </div>
    <div v-show="showChange" class="mb-4">
      <ValidationProvider
        v-slot="{ errors }"
        name="E-mail"
        vid="email"
        rules="required|email"
      >
        <label
          for="email"
          class="block mb-2 font-medium text-gray-900 dark:text-slate-400 text-sm"
          >Email</label
        >
        <input
          v-model="newEmail"
          :class="
            errors[0]
              ? 'border-red-600 focus:ring-red-400 focus:border-red-400'
              : 'border-gray-300'
          "
          type="email"
          name="email"
          class="bg-slate-100 focus:bg-white border border-slate-100 mt-1 text-gray-900 text-sm rounded focus:ring-yellow-400 focus:border-yellow-400 block w-full p-3 outline-none"
          placeholder="newemail@email.com"
        />
        <span class="text-sm text-red-600">{{ errors[0] }}</span>
      </ValidationProvider>
    </div>

    <div class="text-center">
      <BaseAppButton
        tag="a"
        :href="`https://${emailLink}`"
        color="primary"
        class="mb-6"
      >
        Go To Inbox
      </BaseAppButton>
    </div>

    <div>
      <p v-show="!showChange" class="text-center mb-6">
        Your email:
        <a :href="`https://${emailLink}`">
          <span class="text-blue-500">{{ email }}</span>
        </a>
      </p>
      <div class="text-center">
        <a href="javascript:;" class="underline dark:text-white" @click="resend"
          >Resend activation email</a
        >
      </div>
      <div class="mt-6">
        <p class="text-lg font-medium mb-3">Important information</p>
        <ul class="list-disc leading-loose pl-4 text-sm">
          <li class="mb-4">
            It takes 5-10 minutes for the activation email to arrive.
          </li>
          <li class="mb-4">
            Check your email account's 'Spam/Junk' folder to make sure our email
            hasn't landed there.
          </li>
          <li class="mb-4">
            Remember to mark it as 'Not junk/Spam' to ensure that you receive
            all important emails from {{ siteName }}.
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
import GmailIcon from '@/assets/svg/gmail.svg?inline'
import YahooIcon from '@/assets/svg/yahoo.svg?inline'
import OutlookIcon from '@/assets/svg/outlook.svg?inline'
import config from '../utils/config'
import { ValidationProvider } from 'vee-validate'

export default {
  components: {
    GmailIcon,
    YahooIcon,
    OutlookIcon,
    ValidationProvider,
  },

  data() {
    return {
      id: this.$route.query.uuid,
      email: this.$route.query.email,
      submitting: false,
      showChange: false,
      newEmail: this.$route.query.email,
      emailProvider: '',
      siteName: config.defaultSiteName,
    }
  },

  head() {
    return {
      title: this.$t('pages.confirm_email'),
    }
  },

  computed: {
    emailLink() {
      const link = this.email.split('@')[1]
      if (link === 'gmail.com') {
        return 'mail.google.com/mail/u/0/#search/in%3Aall+OR+in%3Aspam+Please+activate+your+account+wannahookup.com'
      }
      return link
    },
  },

  mounted() {
    this.checkProvider()
  },

  methods: {
    async change() {
      if (!(await this.$validator.validate())) {
        return false
      }
      this.submitting = true

      await this.$axios.post('/email/resend', {
        email: this.newEmail,
        id: this.id,
      })

      this.email = this.newEmail
      this.checkProvider()
      this.showChange = false

      this.$buefy.snackbar.open({
        message: 'Email updated and confirmation email sent.',
        type: 'is-success',
        position: 'is-top',
        actionText: 'Okay',
      })

      this.$router.push({
        path: '/confirm-email',
        query: {
          uuid: this.id,
          email: this.email,
        },
      })

      this.submitting = false
    },
    async resend() {
      this.submitting = true

      await this.$axios.post('/email/resend', {
        email: this.email,
      })

      this.$toast.success('Confirmation email resent.')

      this.submitting = false
    },
    checkProvider() {
      if (this.email.includes('@gmail')) {
        this.emailProvider = 'gmailIcon'
      } else if (this.email.includes('@yahoo')) {
        this.emailProvider = 'yahooIcon'
      } else if (
        this.email.includes('@outlook') ||
        this.email.includes('@hotmail') ||
        this.email.includes('@live')
      ) {
        this.emailProvider = 'outlookIcon'
      } else {
        this.emailProvider = ''
      }
    },
  },
}
</script>
