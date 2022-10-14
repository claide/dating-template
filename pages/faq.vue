<template>
  <div>
    <div class="bg-[#dfe0df] dark:bg-black-100">
      <div class="container mx-auto flex flex-col items-center py-12 sm:py-16">
        <div class="w-11/12 sm:w-2/3 mb-5 sm:mb-10">
          <h1
            class="text-2xl md:text-3xl lg:text-5xl text-center text-black dark:text-slate-300 font-extrabold leading-tight"
          >
            How can we help you?
          </h1>
          <p
            class="mt-4 sm:mt-8 text-gray-600 dark:text-gray-400 font-normal text-center text-lg sm:text-lg"
          >
            Frequently Asked Questions
          </p>
        </div>
      </div>
    </div>
    <section class="container mx-auto px-4 sm:px-6 py-8 md:py-14">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <BaseAppAccordion>
          <template #title>Do I need a credit card to sign up? </template>
          <template #content>
            <p>
              Absolutely not! Signing up is completely free and without any
              costs.
            </p>
          </template>
        </BaseAppAccordion>

        <BaseAppAccordion>
          <template #title>Is it safe to use this website?</template>
          <template #content>
            <p>
              Yes, all your personal data is stored in a secure environment. But
              remember; don't reveal too much personal identifiable information
              with the person you're talking to.
            </p>
          </template>
        </BaseAppAccordion>

        <BaseAppAccordion>
          <template #title>Will my purchase be discrete?</template>
          <template #content>
            <p>
              We care about your private life and respect your privacy. Any
              charges made on your credit card will appear under: "TRF Services"
            </p>
          </template>
        </BaseAppAccordion>

        <BaseAppAccordion>
          <template #title
            >I forgot my username / password, what should I do?</template
          >
          <template #content>
            <p>
              This can happen to anyone. Click
              <nuxt-link to="/forgot-password" class="font-bold underline"
                >here</nuxt-link
              >
              to reset your password or username.
            </p>
          </template>
        </BaseAppAccordion>

        <BaseAppAccordion>
          <template #title>How do I change my password?</template>
          <template #content>
            <p class="mb-1">To change your password, follow these steps:</p>
            <p class="mb-1">Login on our website.</p>

            <ul class="list-decimal list-inside mt-3">
              <li>
                Go to the
                <nuxt-link to="/settings" class="font-bold underline"
                  >"Account Settings"</nuxt-link
                >
                area.
              </li>
              <li>Enter your current password.</li>
              <li>Enter your new password.</li>
              <li>Confirm your new password.</li>
              <li>Click on the "Save" button.</li>
            </ul>
          </template>
        </BaseAppAccordion>

        <BaseAppAccordion>
          <template #title>How to adjust my personal information?</template>
          <template #content>
            <p>To adjust personal information, follow these steps:</p>
            <ul class="list-decimal list-inside mt-4">
              <li>
                Go to
                <nuxt-link to="/profile" class="font-bold underline"
                  >"My Profile"</nuxt-link
                >
                area.
              </li>
              <li>Here you can adjust your personal information.</li>
              <li>When you're done click on the "Save" button.</li>
            </ul>
          </template>
        </BaseAppAccordion>

        <BaseAppAccordion>
          <template #title
            >How long will it take for my photo to show?
          </template>
          <template #content>
            <p>All photos will be reviewed within 24 hours.</p>
          </template>
        </BaseAppAccordion>

        <BaseAppAccordion>
          <template #title>What are the rules on ShagToday? </template>
          <template #content>
            <ul class="list-decimal list-inside">
              <li>
                The photo may not discriminate; promote violence or any illegal
                activities.
              </li>
              <li>
                The person on the photo must be 18 years or older. You may not
                post a photo of yourself when 3. you were 17.
              </li>
              <li>
                You may not violate someone's rights or intellectual property by
                posting a photo.
              </li>
            </ul>
          </template>
        </BaseAppAccordion>

        <BaseAppAccordion>
          <template #title>How to change your location?</template>
          <template #content>
            <p>
              The e-mail address where you can send your request to can be found
              in our privacy statement.
            </p>
          </template>
        </BaseAppAccordion>

        <BaseAppAccordion>
          <template #title>How can I request my personal data?</template>
          <template #content>
            <ul class="list-decimal list-inside">
              <li>Open the menu in the top right corner.</li>
              <li>Press “My Profile”</li>
              <li>Press “Edit profile”.</li>
              <li>Press “Profile information”</li>
              <li>Change your location in this form and press “Save”.</li>
            </ul>
          </template>
        </BaseAppAccordion>

        <BaseAppAccordion>
          <template #title
            >How to turn off/on your email notifications?
          </template>
          <template #content>
            <ul class="list-decimal list-inside">
              <li>Open the menu in the top right corner.</li>
              <li>Press “Account Settings”</li>
              <li>Press “Notifications”</li>
              <li>Change your preferences and press “Update settings”.</li>
            </ul>
          </template>
        </BaseAppAccordion>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  head() {
    return {
      title: this.$t('pages.faq'),
    }
  },
}
</script>
