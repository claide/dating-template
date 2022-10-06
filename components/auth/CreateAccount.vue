<template>
  <div class="bg-white rounded p-4 md:p-8 w-[90%] md:w-[75%] lg:w-[45%] shadow-lg mt-[11rem] md:mt-[20rem] lg:mt-0">
    <div class="text-center mb-6">
      <h2 class="capitalize text-2xl md:text-3xl font-medium mb-3">Create a free account</h2>
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
      <span class="text-center mx-auto text-gray-600 font-medium">Log in with Google</span>
    </a>
    <!-- End login with Google -->

    <div class="relative flex py-3 items-center">
      <div class="flex-grow border-t border-slate-400"></div>
      <span class="flex-shrink mx-4 text-black">or</span>
      <div class="flex-grow border-t border-slate-400"></div>
    </div>

    <form>
      <div class="mb-4">
        <label for="gender" class="block mb-2 font-medium text-gray-900 text-sm">I am</label>
        <BaseAppDropdown v-model="profile.preferences">
          <template #trigger>
            {{ genderTriggerText }}
          </template>
          <BaseAppDropdownItem value="m_f">a man looking for a woman</BaseAppDropdownItem>
          <BaseAppDropdownItem value="m_m">a man looking for a man</BaseAppDropdownItem>
          <BaseAppDropdownItem value="f_m">a woman looking for a man</BaseAppDropdownItem>
          <BaseAppDropdownItem value="f_f">a woman looking for a woman</BaseAppDropdownItem>
        </BaseAppDropdown>
      </div>

      <div class="mb-4">
        <label for="location" class="block mb-2 font-medium text-gray-900 text-sm">Live in</label>
        <VueAutosuggest
          v-model="profile.lives_in"
          :suggestions="cities"
          :input-props="inputProps"
          @input="getCities"
          @selected="onCitySelect"
        >
          <template slot-scope="{ suggestion }">
            <span class="my-suggestion-item">{{ suggestion.item }}</span>
          </template>
        </VueAutosuggest>
      </div>
    </form>
  </div>
</template>

<script>
import { debounce } from 'lodash'
import dayjs from 'dayjs'
import { VueAutosuggest } from 'vue-autosuggest'
import IconUser from '@/assets/svg/user.svg?inline'
import IconGoogle from '@/assets/svg/google-logo.svg?inline'
import City from '@/models/City'
import User from '@/models/User'

export default {
  components: { IconUser, IconGoogle, VueAutosuggest },

  data() {
    return {
      profile: new User({
        preferences: 'm_f',
        lives_in: '',
      }),
      cities: [],
      inputProps: {
        'v-validate': 'required',
        name: 'lives_in',
        'data-vv-as': 'lives in',
        field: 'name',
        placeholder: 'Search City',
        class:
          'bg-slate-100 focus:bg-white border border-slate-100 text-gray-900 text-sm rounded focus:ring-yellow-400 focus:border-yellow-400 block w-full p-2.5 outline-none',
      },
    }
  },

  computed: {
    genderTriggerText() {
      if (this.profile.preferences === 'm_m') return 'a man looking for a man'
      if (this.profile.preferences === 'f_m') return 'a woman looking for a man'
      if (this.profile.preferences === 'f_f') return 'a woman looking for a woman'
      return 'a man looking for a woman'
    },
    _cities() {
      return this.$store.state.provinces.cities
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
      return (180000 + diffInDays * 365).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    },
  },

  created() {
    this.geolocation()
  },

  methods: {
    getCities: debounce(async function (name = '') {
      if (!name.trim()) return
      this.isFetchingCity = true
      this.cities = (await City.where('nameStarts', name).where('province', this.profile.state).get()).data
      this.isFetchingCity = false
    }, 500),

    onCitySelect(city) {
      if (city) {
        this.profile.lives_in = city.name
        this.profile.lat = city.lat
        this.profile.lng = city.lng
        this.profile.lives_in_display = this.$options.filters.cityName(city.name)
        this.$nextTick(() => {
          this.$validator._base.validate('lives_in')
        })
      }
    },

    geolocation() {
      this.$axios.$get('/location').then((res) => {
        this.profile.lat = res.data.lat
        this.profile.lng = res.data.lon
        this.profile.lives_in = res.data.city
        this.profile.lives_in_display = this.$options.filters.cityName(res.data.city)
      })
    },
  },
}
</script>
