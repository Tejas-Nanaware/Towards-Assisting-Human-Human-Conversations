import Api from '@/services/Api'

export default {
  sendQuestionnaireResponses (data) {
    return Api().post('postChat', data)
  }
}
