import isEmpty from 'lodash/isEmpty'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import updateLocale from 'dayjs/plugin/updateLocale'
import Model from './Model'
import Message from './Message'

dayjs.extend(relativeTime)
dayjs.extend(updateLocale)

export default class Conversation extends Model {
  resource() {
    return 'user-conversations'
  }

  messages() {
    return this.hasMany(Message)
  }

  get chatmate() {
    if (this.viewer === this.initiator_id) {
      return this.recipient
    } else {
      return this.initiator
    }
  }

  get isUnread() {
    return this.last_message && isEmpty(this.last_message.read_at)
  }

  get lastActive() {
    if (this.last_message) {
      setRelativeTimeConfig()
      return dayjs(this.last_message.updated_at).fromNow()
    }

    return ''
  }

  get isLike() {
    // eslint-disable-next-line
    return this.last_message && this.last_message.type == 'like'
  }

  get isImage() {
    // eslint-disable-next-line
    return this.last_message && this.last_message.type == 'image'
  }

  get timestamp() {
    return dayjs(this.updated_at).unix()
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
