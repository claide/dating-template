<template>
  <!-- Begin content -->
  <div class="d-content">
    <section class="section">
      <div class="">
        <div
          v-if="visitors.length == 0 && !loading"
          class="has-text-centered m-t-60 m-b-60"
        >
          <h3 class="has-text-size-xl">You have no visitors yet!</h3>
        </div>

        <div
          class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 md:gap-4 lg:gap-6 text-dark dark:text-[#A6ADBA] container max-w-7xl px-4 sm:px-6 py-2 md:py-4 mx-auto"
        >
          <template v-for="visit in visitors">
            <div
              v-if="visit.visitor"
              :key="visit.id"
              class="bg-white dark:bg-[#322e30] rounded-lg"
            >
              <nuxt-link :to="`/profile/${visit.visitor.uuid}`">
                <div class="relative">
                  <div class="h-full">
                    <!-- visit.visitor.approved_primary_photo.url -->
                    <!-- 'https://assets.shagtoday.co.uk/d1f7c3056c2b760da7b3bbf4ea89fea7/qR4xjpMApRA7C4w5XhEbGRYKnjZ6mfmHR7LPhHXV.jpg' -->
                    <AvatarFixed
                      :src="
                        visit.visitor.approved_primary_photo
                          ? visit.visitor.approved_primary_photo.url
                          : null
                      "
                      :gender="visit.visitor.gender"
                    />
                    <div
                      class="absolute flex justify-evenly mx-auto bottom-16 left-0 right-0 max-w-[10rem]"
                    >
                      <span class="">
                        <button
                          class="rounded-full p-3 bg-white dark:bg-[#322e30] border"
                        >
                          <svg
                            id="Layer_1"
                            data-v-217e9adc=""
                            data-name="Layer 1"
                            xmlns="http://www.w3.org/2000/svg"
                            xmlns:xlink="http://www.w3.org/1999/xlink"
                            viewBox="0 0 409.6 409.6"
                            class="w-8"
                          >
                            <defs data-v-217e9adc="">
                              <style data-v-217e9adc="">
                                .quick-actions {
                                  fill: url(#linear-gradient);
                                }
                              </style>
                              <linearGradient
                                id="linear-gradient"
                                data-v-217e9adc=""
                                x1="556"
                                y1="472"
                                x2="965.6"
                                y2="472"
                                gradientUnits="userSpaceOnUse"
                              >
                                <stop
                                  data-v-217e9adc=""
                                  offset="0"
                                  stop-color="#ffbb03"
                                ></stop>
                                <stop
                                  data-v-217e9adc=""
                                  offset="1"
                                  stop-color="#fedf4f"
                                ></stop>
                              </linearGradient>
                            </defs>
                            <path
                              data-v-217e9adc=""
                              d="M962.41,436.76C951,375.44,918.3,328.56,865.24,296c-27.35-16.76-57.32-25.92-89.35-28.18a21,21,0,0,1-3.09-.66h-24c-7.76,1.05-15.57,1.82-23.28,3.19C679,278.62,640,300.46,608.42,335.46c-29.71,33-46.54,71.84-51.44,115.91q-.48,4.31-1,8.63v24c1,7.75,1.75,15.56,3.19,23.24,11.46,61.32,44.11,108.2,97.17,140.72,27.35,16.76,57.32,25.92,89.35,28.18a21,21,0,0,1,3.09.66h24c7.76-1,15.57-1.82,23.28-3.19,46.49-8.23,85.56-30.07,117.1-65.07,29.71-33,46.54-71.84,51.44-115.91q.48-4.31,1-8.63V460C964.55,452.25,963.85,444.44,962.41,436.76Z"
                              transform="translate(-556 -267.2)"
                              class="quick-actions"
                            ></path>
                            <path
                              data-v-217e9adc=""
                              d="M651.42,410.57c0-18.55,15.47-34,34.14-34a34.24,34.24,0,0,1,34.11,34c0,18.57-15.58,34.15-34.1,34.14S651.46,429.1,651.42,410.57Z"
                              transform="translate(-556 -267.2)"
                            ></path>
                            <path
                              data-v-217e9adc=""
                              d="M847.75,524.6c-20,32.14-49.06,48.54-86.73,50-38-1.34-67.13-17.78-87.21-50.06-2.63-4.22-2.07-7.94,1.24-10.25s7.46-1.48,10.19,2.84c7.71,12.24,17.18,22.7,29.58,30.35a85,85,0,0,0,51.4,12.91c25.78-1.71,46.61-13,62.83-32.88,2.69-3.29,4.87-7,7.34-10.45,2.85-4,6.55-5.07,9.91-3C849.81,516.28,850.46,520.26,847.75,524.6Z"
                              transform="translate(-556 -267.2)"
                            ></path>
                            <path
                              data-v-217e9adc=""
                              d="M868.66,441.58c-2,2.79-4.69,3.86-8,2.55a23.89,23.89,0,0,1-3.19-1.62q-21.66-12.37-43.3-24.74c-2.87-1.63-5.52-3.3-5.57-7.11-.06-4,2.73-5.73,5.72-7.43,14.46-8.2,28.87-16.47,43.36-24.63,1.68-1,3.86-2.13,5.51-1.78,2.2.47,5.15,1.91,5.86,3.69.79,2-.19,5-1.11,7.28-.5,1.23-2.42,2-3.79,2.75q-15.4,8.83-30.84,17.6c-1.24.71-2.44,1.48-4.1,2.49,11.77,6.74,23,13.19,34.32,19.66a25.4,25.4,0,0,1,4,2.6A6.66,6.66,0,0,1,868.66,441.58Z"
                              transform="translate(-556 -267.2)"
                            ></path>
                          </svg>
                        </button>
                      </span>
                      <span>
                        <button
                          class="rounded-full p-3 bg-white dark:bg-[#322e30] border"
                        >
                          <svg
                            id="Layer_1"
                            data-name="Layer 1"
                            xmlns="http://www.w3.org/2000/svg"
                            xmlns:xlink="http://www.w3.org/1999/xlink"
                            viewBox="0 0 408.85 383.14"
                            class="w-8"
                          >
                            <defs>
                              <style>
                                .quick-actions {
                                  fill: url(#linear-gradient);
                                }
                              </style>
                              <linearGradient
                                id="linear-gradient"
                                x1="755.75"
                                y1="540.18"
                                x2="1164.6"
                                y2="540.18"
                                gradientUnits="userSpaceOnUse"
                              >
                                <stop offset="0" stop-color="#ffbb03"></stop>
                                <stop offset="1" stop-color="#fedf4f"></stop>
                              </linearGradient>
                            </defs>
                            <path
                              d="M1164.6,517.84V538.6a31.82,31.82,0,0,0-.71,3.44c-3.31,36.65-17.9,68.46-42.31,95.63-37.69,42-85.66,63.67-141.21,69.21A218.5,218.5,0,0,1,886.82,696c-2.81-1-4.47-.24-6.7,1.44-8.38,6.28-16.59,13-25.63,18.16-19.14,11-40.14,16-62.19,16.18-9.2.09-15.17-8.87-11.38-16.8a26.7,26.7,0,0,1,4.27-5.73C801.23,691,807.46,670,803,646.06a13.53,13.53,0,0,0-3-6.2c-16-18-28.21-38.25-35.75-61.18-9.48-28.83-11.19-58.12-3.88-87.64,11.58-46.77,39.3-82.06,79.28-107.79,44.24-28.48,93-38.82,145.16-33.14,47.7,5.2,89.76,23.42,125,56.33,26.1,24.41,43.83,53.89,51.39,89.06C1162.64,502.86,1163.44,510.39,1164.6,517.84ZM829.28,528.41c.19,19.62,16.49,35.79,36,35.71a36.23,36.23,0,0,0,35.82-35.88c0-19.69-16.63-36.2-36.19-35.92S829.1,509,829.28,528.41Zm167.62-.15a36.23,36.23,0,0,0-35.76-35.94c-19.47-.14-35.8,16-36,35.66s16.3,36.2,36,36.14A36.23,36.23,0,0,0,996.9,528.26Zm95.8.56c.57-19.33-15.3-35.79-35.19-36.48-19.3-.67-35.79,15.14-36.58,35.09-.77,19.39,15.43,36.18,35.38,36.69C1075.67,564.6,1092.11,548.65,1092.7,528.82Z"
                              transform="translate(-755.75 -348.61)"
                              class="quick-actions"
                            ></path>
                            <path
                              d="M829.28,528.41c-.18-19.46,16-35.8,35.62-36.09s36.2,16.23,36.19,35.92a36.23,36.23,0,0,1-35.82,35.88C845.77,564.2,829.47,548,829.28,528.41Z"
                              transform="translate(-755.75 -348.61)"
                            ></path>
                            <path
                              d="M996.9,528.26a36.23,36.23,0,0,1-35.84,35.86c-19.66.06-36.2-16.56-36-36.14s16.57-35.8,36-35.66A36.23,36.23,0,0,1,996.9,528.26Z"
                              transform="translate(-755.75 -348.61)"
                            ></path>
                            <path
                              d="M1092.7,528.82c-.59,19.83-17,35.78-36.39,35.3-20-.51-36.15-17.3-35.38-36.69.79-19.95,17.28-35.76,36.58-35.09C1077.4,493,1093.27,509.49,1092.7,528.82Z"
                              transform="translate(-755.75 -348.61)"
                            ></path>
                          </svg>
                        </button>
                      </span>
                    </div>
                  </div>
                  <div class="px-2 md:px-4 pt-7 pb-3">
                    <div class="flex mb-1 text-medium">
                      <span
                        class="text-sm font-medium text-ellipsis overflow-hidden max-w-[5rem].md:max-w-[10rem]"
                      >
                        {{ visit.visitor.username }}
                      </span>
                      <span class="text-sm font-medium"
                        >, {{ visit.visitor.age }}</span
                      >
                      <span
                        v-if="visit.visitor.is_online"
                        class="bg-green-500 h-3 rounded-full shadow-sm w-3 inline-block ml-auto self-center"
                      ></span>
                      <span
                        v-else
                        class="bg-gray-500 h-3 rounded-full shadow-sm w-3 inline-block ml-auto self-center"
                      ></span>
                    </div>
                    <div class="flex gap-3">
                      <span>
                        <MaleIcon
                          v-if="visit.visitor.gender === 'male'"
                          class="w-5 h-5 fill-primary"
                        />
                        <FemaleIcon v-else class="w-5 h-5 fill-primary" />
                      </span>
                      <span
                        class="text-sm max-w-[10rem] truncate overflow-hidden"
                        >{{ visit.visitor.lives_in | cityName }}</span
                      >
                    </div>
                  </div>
                </div>
              </nuxt-link>
            </div>
          </template>
        </div>
      </div>
    </section>
  </div>
  <!-- End content -->
</template>

<script>
import Visitor from '@/models/Visitor'
import AvatarFixed from '@/components/avatar-fixed'
import EventBus from '@/services/eventBus'
import MaleIcon from '~/assets/icons/male.svg?inline'
import FemaleIcon from '~/assets/icons/female.svg?inline'

export default {
  layout: 'auth',
  middleware: 'auth',
  head() {
    return {
      title: 'My visitors',
    }
  },
  components: {
    AvatarFixed,
    MaleIcon,
    FemaleIcon,
  },
  data() {
    return {
      visitors: [],
      loading: true,
    }
  },
  mounted() {
    EventBus.$on('NEW_NOTIFICATION', (notification) => {
      if (notification.action_type === 'PROFILE_VIEW') {
        this.getVisitors()
      }
    })
    this.getVisitors()
    this.$axios.patch('clear-new-visitors-count').then(() => {
      this.$store.commit('authentication/setNewVisitorsCount')
    })
  },
  methods: {
    async getVisitors() {
      this.loading = true
      const { data } = await Visitor.get()
      this.visitors = data
      this.loading = false
    },
  },
}
</script>
