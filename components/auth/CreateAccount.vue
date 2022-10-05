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
      class="w-full h-[42px] border border-black rounded flex items-center mb-4 text-black relative"
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
        <select
          id="preference"
          v-model="profile.preferences"
          class="bg-slate-100 focus:bg-white border border-slate-100 text-gray-900 text-sm rounded focus:ring-yellow-400 focus:border-yellow-400 block w-full p-2.5 appearance-none control-select outline-none"
        >
          <option value="m_f">a man looking for a woman</option>
          <option value="m_m">a man looking for a man</option>
          <option value="f_m">a woman looking for a man</option>
          <option value="f_f">a woman looking for a woman</option>
        </select>
      </div>
    </form>
  </div>
</template>

<script>
// import { debounce } from 'lodash'
// import dayjs from 'dayjs'
import IconUser from '@/assets/svg/user.svg?inline'
import IconGoogle from '@/assets/svg/google-logo.svg?inline'
import User from '@/models/User'

export default {
  components: { IconUser, IconGoogle },

  data() {
    return {
      profile: new User({
        preferences: 'm_f',
      }),
    }
  },
}
</script>
