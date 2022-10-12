<template>
  <footer class="bg-black-100 text-white">
    <div class="container max-w-7xl mx-auto px-4 sm:px-6 py-8 md:py-14">
      <div class="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-slate-400">
        <nuxt-link to="/" class="col-span-2 md:col-span-1 hidden md:block">
          <AppLogo class="mr-0 md:mr-8 h-6 sm:h-10" />
        </nuxt-link>
        <div>
          <span class="text-lg md:text-xl text-white mb-3 block"
            >ShagToday</span
          >
          <ul class="leading-loose">
            <li>
              <nuxt-link to="/dashboard" class="hover:text-primary">
                Browse profiles
              </nuxt-link>
            </li>
            <li>
              <nuxt-link to="/messages" class="hover:text-primary">
                Messages
              </nuxt-link>
            </li>
            <li>
              <nuxt-link to="/my-profile" class="hover:text-primary">
                My Profile
              </nuxt-link>
            </li>
            <li>
              <nuxt-link to="/my-visitors" class="hover:text-primary">
                My visitors
              </nuxt-link>
            </li>
            <li>
              <nuxt-link to="/credits/buy" class="hover:text-primary">
                Buy credits
              </nuxt-link>
            </li>
            <li>
              <nuxt-link to="/account" class="hover:text-primary">
                Account Settings
              </nuxt-link>
            </li>
            <li>
              <nuxt-link to="/blog" class="hover:text-primary">
                Blog
              </nuxt-link>
            </li>
          </ul>
        </div>

        <div>
          <span class="text-lg md:text-xl text-white mb-3 block">About Us</span>
          <ul class="leading-loose">
            <li>
              <nuxt-link to="/pricing" class="hover:text-primary">
                Pricing
              </nuxt-link>
            </li>
            <li>
              <nuxt-link to="/how-to-pay" class="hover:text-primary">
                How To Pay
              </nuxt-link>
            </li>
            <li>
              <nuxt-link to="/legal/terms" class="hover:text-primary">
                Terms of Use
              </nuxt-link>
            </li>
            <li>
              <nuxt-link to="/legal/privacy" class="hover:text-primary">
                Privacy Policy
              </nuxt-link>
            </li>
          </ul>
        </div>

        <div>
          <span class="text-lg md:text-xl text-white mb-3 block">Support</span>
          <ul class="leading-loose">
            <li>
              <nuxt-link to="/report-abuse" class="hover:text-primary">
                Report Abuse
              </nuxt-link>
            </li>
            <li>
              <nuxt-link to="/faq" class="hover:text-primary"> FAQ </nuxt-link>
            </li>
            <li>
              <nuxt-link to="/helpdesk" class="hover:text-primary">
                Helpdesk
              </nuxt-link>
            </li>
            <li>
              <nuxt-link to="/submit-request" class="hover:text-primary">
                Submit a Request
              </nuxt-link>
            </li>
          </ul>
        </div>
      </div>

      <div class="border-b py-6 border-gray-800 mb-6" />

      <div v-if="$route.name === 'index'" class="py-6">
        <div class="text-sm text-slate-400 mb-4">
          Please be kindly reminded of the following matters:
        </div>

        <ul
          class="list-decimal text-sm text-slate-400 list-inside leading-loose"
        >
          <li>
            ShagToday contains uncensored sexually explicit material unsuitable
            for minors. You must be at least 18-years old and at the right age
            of consent in your place of residence to register on ShagToday.
          </li>
          <li>
            Privacy and General Terms and Conditions apply to this service.
          </li>
          <li>
            This website is especially suitable for people located in the United
            Kingdom that are interested fantasy chats. Most of our profiles are
            fictional.
          </li>
          <li>
            All members and persons appearing on this site are over 18 years of
            age.
            <a href="#" class="text-white"
              >18 U.S.C. 2257 Record Keeping Requirements Compliance
              Statement</a
            >
          </li>
        </ul>
      </div>

      <ul
        class="list-inside flex flex-col md:flex-row text-sm text-slate-400 leading-loose"
      >
        <li class="mr-4">&copy; 2021 - 2022 TRF Networks Co., Ltd.</li>
        <li class="md:mx-4">All rights reserved</li>
        <li class="md:mx-4">
          Our services are for entertainment purposes only.
        </li>
        <li class="md:mx-4">
          <nuxt-link to="/affiliates" class="text-white hover:text-primary">
            Affiliates
          </nuxt-link>
        </li>
      </ul>
    </div>
  </footer>
</template>

<script>
import AppLogo from '~/assets/svg/logo.svg?inline'

export default {
  components: { AppLogo },
}
</script>
