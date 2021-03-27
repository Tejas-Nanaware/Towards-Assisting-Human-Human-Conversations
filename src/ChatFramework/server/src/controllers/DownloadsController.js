const path = require('path')

const saveConsentForm = async  (req,res) => {
  const fileName = 'ConsentForm.pdf'
  const filePath = path.join('ChatFramework', 'server', 'src', 'assets', fileName)
  const options = {
    headers: {
        'x-timestamp': Date.now(),
        'x-sent': true,
        'content-disposition': 'attachment; filename=' + fileName,
        'content-type': 'application/pdf'
    }
  }
  res.download(filePath, fileName, options)
}

module.exports = {
  saveConsentForm
}