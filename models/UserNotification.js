import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import Model from './Model'
dayjs.extend(relativeTime)

export default class UserNotification extends Model {
  resource() {
    return 'user-notifications'
  }

  get isUnread() {
    return !this.read_at
  }

  get timestamp() {
    return dayjs(this.data.timestamp).local().fromNow()
  }
}
