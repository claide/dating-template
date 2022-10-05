import Model from './Model'

export default class User extends Model {
  resource() {
    return 'users'
  }

  register() {
    return this.request({
      method: 'POST',
      url: '/register',
      data: this,
    }).then(function (response) {
      return response.data.data
    })
  }
}
