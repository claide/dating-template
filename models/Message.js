import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import updateLocale from 'dayjs/plugin/updateLocale'
import Model from './Model'

dayjs.extend(relativeTime)
dayjs.extend(updateLocale)

export default class Message extends Model {
  resource() {
    return 'messages'
  }

  get timestamp() {
    return dayjs(this.created_at).unix()
  }

  get sentAt() {
    setRelativeTimeConfig()
    return dayjs(this.created_at).local().fromNow()
  }

  get read() {
    return !!this.read_at
  }

  get fromMe() {
    return this.from_id === this.viewer_id
  }

  get forMe() {
    return this.from_id !== this.viewer_id
  }
}

function setRelativeTimeConfig() {
  if (window.innerWidth <= 768) {
    dayjs.extend(updateLocale)
    dayjs.updateLocale('en', {
      relativeTime: {
        future: 'in %s',
        past: '%s ago',
        s: 'few sec',
        m: 'a min',
        mm: '%dm',
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
}
