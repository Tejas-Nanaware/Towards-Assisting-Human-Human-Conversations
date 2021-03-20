import Api from '@/services/Api'

export default {
  sendChatData (data) {
    return Api().post('chat', data)
  }
}
