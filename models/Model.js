import { Model as BaseModel } from 'vue-api-query'

export default class Model extends BaseModel {
  // @ts-ignore
  baseURL() {
    return process.env.apiUrl
  }

  request(config) {
    return this.$http.request(config)
  }
}
