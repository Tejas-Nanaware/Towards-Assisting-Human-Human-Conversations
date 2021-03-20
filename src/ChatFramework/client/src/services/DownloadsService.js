import Api from '@/services/Api'
// import axios from 'axios'

const downloadFile = (res, fileName) => {
  const url = window.URL.createObjectURL(new Blob([res.data]))
  const link = document.createElement('a')
  link.href = url
  link.setAttribute('download', fileName)
  document.body.appendChild(link)
  link.click()
}

export default {
  saveConsentForm () {
    Api().get('saveConsentForm', { responseType: 'arraybuffer' })
      .then(function (res) {
        downloadFile(res, 'ConsentForm.pdf')
      })
      .catch((error) => {
        console.log(error)
      })
  }
}
