<template>
  <div
    class="bg-white rounded p-4 md:p-8 w-[90%] md:w-[75%] lg:w-[45%] shadow-lg mt-[11rem] md:mt-[20rem] lg:mt-0"
  >
    <div class="text-center mb-6">
      <h2 class="capitalize text-2xl md:text-3xl font-medium mb-3">
        Create a free account
      </h2>
      <div class="flex items-center justify-center text-sm md:text-base">
        <IconUser class="w-6 h-6 mr-2" />
        421,265 people have already joined
      </div>
    </div>

    <!-- Begin login with Google -->
    <a
      :href="googleLink"
      class="w-full h-[42px] border border-black rounded flex items-center mb-4 text-black relative hover:cursor-pointer"
    >
      <div class="absolute ml-[1px] w-[40px] h-[40px] rounded bg-white">
        <IconGoogle class="h-[18px] w-[18px] mt-[11px] ml-[11px]" />
      </div>
      <span class="text-center mx-auto text-gray-600 font-medium"
        >Log in with Google</span
      >
    </a>
    <!-- End login with Google -->

    <div class="relative flex py-3 items-center">
      <div class="flex-grow border-t border-slate-400"></div>
      <span class="flex-shrink mx-4 text-black">or</span>
      <div class="flex-grow border-t border-slate-400"></div>
    </div>

    <ValidationObserver ref="form">
      <form class="relative">
        <ValidationObserver v-if="currentStep === 1" :key="1">
          <div class="mb-4">
            <label
              for="gender"
              class="block mb-2 font-medium text-gray-900 text-sm"
              >I am</label
            >
            <BaseAppDropdown v-model="profile.preferences" @input="setGender">
              <template #trigger>
                {{ genderTriggerText }}
              </template>
              <BaseAppDropdownItem value="m_f"
                >a man looking for a woman</BaseAppDropdownItem
              >
              <BaseAppDropdownItem value="m_m"
                >a man looking for a man</BaseAppDropdownItem
              >
              <BaseAppDropdownItem value="f_m"
                >a woman looking for a man</BaseAppDropdownItem
              >
              <BaseAppDropdownItem value="f_f"
                >a woman looking for a woman</BaseAppDropdownItem
              >
            </BaseAppDropdown>
          </div>

          <div class="mb-4">
            <label
              for="location"
              class="block mb-2 font-medium text-gray-900 text-sm"
              >Lives in</label
            >
            <ValidationProvider
              ref="location"
              v-slot="{ errors }"
              name="Location"
              rules="required"
            >
              <VueAutosuggest
                ref="autosuggest"
                v-model="profile.lives_in"
                :suggestions="filteredSuggestions"
                :input-props="inputProps"
                :get-suggestion-value="(s) => s.item.name"
                :render-suggestion="renderSuggestion"
                @input="getCities"
                @selected="onCitySelect"
              />
              <span class="mt-1 block text-sm text-red-500">{{
                errors[0]
              }}</span>
            </ValidationProvider>
          </div>

          <div class="mb-4">
            <label
              for="gender"
              class="block mb-2 font-medium text-gray-900 text-sm"
              >Age</label
            >
            <BaseAppDropdown v-model="profile.age">
              <template #trigger>
                {{ profile.age }}
              </template>
              <BaseAppDropdownItem v-for="n in 53" :key="n + 17" :value="n + 17"
                ><span v-if="n + 17 === 70">{{ n + 17 }}+</span>
                <span v-else>{{ n + 17 }}</span></BaseAppDropdownItem
              >
            </BaseAppDropdown>
          </div>
        </ValidationObserver>

        <ValidationObserver v-if="currentStep === 2" :key="2">
          <div class="mb-4">
            <label
              for="preference"
              class="block mb-2 font-medium text-gray-900 text-sm"
              >Your preference</label
            >
            <ValidationProvider
              v-slot="{ errors }"
              rules="required"
              name="Preference"
            >
              <BaseAppDropdown v-model="profile.choice">
                <template #trigger>
                  {{ preferenceTriggerText }}
                </template>
                <BaseAppDropdownItem
                  v-for="(item, i) in preferencesList"
                  :key="i"
                  :value="item"
                  >{{ item }}</BaseAppDropdownItem
                >
              </BaseAppDropdown>
              <span class="mt-1 block text-sm text-red-500">{{
                errors[0]
              }}</span>
            </ValidationProvider>
          </div>

          <div class="mb-4">
            <ValidationProvider
              v-slot="{ errors }"
              vid="email"
              rules="required|email"
              name="E-mail"
            >
              <BaseAppInput
                v-model="profile.email"
                type="email"
                label="E-mail"
                :errors="errors || $t(errors)"
                placeholder="Type in e-mail"
                @blur="onEmailChanged"
              />
            </ValidationProvider>
          </div>
        </ValidationObserver>

        <BaseAppButton
          :disabled="submitting"
          :class="{ 'cursor-not-allowed': submitting }"
          type="danger"
          size="lg"
          class="mt-6 block"
          expanded
          @click.prevent="onSubmit"
        >
          <IconLoader
            v-if="submitting"
            class="animate-spin -ml-1 mr-3 h-5 w-5 text-white fill-current"
          />
          {{
            ($route.name === 'milf' ? 'Find Members Nearby' : 'Create Account',
            currentStep === 1 ? 'Continue' : 'Create Account')
          }}
        </BaseAppButton>
      </form>
    </ValidationObserver>
  </div>
</template>

<script>
import { debounce } from 'lodash'
import dayjs from 'dayjs'
import { VueAutosuggest } from 'vue-autosuggest'
import IconUser from '@/assets/svg/user.svg?inline'
import IconGoogle from '@/assets/svg/google-logo.svg?inline'
import IconLoader from '@/assets/svg/loader.svg?inline'
import City from '@/models/City'
import User from '@/models/User'

export default {
  components: {
    IconUser,
    IconGoogle,
    IconLoader,
    VueAutosuggest,
  },

  data() {
    return {
      profile: new User({
        preferences: 'm_f',
        lives_in: '',
        lat: '',
        lng: '',
        choice: null,
        email: '',
        username: '',
        looking_for: 'female',
        gender: 'male',
        age: 20,
      }),
      isGeneratingUsername: false,
      cities: [],
      currentStep: 1,
      submitting: false,
      selectedLocation: null,
      s1: this.$store.state.campaign.s1,
      s2: this.$store.state.campaign.s2,
      s3: this.$store.state.campaign.s3,
      s4: this.$store.state.campaign.s4,
      s5: this.$store.state.campaign.s5,
      gclid: this.$store.state.campaign.gclid,
      tracking_id: this.$store.state.campaign.tracking_id,
      inputProps: {
        name: 'lives_in',
        field: 'name',
        placeholder: 'Search City',
        class:
          'rounded-md border border-slate-300 bg-slate-100 py-2.5 pl-3 pr-10 text-left shadow-sm focus:border-yellow-500 focus:outline-none focus:ring-1 focus:ring-yellow-500 sm:text-sm w-full',
      },
      preferencesList: [
        'Sex contact',
        'Exploring erotic/sexual fantasies',
        'Secret affairs',
        'Friends with benefits',
        'Love/companionship',
        'Long-term relationship',
      ],
    }
  },

  computed: {
    genderTriggerText() {
      if (this.profile.preferences === 'm_m') return 'a man looking for a man'
      if (this.profile.preferences === 'f_m') return 'a woman looking for a man'
      if (this.profile.preferences === 'f_f')
        return 'a woman looking for a woman'
      return 'a man looking for a woman'
    },

    preferenceTriggerText() {
      if (this.profile.choice === null) {
        return 'Select preference'
      }

      return this.profile.choice
    },

    filteredSuggestions() {
      return [
        {
          data: this.cities.filter((item) => {
            return item.name
              .toLowerCase()
              .includes(this.profile.lives_in.toLowerCase())
          }),
        },
      ]
    },

    googleLink() {
      let url = `https://api.wannahookup.com/api/login/google?s1=${this.$store.state.campaign.s1}`
      url += `&s2=${this.$store.state.campaign.s2}`
      url += `&s3=${this.$store.state.campaign.s3}`
      url += `&s4=${this.$store.state.campaign.s4}`
      url += `&s5=${this.$store.state.campaign.s5}`
      url += `&gclid=${this.$store.state.campaign.gclid}`
      url += `&tracking_id=${this.$store.state.campaign.tracking_id}`

      return url
    },

    registeredUsersCount() {
      const diffInDays = dayjs().diff(dayjs('2020-05-18'), 'day')
      return (180000 + diffInDays * 365)
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    },
  },

  created() {
    this.geolocation()
    this.onEmailChanged()
  },

  methods: {
    async onSubmit() {
      // check if form is valid
      if (this.currentStep === 1) {
        this.$refs.location.validate().then((res) => {
          if (!res.valid) return
          this.currentStep = 2
        })
      } else {
        if (this.currentStep === 2) {
          if (!this.$refs.form.validate()) {
            return false
          }

          this.submitting = true
          try {
            const { uuid } = await this.profile.register()
            this.$router.push({
              path: '/confirm-email',
              query: {
                uuid,
                email: this.profile.email,
              },
            })
          } catch (e) {
            this.$setErrorsFromResponse(e.response.data)
            // this.$refs.form.setErrors(e.response.data.errors)
          }
          this.submitting = false
        }
      }
    },

    getCities: debounce(async function (name = '') {
      // this.isFetchingCity = true
      this.cities = (await City.where('nameStarts', name).get()).data
      // this.isFetchingCity = false
    }, 500),

    onCitySelect(city) {
      if (city) {
        this.profile.lives_in = city.item.name
        this.profile.lat = city.item.lat
        this.profile.lng = city.item.lng
        this.profile.lives_in_display = this.$options.filters.cityName(
          city.item.name
        )
      }
    },

    geolocation() {
      let headers = {}
      try {
        if (!sessionStorage.getItem('landerPinged')) {
          headers = {
            'lander-origin': window.location.pathname || '/',
            s1: this.$route.query.s1 || '',
            s2: this.$route.query.s2 || '',
            s3: this.$route.query.s3 || '',
            s4: this.$route.query.s4 || '',
            s5: this.$route.query.s5 || '',
          }
          sessionStorage.setItem('landerPinged', 1)
        }
      } catch (e) {}
      this.$axios
        .$get('/location', {
          headers,
        })
        .then((res) => {
          this.profile.lat = res.data.lat
          this.profile.lng = res.data.lon
          this.profile.lives_in = res.data.city
        })
    },

    renderSuggestion(suggestion) {
      return this.$createElement('div', suggestion.item.name)
    },

    onEmailChanged() {
      if (this.profile.email) {
        this.generateUsername()
      }
    },

    setGender() {
      const gender = this.profile.preferences.split('_')
      const selection = {
        m: 'male',
        f: 'female',
      }

      this.profile.gender = selection[gender[0]] || 'male'
      this.profile.looking_for = selection[gender[1]] || 'female'
    },

    generateUsername() {
      this.isGeneratingUsername = true
      this.$axios
        .post('/register/generate-username', { email: this.profile.email })
        .then((res) => {
          this.profile.username = res.data.username
          this.isGeneratingUsername = false
        })
        .catch((e) => {
          this.$setErrorsFromResponse(e.response.data)
          // this.$refs.form.setErrors(e.response.data.errors)
        })
    },
  },
}
</script>

<style lang="scss">
.autosuggest__results-container {
  position: relative;
  width: 100%;
}

.autosuggest__results {
  font-weight: 300;
  margin: 0;
  position: absolute;
  z-index: 10000001;
  width: 100%;
  border: 1px solid #e0e0e0;
  border-bottom-left-radius: 4px;
  border-bottom-right-radius: 4px;
  background: white;
  padding: 0px;
}

.autosuggest__results ul {
  list-style: none;
  padding-left: 0;
  margin: 0;
  font-size: 0.875rem;
  line-height: 1.25rem;
}

.autosuggest__results .autosuggest__results-item {
  cursor: pointer;
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
  padding-left: 0.75rem;
  padding-right: 2.25rem;
}

#autosuggest ul:nth-child(1) > .autosuggest__results_title {
  border-top: none;
}

.autosuggest__results .autosuggest__results_title {
  color: gray;
  font-size: 11px;
  margin-left: 0;
  padding: 15px 13px 5px;
  border-top: 1px solid lightgray;
}

.autosuggest__results .autosuggest__results-item:active,
.autosuggest__results .autosuggest__results-item:hover,
.autosuggest__results .autosuggest__results-item:focus,
.autosuggest__results
  .autosuggest__results-item.autosuggest__results-item--highlighted {
  background-color: #5046e3;
  color: #fff;
}
</style>
