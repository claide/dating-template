import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import Model from './Model'

dayjs.extend(relativeTime)

export default class Visitor extends Model {
  resource() {
    return 'visitors'
  }

  get date() {
    return dayjs(this.created_at).fromNow()
  }
}
