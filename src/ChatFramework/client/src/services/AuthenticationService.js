import Api from '@/services/Api'

export default {
  getLists () {
    return Api().get('register')
  },
  register (credentials) {
    return Api().post('register', credentials)
  },
  login (credentials) {
    return Api().post('login', credentials)
  }
}
