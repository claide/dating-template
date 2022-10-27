import Model from './Model'

export default class UserRequest extends Model {
  resource() {
    return 'user-requests'
  }
}
