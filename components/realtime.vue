<template>
  <span>{{ timeString }}</span>
</template>

<script>
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import updateLocale from 'dayjs/plugin/updateLocale'

dayjs.extend(relativeTime)
dayjs.extend(updateLocale)

export default {
  props: {
    time: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      timeString: null,
      timeInterval: null,
    }
  },
  mounted() {
    this.updateTime()
  },
  methods: {
    updateTime() {
      this.setRelativeTimeConfig()

      this.timeString = dayjs(this.time).local().fromNow()

      setTimeout(this.updateTime, 1000 * 60)
    },
    setRelativeTimeConfig() {
      if (window.innerWidth <= 768) {
        dayjs.extend(updateLocale)
        dayjs.updateLocale('en', {
          relativeTime: {
            future: 'in %s',
            past: '%s',
            s: 'few sec',
            m: 'a min',
            mm: ' %dm',
            h: 'an hr',
            hh: '%d hrs',
            d: 'a day',
            dd: '%d days',
            M: 'a month',
            MM: '%d months',
            y: 'a year',
            yy: '%d years',
          },
        })
      }
    },
  },
}
</script>
