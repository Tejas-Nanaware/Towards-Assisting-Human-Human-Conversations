import Api from '@/services/Api'

export default {
  getUserProfile (userID) {
    return Api().get(`profile/${userID}`)
  }
}
