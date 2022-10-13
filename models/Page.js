import dayjs from 'dayjs'
import Model from './Model'

export default class Page extends Model {
  resource() {
    return 'pages'
  }

  get createdAt() {
    if (!this.created_at) {
      return ''
    }
    return dayjs(this.created_at).format('MMMM d, YYYY')
  }
}
